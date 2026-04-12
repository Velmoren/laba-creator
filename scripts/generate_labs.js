const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, BorderStyle, WidthType, TableLayoutType, ShadingType, VerticalAlign, ExternalHyperlink, ImageRun } = require('docx');

const entryId = process.argv[2] || '1';
const PAGE_WIDTH_DXA = 9355;

async function generateLabs() {
    console.log(`Generating Labs for Entry ID: ${entryId}...`);
    
    const srcRoot = 'src';
    const allDirs = fs.readdirSync(srcRoot).filter(d => fs.statSync(path.join(srcRoot, d)).isDirectory());
    const studentFolderName = allDirs.find(d => d === entryId || d.startsWith(`${entryId}_`));

    if (!studentFolderName) {
        console.error(`Error: Student directory for ID ${entryId} not found in src/`);
        process.exit(1);
    }

    const sourceBaseDir = path.join(srcRoot, studentFolderName);
    const outputBaseDir = path.join('dist', studentFolderName, 'labs');

    if (!fs.existsSync(outputBaseDir)) fs.mkdirSync(outputBaseDir, { recursive: true });

    const themeDirs = fs.readdirSync(sourceBaseDir).filter(d => fs.statSync(path.join(sourceBaseDir, d)).isDirectory() && !d.startsWith('.'));

    for (const themeName of themeDirs) {
        const themePath = path.join(sourceBaseDir, themeName);
        const labDirs = fs.readdirSync(themePath).filter(d => fs.statSync(path.join(themePath, d)).isDirectory() && !d.startsWith('.'));

        for (const labDirName of labDirs) {
            console.log(`Processing [${themeName}] ${labDirName}...`);
            const labSourcePath = path.join(themePath, labDirName);
            const labOutputPath = path.join(outputBaseDir, themeName, labDirName);
            
            if (!fs.existsSync(labOutputPath)) fs.mkdirSync(labOutputPath, { recursive: true });

            const files = fs.readdirSync(labSourcePath);
            const mdFiles = files.filter(f => f.endsWith('.md'));
            
            for (const mdFile of mdFiles) {
                const content = fs.readFileSync(path.join(labSourcePath, mdFile), 'utf8');
                const lrMatch = labDirName.match(/\d+/);
                const lrNumber = lrMatch ? lrMatch[0] : 'X';
                const fileNameBase = path.basename(mdFile, '.md');

                const doc = new Document({
                    styles: {
                        default: {
                            document: {
                                run: { size: 28, font: "Times New Roman" },
                                paragraph: { spacing: { line: 360 }, alignment: AlignmentType.JUSTIFIED },
                            },
                        },
                        paragraphStyles: [
                            { id: "Normal", name: "Normal", quickFormat: true, run: { size: 28, font: "Times New Roman" }, paragraph: { spacing: { line: 360 }, indent: { firstLine: 709 } } },
                            { id: "Heading1", name: "Heading 1", run: { size: 32, bold: true, allCaps: true }, paragraph: { alignment: AlignmentType.CENTER, spacing: { before: 400, after: 200 } } },
                            { id: "Heading2", name: "Heading 2", run: { size: 28, bold: true }, paragraph: { spacing: { before: 300, after: 150 } } },
                        ],
                    },
                    sections: [{
                        properties: { page: { margin: { top: 1134, bottom: 1134, left: 1701, right: 850 } } },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "МИНЦИФРЫ РОССИИ", bold: true })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "МТУСИ", bold: true })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Кафедра ИСУА", bold: true })] }),
                            new Paragraph({ text: "\n\n\n" }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: fileNameBase.toUpperCase().includes('ОТЧЕТ') ? "ОТЧЕТ" : "ОТВЕТЫ НА КОНТРОЛЬНЫЕ ВОПРОСЫ", bold: true, size: 36 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `К ЛАБОРАТОРНОЙ РАБОТЕ №${lrNumber}`, bold: true, size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `\nпо дисциплине «${themeName}»`, italic: true })] }),
                            new Paragraph({ text: "\n\n\n\n\n\n" }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Москва 2026", bold: true })] }),
                            new Paragraph({ text: "", pageBreakBefore: true }),
                            ...parseMarkdown(content, labSourcePath),
                        ],
                    }],
                });

                const buffer = await Packer.toBuffer(doc);
                fs.writeFileSync(path.join(labOutputPath, `${fileNameBase}.docx`), buffer);
            }

            files.forEach(file => {
                if (!file.endsWith('.md') && !file.startsWith('prompt_screenshot')) {
                    const srcFile = path.join(labSourcePath, file);
                    const destFile = path.join(labOutputPath, file);
                    
                    const stat = fs.lstatSync(srcFile);
                    if (stat.isDirectory()) {
                        if (file === 'source') {
                            fs.readdirSync(srcFile).forEach(sFile => {
                                const curSource = path.join(srcFile, sFile);
                                const curDest = path.join(labOutputPath, sFile);
                                const curStat = fs.lstatSync(curSource);
                                if (curStat.isDirectory()) {
                                    copyFolderRecursiveSync(curSource, labOutputPath);
                                } else if (curStat.isSymbolicLink()) {
                                    try { fs.unlinkSync(curDest); } catch(e) {}
                                    fs.symlinkSync(fs.readlinkSync(curSource), curDest);
                                } else {
                                    fs.copyFileSync(curSource, curDest);
                                }
                            });
                        } else {
                            copyFolderRecursiveSync(srcFile, labOutputPath);
                        }
                    } else if (stat.isSymbolicLink()) {
                        try { fs.unlinkSync(destFile); } catch(e) {}
                        fs.symlinkSync(fs.readlinkSync(srcFile), destFile);
                    } else {
                        fs.copyFileSync(srcFile, destFile);
                    }
                }
            });
        }
    }
    console.log(`All labs for ID ${entryId} generated successfully in ${outputBaseDir}`);
}

