const fs = require('fs');
const path = require('path');
const https = require('https');
const zlib = require('zlib');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, BorderStyle, WidthType, TableOfContents, ShadingType, VerticalAlign, TableLayoutType, ImageRun, ExternalHyperlink } = require('docx');

// Получаем ID из аргументов командной строки (по умолчанию 1)
const entryId = process.argv[2] || '1';
const sourceDir = path.join('src', entryId, 'курсовая');
const outputDir = path.join('dist', entryId);
const outputDoc = path.join(outputDir, 'Курсовая_ФИНАЛ_ГОСТ.docx');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const PAGE_WIDTH_DXA = 9355; 

async function generateDoc() {
    console.log(`Generating Course Work for Entry ID: ${entryId}...`);
    if (!fs.existsSync(sourceDir)) {
        console.error(`Error: Source directory ${sourceDir} not found!`);
        process.exit(1);
    }

    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: { size: 28, font: "Times New Roman", color: "000000" },
                    paragraph: { spacing: { line: 360 }, alignment: AlignmentType.JUSTIFIED },
                },
            },
            paragraphStyles: [
                { id: "Normal", name: "Normal", quickFormat: true, run: { size: 28, font: "Times New Roman" }, paragraph: { spacing: { line: 360, before: 0, after: 0 }, alignment: AlignmentType.JUSTIFIED, indent: { firstLine: 709 } } },
                { id: "Caption", name: "Caption", run: { size: 24, font: "Times New Roman", bold: true }, paragraph: { spacing: { before: 300, after: 120 }, alignment: AlignmentType.CENTER, indent: { firstLine: 0 } } },
                { id: "Heading1", name: "Heading 1", run: { size: 32, bold: true, allCaps: true, color: "000000" }, paragraph: { alignment: AlignmentType.CENTER, spacing: { before: 600, after: 300, line: 240 }, pageBreakBefore: true, indent: { firstLine: 0 }, keepWithNext: true, outlineLevel: 0 } },
                { id: "Heading2", name: "Heading 2", run: { size: 28, bold: true, color: "000000" }, paragraph: { alignment: AlignmentType.LEFT, spacing: { before: 480, after: 240, line: 240 }, indent: { firstLine: 0 }, keepWithNext: true, outlineLevel: 1 } },
                { id: "Heading3", name: "Heading 3", run: { size: 28, bold: true, color: "000000" }, paragraph: { alignment: AlignmentType.LEFT, spacing: { before: 400, after: 200, line: 240 }, indent: { firstLine: 0 }, keepWithNext: true, outlineLevel: 2 } },
                { id: "CodeBlock", name: "Code Block", run: { size: 17, font: "Consolas", color: "2B2B2B" }, paragraph: { spacing: { before: 240, after: 240, line: 200 }, alignment: AlignmentType.LEFT, indent: { left: 400 }, shading: { type: ShadingType.CLEAR, fill: "FDFDFD" } } },
                { id: "List", name: "List Paragraph", basedOn: "Normal", paragraph: { spacing: { line: 360, before: 40, after: 40 }, indent: { left: 1000, hanging: 300 } } },
                { id: "Bibliography", name: "Bibliography", basedOn: "Normal", paragraph: { spacing: { line: 360, before: 120 }, indent: { left: 709, hanging: 709 } } },
                { id: "Hyperlink", name: "Hyperlink", run: { color: "0563C1", underline: { type: "single" } } },
            ],
        },
        sections: [{
            properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1701, right: 850 } } },
            children: [
                // ТИТУЛЬНЫЙ ЛИСТ
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "МИНИСТЕРСТВО ЦИФРОВОГО РАЗВИТИЯ, СВЯЗИ И МАССОВЫХ КОММУНИКАЦИЙ РОССИЙСКОЙ ФЕДЕРАЦИИ", bold: true })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ФЕДЕРАЛЬНОЕ ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ ВЫСШЕГО ОБРАЗОВАНИЯ", bold: true })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "«МОСКОВСКИЙ ТЕХНИЧЕСКИЙ УНИВЕРСИТЕТ СВЯЗИ И ИНФОРМАТИКИ»", bold: true })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "(МТУСИ)", bold: true })] }),
                new Paragraph({ text: "" }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "КАФЕДРА ИНФОРМАТИКИ И ИНФОРМАЦИОННЫХ ТЕХНОЛОГИЙ", bold: true })] }),
                new Paragraph({ text: "\n\n" }),
                new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Допустить к защите", bold: true }), new TextRun({ text: "\nЗав. кафедрой _______________", break: 1 }), new TextRun({ text: "\n«___» ____________ 2025 г.", break: 1 })] }),
                new Paragraph({ text: "\n\n" }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "КУРСОВАЯ РАБОТА", bold: true, size: 32 }), new TextRun({ text: "\nпо дисциплине «Базы данных»", break: 1 }), new TextRun({ text: "\n\nРазработка базы данных для АИС «Компьютерные курсы»", bold: true, break: 2, size: 32 })] }),
                new Paragraph({ text: "\n\n" }),
                new Paragraph({ alignment: AlignmentType.LEFT, indent: { left: 5000 }, children: [new TextRun({ text: "Выполнил: студент гр. ________" }), new TextRun({ text: "\n_________________ /____________/", break: 1 }), new TextRun({ text: "\n\nРуководитель: _______________", break: 2 }), new TextRun({ text: "\n_________________ /____________/", break: 1 })] }),
                new Paragraph({ text: "\n\n\n" }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Москва 2025", bold: true })] }),

                // Разрыв страницы через параграф вместо PageBreak
                new Paragraph({ text: "", pageBreakBefore: true }),
                new Paragraph({ text: "СОДЕРЖАНИЕ", heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
                new TableOfContents("Содержание", { hyperlink: true, headingStyleRange: "1-3" }),
                // Разрыв страницы через параграф вместо PageBreak
                new Paragraph({ text: "", pageBreakBefore: true }),

                ...(await parseChapters()),
            ],
        }],
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputDoc, buffer);
    console.log(`Success! DOCX with functional links saved at: ${outputDoc}`);
}

