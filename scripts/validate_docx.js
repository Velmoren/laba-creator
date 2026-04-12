const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Получаем ID из аргументов командной строки (по умолчанию 1)
const entryId = process.argv[2] || '1';

const distRoot = 'dist';
const allDirs = fs.readdirSync(distRoot).filter(d => fs.statSync(path.join(distRoot, d)).isDirectory());
const studentFolderName = allDirs.find(d => d === entryId || d.startsWith(`${entryId}_`));

if (!studentFolderName) {
    console.error(`Error: Directory for student ID ${entryId} not found in dist/`);
    process.exit(1);
}

const distDir = path.join(distRoot, studentFolderName);

console.log(`Validating DOCX files for Entry ID: ${entryId} (Folder: ${studentFolderName})...`);

function findDocxFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.lstatSync(fullPath);
        
        if (stat.isDirectory()) {
            files.push(...findDocxFiles(fullPath));
        } else if (item.endsWith('.docx')) {
            files.push(fullPath);
        }
    }
    
    return files;
}

const docxFiles = findDocxFiles(distDir);
console.log(`Found ${docxFiles.length} DOCX files\n`);

let allValid = true;

for (const file of docxFiles) {
    try {
        // Проверка целостности ZIP архива
        execSync(`unzip -t "${file}"`, { stdio: 'pipe' });
        
        // Проверка на наличие файлов с расширением .undefined
        const result = execSync(`unzip -l "${file}" | grep -c "\\.undefined" || true`, { encoding: 'utf8' });
        const undefinedCount = parseInt(result.trim());
        
        if (undefinedCount > 0) {
            console.log(`❌ ${file} - FAILED (contains ${undefinedCount} .undefined files)`);
            allValid = false;
        } else {
            console.log(`✅ ${file} - OK`);
        }
    } catch (error) {
        console.log(`❌ ${file} - FAILED (corrupted ZIP)`);
        allValid = false;
    }
}

console.log(`\n${allValid ? '✅ All files for ID ${entryId} are valid!' : '❌ Some files for ID ${entryId} have issues!'}`);
process.exit(allValid ? 0 : 1);
