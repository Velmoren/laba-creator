const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// NODE_PATH for .opencode/node_modules
process.env.NODE_PATH = path.resolve('.opencode/node_modules');
require('module').Module._initPaths();

const assetsDir = path.resolve('assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir);

const diagrams = [
    {
        name: 'er_model.png',
        svg: `
        <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="white"/>
            <style>
                .entity { fill: #f9f9f9; stroke: #333; stroke-width: 2; }
                .text { font-family: 'Segoe UI', Arial; font-size: 14px; fill: #333; }
                .title { font-weight: bold; font-size: 16px; }
                .line { stroke: #666; stroke-width: 1.5; fill: none; }
            </style>
            
            <!-- Entities -->
            <rect x="325" y="50" width="150" height="80" rx="10" class="entity"/>
            <text x="400" y="95" text-anchor="middle" class="text title">ПРЕПОДАВАТЕЛЬ</text>
            
            <rect x="325" y="200" width="150" height="80" rx="10" class="entity"/>
            <text x="400" y="245" text-anchor="middle" class="text title">ГРУППА</text>
            
            <rect x="550" y="200" width="150" height="80" rx="10" class="entity"/>
            <text x="625" y="245" text-anchor="middle" class="text title">КУРС</text>
            
            <rect x="100" y="200" width="150" height="80" rx="10" class="entity"/>
            <text x="175" y="245" text-anchor="middle" class="text title">КЛИЕНТ</text>
            
            <rect x="100" y="350" width="150" height="80" rx="10" class="entity"/>
            <text x="175" y="395" text-anchor="middle" class="text title">ДОГОВОР</text>
            
            <rect x="325" y="350" width="150" height="80" rx="10" class="entity"/>
            <text x="400" y="395" text-anchor="middle" class="text title">ЗАНЯТИЕ</text>

            <rect x="325" y="500" width="150" height="60" rx="10" class="entity"/>
            <text x="400" y="535" text-anchor="middle" class="text title">УСПЕВАЕМОСТЬ</text>

            <!-- Connections -->
            <line x1="400" y1="130" x2="400" y2="200" class="line"/>
            <text x="410" y="170" class="text">1:N</text>
            
            <line x1="475" y1="240" x2="550" y2="240" class="line"/>
            <text x="500" y="230" class="text">N:1</text>
            
            <line x1="250" y1="240" x2="325" y2="240" class="line"/>
            <text x="270" y="230" class="text">M:N</text>
            
            <line x1="175" y1="280" x2="175" y2="350" class="line"/>
            <text x="185" y="320" class="text">1:N</text>
            
            <line x1="400" y1="280" x2="400" y2="350" class="line"/>
            <text x="410" y="320" class="text">1:N</text>

            <line x1="400" y1="430" x2="400" y2="500" class="line"/>
        </svg>
        `
    },
    {
        name: 'datalogical_model.png',
        svg: `
        <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="white"/>
            <style>
                .table { fill: #fff; stroke: #0056b3; stroke-width: 2; }
                .header { fill: #0056b3; }
                .header-text { fill: white; font-family: 'Consolas', monospace; font-size: 14px; font-weight: bold; }
                .row-text { font-family: 'Consolas', monospace; font-size: 12px; fill: #333; }
                .pk { fill: #d4edda; }
                .fk { fill: #fff3cd; }
            </style>
            
            <!-- Table: Clients -->
            <rect x="50" y="50" width="200" height="150" class="table"/>
            <rect x="50" y="50" width="200" height="30" class="header"/>
            <text x="150" y="70" text-anchor="middle" class="header-text">clients</text>
            <rect x="50" y="80" width="200" height="20" class="pk"/>
            <text x="60" y="95" class="row-text">PK id_клиента (INT)</text>
            <text x="60" y="115" class="row-text">фамилия (VARCHAR)</text>
            <text x="60" y="135" class="row-text">имя (VARCHAR)</text>
            <text x="60" y="155" class="row-text">телефон (VARCHAR)</text>
            
            <!-- Table: Groups -->
            <rect x="300" y="50" width="200" height="150" class="table"/>
            <rect x="300" y="50" width="200" height="30" class="header"/>
            <text x="400" y="70" text-anchor="middle" class="header-text">groups</text>
            <rect x="300" y="80" width="200" height="20" class="pk"/>
            <text x="310" y="95" class="row-text">PK id_группы (INT)</text>
            <text x="310" y="115" class="row-text">название (VARCHAR)</text>
            <rect x="300" y="120" width="200" height="20" class="fk"/>
            <text x="310" y="135" class="row-text">FK id_курса (INT)</text>
            <rect x="300" y="140" width="200" height="20" class="fk"/>
            <text x="310" y="155" class="row-text">FK id_препод (INT)</text>

            <!-- Table: Contracts -->
            <rect x="50" y="250" width="200" height="130" class="table"/>
            <rect x="50" y="250" width="200" height="30" class="header"/>
            <text x="150" y="270" text-anchor="middle" class="header-text">contracts</text>
            <rect x="50" y="280" width="200" height="20" class="pk"/>
            <text x="60" y="295" class="row-text">PK id_договора (INT)</text>
            <rect x="50" y="300" width="200" height="20" class="fk"/>
            <text x="60" y="315" class="row-text">FK id_клиента (INT)</text>
            <rect x="50" y="320" width="200" height="20" class="fk"/>
            <text x="60" y="335" class="row-text">FK id_группы (INT)</text>
            <text x="60" y="355" class="row-text">сумма (DECIMAL)</text>
        </svg>
        `
    },
    {
        name: 'architecture.png',
        svg: `
        <svg width="800" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="white"/>
            <style>
                .box { fill: #e1f5fe; stroke: #01579b; stroke-width: 2; }
                .db { fill: #fff9c4; stroke: #f57f17; stroke-width: 2; }
                .text { font-family: 'Segoe UI', Arial; font-size: 14px; fill: #333; text-anchor: middle; }
                .bold { font-weight: bold; }
            </style>
            
            <rect x="300" y="20" width="200" height="60" class="box"/>
            <text x="400" y="55" class="text bold">ИНТЕРФЕЙС МЕНЕДЖЕРА</text>
            
            <line x1="400" y1="80" x2="400" y2="150" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
            
            <rect x="250" y="150" width="300" height="100" class="box"/>
            <text x="400" y="190" class="text bold">СЕРВЕР ПРИЛОЖЕНИЙ</text>
            <text x="400" y="220" class="text">Бизнес-логика / SQL-запросы</text>
            
            <line x1="400" y1="250" x2="400" y2="300" stroke="#333" stroke-width="2"/>
            
            <path d="M 300 300 L 500 300 L 520 330 L 520 380 L 280 380 L 280 330 Z" class="db"/>
            <text x="400" y="350" class="text bold">БАЗА ДАННЫХ</text>
            <text x="400" y="370" class="text">PostgreSQL</text>
            
            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#333" />
                </marker>
            </defs>
        </svg>
        `
    },
    {
        name: 'process_flow.png',
        svg: `
        <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="white"/>
            <style>
                .step { fill: #f3e5f5; stroke: #7b1fa2; stroke-width: 2; }
                .decision { fill: #fff3e0; stroke: #e65100; stroke-width: 2; }
                .text { font-family: 'Segoe UI', Arial; font-size: 13px; fill: #333; text-anchor: middle; }
            </style>
            
            <rect x="325" y="20" width="150" height="50" rx="25" class="step"/>
            <text x="400" y="50" class="text">Начало</text>
            
            <path d="M 400 70 L 400 110" stroke="#333" stroke-width="2"/>
            
            <rect x="300" y="110" width="200" height="60" class="step"/>
            <text x="400" y="145" class="text">Выбор курса и группы</text>
            
            <path d="M 400 170 L 400 210" stroke="#333" stroke-width="2"/>
            
            <path d="M 400 210 L 500 250 L 400 290 L 300 250 Z" class="decision"/>
            <text x="400" y="255" class="text">Места есть?</text>
            
            <path d="M 500 250 L 600 250 L 600 140 L 500 140" stroke="#c62828" stroke-width="2" fill="none"/>
            <text x="550" y="240" class="text" style="fill: #c62828">Нет</text>
            
            <path d="M 400 290 L 400 340" stroke="#333" stroke-width="2"/>
            <text x="420" y="320" class="text">Да</text>
            
            <rect x="300" y="340" width="200" height="60" class="step"/>
            <text x="400" y="375" class="text">Создание договора</text>
            
            <path d="M 400 400 L 400 440" stroke="#333" stroke-width="2"/>
            
            <rect x="325" y="440" width="150" height="50" rx="25" class="step"/>
            <text x="400" y="470" class="text">Оплата и зачисление</text>
        </svg>
        `
    }
];

(async () => {
    console.log('Launching browser to render diagrams...');
    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (const diag of diagrams) {
        await page.setContent(diag.svg);
        const svgElement = await page.$('svg');
        await svgElement.screenshot({ 
            path: path.join(assetsDir, diag.name),
            omitBackground: true
        });
        console.log(`Generated: ${diag.name}`);
    }

    await browser.close();
    console.log('All diagrams generated successfully in assets/');
})();