function copyFolderRecursiveSync(source, target) {
    const targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder);

    if (fs.lstatSync(source).isDirectory()) {
        const files = fs.readdirSync(source);
        files.forEach(function (file) {
            const curSource = path.join(source, file);
            const curDest = path.join(targetFolder, file);
            const curStat = fs.lstatSync(curSource);
            if (curStat.isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            } else if (curStat.isSymbolicLink()) {
                try { fs.unlinkSync(curDest); } catch(e) {}
                fs.symlinkSync(fs.readlinkSync(curSource), curDest);
            } else {
                fs.copyFileSync(curSource, curDest);
            }
        });
    }
}

function parseMarkdown(text, labSourcePath) {
    const nodes = [];
    const lines = text.split(/\r?\n/);
    let inTable = false, tableRows = [];
    let inCodeBlock = false, codeContent = [];
    
    // Счетчики и отслеживание картинок
    let imageCounter = 0;
    const seenImages = new Map(); // путь -> номер

    for (let line of lines) {
        let trimmed = line.trim();

        if (trimmed.startsWith('```')) {
            if (inCodeBlock) {
                nodes.push(new Paragraph({
                    children: [new TextRun({ text: codeContent.join('\n'), font: "Courier New", size: 24 })],
                    shading: { fill: "F2F2F2" },
                    indent: { left: 720 }
                }));
                inCodeBlock = false; codeContent = [];
            } else {
                inCodeBlock = true;
            }
            continue;
        }

        if (inCodeBlock) {
            codeContent.push(line);
            continue;
        }

        if (trimmed.startsWith('|')) {
            inTable = true;
            const cells = trimmed.split('|').map(s => s.trim()).filter((s, i, a) => i > 0 && i < a.length - 1);
            if (cells.length > 0 && !trimmed.includes('---')) tableRows.push(cells);
            continue;
        } else if (inTable) {
            nodes.push(createTable(tableRows));
            inTable = false; tableRows = [];
        }

        if (trimmed.startsWith('![')) {
            const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
            if (match) {
                const altText = match[1] || "Скриншот выполнения";
                const imgName = match[2];
                const imagePath = path.join(labSourcePath, imgName);
                
                if (fs.existsSync(imagePath)) {
                    if (seenImages.has(imagePath)) {
                        // Повторное вхождение - вставляем ссылку
                        const imgNum = seenImages.get(imagePath);
                        nodes.push(new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [new TextRun({ text: `(см. Скриншот ${imgNum})`, italic: true, color: "555555" })],
                            spacing: { before: 100, after: 100 }
                        }));
                    } else {
                        // Первое вхождение - вставляем картинку и номер
                        imageCounter++;
                        seenImages.set(imagePath, imageCounter);
                        
                        nodes.push(new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 200, after: 100 },
                            children: [
                                new ImageRun({
                                    data: fs.readFileSync(imagePath),
                                    transformation: { width: 500, height: 300 },
                                }),
                            ],
                        }));
                        // Подпись под картинкой
                        nodes.push(new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { after: 200 },
                            children: [new TextRun({ text: `Скриншот ${imageCounter} – ${altText}`, italic: true, size: 24 })],
                        }));
                    }
                    continue;
                }
            }
        }

        if (trimmed.startsWith('# ')) {
            nodes.push(new Paragraph({ children: parseInlineText(trimmed.replace('# ', ''), 32, true), heading: HeadingLevel.HEADING_1, style: "Heading1" }));
        } else if (trimmed.startsWith('## ')) {
            nodes.push(new Paragraph({ children: parseInlineText(trimmed.replace('## ', ''), 28, true), heading: HeadingLevel.HEADING_2, style: "Heading2" }));
        } else if (trimmed.startsWith('### ')) {
            nodes.push(new Paragraph({ children: parseInlineText(trimmed.replace('### ', ''), 28, true), heading: HeadingLevel.HEADING_3 }));
        } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            nodes.push(new Paragraph({ children: [new TextRun({text: '• ', size: 28}), ...parseInlineText(trimmed.slice(2).trim(), 28)], indent: { left: 720, hanging: 360 } }));
        } else if (trimmed.match(/^\d+\./)) {
            const numMatch = trimmed.match(/^\d+\./)[0];
            nodes.push(new Paragraph({ children: [new TextRun({text: numMatch + ' ', size: 28}), ...parseInlineText(trimmed.slice(numMatch.length).trim(), 28)], indent: { left: 720, hanging: 360 } }));
        } else if (trimmed) {
            nodes.push(new Paragraph({ children: parseInlineText(trimmed, 28), style: "Normal" }));
        }
    }
    if (inTable) nodes.push(createTable(tableRows));
    return nodes;
}