async function renderDiagram(code) {
    const cleanCode = code.split('\n').map(l => l.trim()).filter(l => l.length > 0).join('\n');
    const compressed = zlib.deflateSync(Buffer.from(cleanCode, 'utf8'));
    const base64safe = compressed.toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
    const url = `https://kroki.io/mermaid/png/${base64safe}`;

    return new Promise((resolve) => {
        https.get(url, (res) => {
            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                if (res.statusCode === 200 && buffer.length > 500) {
                    resolve(new Paragraph({ 
                        alignment: AlignmentType.CENTER, 
                        children: [new ImageRun({ 
                            data: buffer, 
                            transformation: { width: 600, height: 400 },
                            type: 'png'
                        })], 
                        spacing: { before: 200, after: 200 } 
                    }));
                } else {
                    resolve(new Paragraph({ text: "[Диаграмма Mermaid]", alignment: AlignmentType.CENTER }));
                }
            });
        }).on('error', () => resolve(new Paragraph({ text: "[Ошибка сети]", alignment: AlignmentType.CENTER })));
    });
}

function parseInlineText(text, fontSize = 28, forceBold = false) {
    // Поддержка ссылок [Название](URL)
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const runs = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
        // Текст ДО ссылки
        if (match.index > lastIndex) {
            runs.push(...parseMarkdownStyles(text.substring(lastIndex, match.index), fontSize, forceBold));
        }
        // Сама ссылка
        runs.push(new ExternalHyperlink({
            children: [new TextRun({ text: match[1], style: "Hyperlink", size: fontSize })],
            link: match[2],
        }));
        lastIndex = linkRegex.lastIndex;
    }

    // Текст ПОСЛЕ ссылок
    if (lastIndex < text.length) {
        runs.push(...parseMarkdownStyles(text.substring(lastIndex), fontSize, forceBold));
    }

    return runs.length > 0 ? runs : [new TextRun({ text: text, size: fontSize, bold: forceBold })];
}

function parseMarkdownStyles(text, fontSize, forceBold) {
    const parts = text.split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*)/g);
    const runs = [];
    parts.forEach(part => {
        if (part.startsWith('***')) runs.push(new TextRun({ text: part.slice(3, -3), bold: true, italic: true, size: fontSize }));
        else if (part.startsWith('**')) runs.push(new TextRun({ text: part.slice(2, -2), bold: true, size: fontSize }));
        else if (part.startsWith('*')) runs.push(new TextRun({ text: part.slice(1, -1), italic: true, size: fontSize }));
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

function createSpacingParagraph() {
    return new Paragraph({ text: "", spacing: { before: 200, after: 200 } });
}

function createCodeBlock(lines) {
    return new Table({
        width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        columnWidths: [PAGE_WIDTH_DXA],
        rows: [new TableRow({
            children: [new TableCell({
                width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
                children: lines.map(line => {
                    const parts = line.split('--');
                    const runs = [new TextRun({ text: parts[0], font: "Courier New", size: 20 })];
                    if (parts.length > 1) runs.push(new TextRun({ text: '--' + parts.slice(1).join('--'), font: "Courier New", size: 20, color: "666666", italic: true }));
                    return new Paragraph({ children: runs, spacing: { line: 240 }, alignment: AlignmentType.LEFT, indent: { firstLine: 0 } });
                }),
                shading: { fill: "F6F6F6" },
                margins: { top: 120, bottom: 120, left: 120, right: 120 },
                borders: { top: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" }, bottom: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" }, left: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" }, right: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" } }
            })]
        })]
    });
}

