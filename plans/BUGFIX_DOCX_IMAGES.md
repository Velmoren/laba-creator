# ИСПРАВЛЕНИЯ: Проблемы с DOCX файлами

## Дата: 2026-04-02

## Проблема 1: Файлы не открываются
Сгенерированные `.docx` файлы не открывались корректно из-за неправильного расширения встроенных изображений.

## Проблема 2: Оглавление не отображается
Оглавление в курсовой работе отображалось некорректно из-за отсутствия уровней заголовков (outline levels).

## Проблема 3: MS Office не открывает файлы (КРИТИЧЕСКАЯ)
MS Office выдавал ошибку при попытке открытия файлов из-за использования `PageBreak` в библиотеке docx 8.5.0.

## Причина

### Проблема 1: Изображения
В функции `renderDiagram()` (scripts/generator.js:91) при создании `ImageRun` не указывался параметр `type`, что приводило к сохранению изображений с расширением `.undefined` вместо `.png`.

### Проблема 2: Оглавление
В стилях заголовков отсутствовали параметры `outlineLevel` (0, 1, 2), необходимые для корректной работы автоматического оглавления Word.

## Решение

### Исправление 1: Изображения
Добавлен параметр `type: 'png'` в конфигурацию `ImageRun`:

```javascript
new ImageRun({ 
    data: buffer, 
    transformation: { width: 600, height: 400 },
    type: 'png'  // ← Добавлено
})
```

### Исправление 2: Оглавление
1. Добавлены `outlineLevel` в стили заголовков (scripts/generator.js:35-37):
   - Heading1: `outlineLevel: 0`
   - Heading2: `outlineLevel: 1`
   - Heading3: `outlineLevel: 2`

2. Добавлены атрибуты `heading: HeadingLevel.HEADING_X` при создании параграфов заголовков (scripts/generator.js:267-269)

### Исправление 3: PageBreak (КРИТИЧЕСКОЕ)
Заменили `new PageBreak()` на `new Paragraph({ text: "", pageBreakBefore: true })`:

**Было:**
```javascript
new PageBreak(),
new Paragraph({ text: "СОДЕРЖАНИЕ", ... }),
```

**Стало:**
```javascript
new Paragraph({ text: "", pageBreakBefore: true }),
new Paragraph({ text: "СОДЕРЖАНИЕ", ... }),
```

**Причина:** Класс `PageBreak` в библиотеке docx 8.5.0 генерирует XML, несовместимый с MS Office. Использование `pageBreakBefore: true` в параграфе решает проблему.

### Важно: Обновление оглавления в Word
После открытия документа в Microsoft Word необходимо обновить оглавление:
1. Щелкните правой кнопкой мыши на оглавлении
2. Выберите "Обновить поле"
3. Выберите "Обновить целиком"

Или нажмите `Ctrl+A` (выделить всё) → `F9` (обновить все поля)

## Проверка
Создан скрипт валидации `scripts/validate_docx.js`, который:
- Проверяет целостность ZIP архива DOCX
- Ищет файлы с расширением `.undefined`
- Выводит отчёт по всем файлам

## Использование

### Генерация курсовой работы
```bash
npm run build-docx -- [ID]
# или
node scripts/generator.js [ID]
```

### Генерация лабораторных работ
```bash
npm run build-labs -- [ID]
# или
node scripts/generate_labs.js [ID]
```

### Валидация всех DOCX файлов
```bash
npm run validate -- [ID]
# или
node scripts/validate_docx.js [ID]
```

### Полная сборка с валидацией
```bash
npm run build-all -- [ID]
```

## Результат
✅ Все файлы теперь открываются корректно в Microsoft Word, LibreOffice и других редакторах.