function parseInlineText(text, fontSize = 28, forceBold = false) {
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const runs = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            runs.push(...parseMarkdownStyles(text.substring(lastIndex, match.index), fontSize, forceBold));
        }
        runs.push(new ExternalHyperlink({
            children: [new TextRun({ text: match[1], style: "Hyperlink", size: fontSize })],
            link: match[2],
        }));
        lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
        runs.push(...parseMarkdownStyles(text.substring(lastIndex), fontSize, forceBold));
    }

    return runs.length > 0 ? runs : [new TextRun({ text: text, size: fontSize, bold: forceBold })];
}

function parseMarkdownStyles(text, fontSize, forceBold) {
    const parts = text.split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*|\`.*?\`)/g);
    const runs = [];
    parts.forEach(part => {
        if (part.startsWith('***')) runs.push(new TextRun({ text: part.slice(3, -3), bold: true, italic: true, size: fontSize }));
        else if (part.startsWith('**')) runs.push(new TextRun({ text: part.slice(2, -2), bold: true, size: fontSize }));
        else if (part.startsWith('*')) runs.push(new TextRun({ text: part.slice(1, -1), italic: true, size: fontSize }));
        else if (part.startsWith('\`')) runs.push(new TextRun({ text: part.slice(1, -1), font: "Courier New", size: fontSize }));
        else if (part) runs.push(new TextRun({ text: part, size: fontSize, bold: forceBold }));
    });
    return runs;
}

function createTable(rowsData) {
    const columnCount = rowsData[0].length;
    const colWidth = PAGE_WIDTH_DXA / columnCount;
    return new Table({
        width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        columnWidths: Array(columnCount).fill(colWidth),
        rows: rowsData.map((row, index) => new TableRow({
            cantSplit: true,
            children: row.map(cellText => new TableCell({
                width: { size: colWidth, type: WidthType.DXA },
                shading: index === 0 ? { fill: "F2F2F2" } : undefined,
                children: [new Paragraph({ 
                    children: parseInlineText(cellText.trim(), 22, index === 0), 
                    alignment: AlignmentType.CENTER, 
                    indent: { firstLine: 0 }, 
                    spacing: { line: 240, before: 40, after: 40 }, 
                    keepWithNext: index < rowsData.length - 1 
                })],
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 80, bottom: 80, left: 80, right: 80 },
                borders: { top: { style: BorderStyle.SINGLE, size: 2 }, bottom: { style: BorderStyle.SINGLE, size: 2 }, left: { style: BorderStyle.SINGLE, size: 2 }, right: { style: BorderStyle.SINGLE, size: 2 } }
            }))
        }))
    });
}

generateLabs();
