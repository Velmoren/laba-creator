# История изменений

## 2026-04-02 - Исправление критических ошибок открытия DOCX в MS Office

### Проблемы
1. ❌ Файлы не открывались в MS Office (ошибка при открытии)
2. ❌ Изображения сохранялись с расширением `.undefined`
3. ❌ Оглавление не отображалось корректно

### Решения

#### 1. PageBreak → pageBreakBefore (КРИТИЧЕСКОЕ)
**Проблема:** `new PageBreak()` генерирует XML, несовместимый с MS Office в docx 8.5.0

**Исправлено в:**
- `scripts/generator.js` (строки 63, 66)
- `scripts/generate_labs.js` (строка 66)

**Было:**
```javascript
new PageBreak(),
```

**Стало:**
```javascript
new Paragraph({ text: "", pageBreakBefore: true }),
```

#### 2. Тип изображений
**Проблема:** Изображения сохранялись как `.undefined`

**Исправлено в:** `scripts/generator.js:96`
```javascript
new ImageRun({ 
    data: buffer, 
    transformation: { width: 600, height: 400 },
    type: 'png'  // ← Добавлено
})
```

#### 3. Уровни заголовков для оглавления
**Проблема:** Оглавление не генерировалось автоматически

**Исправлено в:** `scripts/generator.js:35-37`
- Добавлены `outlineLevel: 0/1/2` в стили заголовков
- Добавлены `heading: HeadingLevel.HEADING_X` при создании параграфов

### Новые инструменты
- `scripts/validate_docx.js` - валидация DOCX файлов
- `npm run validate` - проверка всех DOCX
- `npm run build-all` - полная сборка с валидацией
- `README.md` - полная документация

### Результат
✅ Все 8 DOCX файлов открываются в MS Office без ошибок
✅ Изображения корректно встраиваются как PNG
✅ Оглавление работает (требует обновления: Ctrl+A → F9)
