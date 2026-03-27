const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, BorderStyle, WidthType, PageBreak, TableOfContents, ShadingType, VerticalAlign, TableLayoutType } = require('docx');

const sourceDir = 'Курсовая_КомпьютерныеКурсы';
const outputDoc = 'docs/Курсовая_ФИНАЛ_ГОСТ.docx';

async function generateDoc() {
    console.log('Advanced SQL Code Formatting...');

    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: { size: 28, font: "Times New Roman" },
                    paragraph: { spacing: { line: 360 }, alignment: AlignmentType.JUSTIFIED },
                },
            },
            paragraphStyles: [
                {
                    id: "Normal",
                    name: "Normal",
                    quickFormat: true,
                    run: { size: 28, font: "Times New Roman" },
                    paragraph: {
                        spacing: { line: 360, before: 0, after: 0 },
                        alignment: AlignmentType.JUSTIFIED,
                        indent: { firstLine: 709 },
                    },
                },
                {
                    id: "Caption",
                    name: "Caption",
                    run: { size: 24, font: "Times New Roman" },
                    paragraph: {
                        spacing: { before: 240, after: 120 },
                        alignment: AlignmentType.LEFT,
                        indent: { firstLine: 0 },
                    },
                },
                {
                    id: "CodeBlock",
                    name: "Code Block",
                    run: { size: 17, font: "Consolas", color: "2B2B2B" },
                    paragraph: {
                        spacing: { line: 200, before: 0, after: 0 },
                        alignment: AlignmentType.LEFT,
                        indent: { left: 400 },
                        shading: { type: ShadingType.CLEAR, fill: "FDFDFD" },
                    },
                },
                {
                    id: "Heading1",
                    name: "Heading 1",
                    run: { size: 32, bold: true, allCaps: true },
                    paragraph: {
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 400, after: 200, line: 240 },
                        pageBreakBefore: true,
                    },
                },
                {
                    id: "Heading2",
                    name: "Heading 2",
                    run: { size: 28, bold: true },
                    paragraph: {
                        alignment: AlignmentType.LEFT,
                        spacing: { before: 200, after: 100, line: 240 },
                        indent: { firstLine: 709 },
                    },
                },
            ],
        },
        sections: [
            {
                properties: {
                    page: {
                        size: { width: 11906, height: 16838 },
                        margin: { top: 1134, bottom: 1134, left: 1701, right: 850 },
                    },
                },
                children: [
                    // Титульник (Оставляем)
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

                    new PageBreak(),
                    new Paragraph({ text: "СОДЕРЖАНИЕ", heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
                    new TableOfContents("Содержание", { hyperlink: true, headingStyleRange: "1-3" }),
                    new PageBreak(),

                    ...parseChapters(),
                ],
            },
        ],
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputDoc, buffer);
    console.log(`Success! Fixed document saved at: ${outputDoc}`);
}

function parseInlineText(text) {
    const parts = text.split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*)/g);
    const runs = [];
    parts.forEach(part => {
        if (part.startsWith('***') && part.endsWith('***')) runs.push(new TextRun({ text: part.slice(3, -3), bold: true, italic: true }));
        else if (part.startsWith('**') && part.endsWith('**')) runs.push(new TextRun({ text: part.slice(2, -2), bold: true }));
        else if (part.startsWith('*') && part.endsWith('*')) runs.push(new TextRun({ text: part.slice(1, -1), italic: true }));
        else if (part) runs.push(new TextRun({ text: part }));
    });
    return runs.length > 0 ? runs : [new TextRun({ text: text })];
}

function createTable(rowsData) {
    const columnCount = rowsData[0].length;
    const totalWidth = 9355; 
    const colWidth = totalWidth / columnCount;
    return new Table({
        width: { size: totalWidth, type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        columnWidths: Array(columnCount).fill(colWidth),
        rows: rowsData.map((row, index) => new TableRow({
            children: row.map(cellText => new TableCell({
                width: { size: colWidth, type: WidthType.DXA },
                children: [new Paragraph({
                    children: parseInlineText(cellText.trim()),
                    indent: { firstLine: 0 },
                    alignment: index === 0 ? AlignmentType.CENTER : AlignmentType.LEFT,
                    spacing: { line: 240, before: 60, after: 60 },
                })],
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 120, bottom: 120, left: 120, right: 120 },
                borders: {
                    top: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
                },
            })),
        })),
    });
}

function parseChapters() {
    const chapters = ['03-Введение.md', '04-Глава1_Анализ_предметной_области.md', '05-Глава2_Проектирование_БД.md', '06-Глава3_Программная_реализация.md', '07-Заключение.md', '08-Список_источников.md', '09-Приложение_А.md', '10-Приложение_Б.md'];
    const nodes = [];
    
    chapters.forEach(file => {
        const filePath = path.join(sourceDir, file);
        if (!fs.existsSync(filePath)) return;
        const text = fs.readFileSync(filePath, 'utf8');
        const lines = text.split(/\r?\n/);
        
        let inCodeBlock = false;
        let inTable = false;
        let tableRows = [];

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            const trimmed = line.trim();

            if (trimmed.startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                if (!inCodeBlock) nodes.push(new Paragraph({ text: "", spacing: { before: 120 } })); // Spacer after code
                continue;
            }

            if (inCodeBlock) {
                // Если строка содержит комментарий --, красим его в серый
                const parts = line.split('--');
                const runChildren = [];
                runChildren.push(new TextRun({ text: parts[0] }));
                if (parts.length > 1) {
                    runChildren.push(new TextRun({ text: '--' + parts.slice(1).join('--'), color: "888888", italic: true }));
                }

                nodes.push(new Paragraph({
                    style: "CodeBlock",
                    children: runChildren,
                    border: {
                        left: { color: "CCCCCC", space: 12, style: BorderStyle.SINGLE, size: 12 }, // Только левая черта для структуры
                    }
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
                if (tableRows.length > 0) nodes.push(createTable(tableRows));
                inTable = false;
                tableRows = [];
            }

            if (!trimmed) continue;

            if (trimmed.startsWith('# ')) nodes.push(new Paragraph({ text: trimmed.replace('# ', ''), heading: HeadingLevel.HEADING_1 }));
            else if (trimmed.startsWith('## ')) nodes.push(new Paragraph({ text: trimmed.replace('## ', ''), heading: HeadingLevel.HEADING_2 }));
            else if (trimmed.startsWith('### ')) nodes.push(new Paragraph({ text: trimmed.replace('### ', ''), heading: HeadingLevel.HEADING_3 }));
            else if (trimmed.startsWith('Таблица') || trimmed.startsWith('Рисунок')) {
                nodes.push(new Paragraph({ style: "Caption", children: parseInlineText(trimmed) }));
            } else {
                nodes.push(new Paragraph({ style: "Normal", children: parseInlineText(trimmed) }));
            }
        }
    });
    return nodes;
}

generateDoc().catch(err => console.error(err));