async function parseChapters() {
    const chapters = ['03-Введение.md', '04-Глава1_Анализ_предметной_области.md', '05-Глава2_Проектирование_БД.md', '06-Глава3_Программная_реализация.md', '07-Заключение.md', '08-Список_источников.md', '09-Приложение_А.md', '10-Приложение_Б.md'];
    const nodes = [];
    
    for (const file of chapters) {
        const filePath = path.join(sourceDir, file);
        if (!fs.existsSync(filePath)) continue;
        const text = fs.readFileSync(filePath, 'utf8');
        const lines = text.split(/\r?\n/);
        let inCodeBlock = false, inMermaid = false, codeBuffer = [], inTable = false, tableRows = [];

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i], trimmed = line.trim();
            if (!trimmed || trimmed === '---' || trimmed === '--' || trimmed === '===' || trimmed === '***') continue;

            if (trimmed.startsWith('```mermaid')) { inMermaid = true; codeBuffer = []; continue; }
            if (trimmed.startsWith('```') && inMermaid) {
                inMermaid = false;
                nodes.push(await renderDiagram(codeBuffer.join('\n')));
                continue;
            }
            if (inMermaid) { codeBuffer.push(line); continue; }

            if (trimmed.startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                if (!inCodeBlock) {
                    nodes.push(createSpacingParagraph());
                    nodes.push(createCodeBlock(codeBuffer));
                    nodes.push(createSpacingParagraph());
                }
                else codeBuffer = [];
                continue;
            }
            if (inCodeBlock) { codeBuffer.push(line); continue; }

            // Парсинг определений ссылок: [1]: url (Title)
            const refLinkMatch = trimmed.match(/^\[(\d+)\]:\s+(https?:\/\/\S+)\s+\((.+)\)/);
            if (refLinkMatch) {
                nodes.push(new Paragraph({
                    style: "Bibliography",
                    children: [
                        new TextRun({ text: `[${refLinkMatch[1]}] ` }),
                        new ExternalHyperlink({
                            children: [new TextRun({ text: refLinkMatch[3], style: "Hyperlink" })],
                            link: refLinkMatch[2]
                        })
                    ]
                }));
                continue;
            }

            if (trimmed.startsWith('|')) {
                if (trimmed.includes('---')) continue;
                inTable = true;
                const cleanCells = trimmed.split('|').map(s => s.trim()).filter((s, idx, arr) => idx > 0 && idx < arr.length - 1);
                if (cleanCells.length > 0) tableRows.push(cleanCells);
                continue;
            } else if (inTable) {
                if (tableRows.length > 0) {
                    nodes.push(createSpacingParagraph());
                    nodes.push(createTable(tableRows));
                    nodes.push(createSpacingParagraph());
                }
                inTable = false; tableRows = [];
            }

            if (trimmed.startsWith('# ')) nodes.push(new Paragraph({ text: trimmed.replace('# ', ''), style: "Heading1", heading: HeadingLevel.HEADING_1 }));
            else if (trimmed.startsWith('## ')) nodes.push(new Paragraph({ text: trimmed.replace('## ', ''), style: "Heading2", heading: HeadingLevel.HEADING_2 }));
            else if (trimmed.startsWith('### ')) nodes.push(new Paragraph({ text: trimmed.replace('### ', ''), style: "Heading3", heading: HeadingLevel.HEADING_3 }));
            else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                nodes.push(new Paragraph({ style: "List", children: [new TextRun({ text: "•  " }), ...parseInlineText(trimmed.slice(2))] }));
            }
            else if (trimmed.startsWith('Таблица') || trimmed.startsWith('Рисунок')) {
                nodes.push(new Paragraph({ style: "Caption", children: parseInlineText(trimmed), keepWithNext: true }));
            } else if (trimmed.match(/^\d+\./)) {
                nodes.push(new Paragraph({ style: "Bibliography", children: parseInlineText(trimmed) }));
            } else {
                nodes.push(new Paragraph({ style: "Normal", children: parseInlineText(trimmed) }));
            }
        }
    }
    return nodes;
}

generateDoc().catch(err => console.error(err));
