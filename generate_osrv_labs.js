const fs = require('fs');
const path = require('path');

const students = [
    {
        id: '2',
        user: 'ivanov',
        bg: 'solid dark blue screen background'
    },
    {
        id: '3',
        user: 'alex_dev',
        bg: 'blurred abstract neon background'
    }
];

const terminalPrompt = `The image MUST look like a raw, minimalist FreeBSD terminal console. Solid black background, crisp white monospaced font. The terminal prompt should just be "$ " for a normal user or "# " for root. Do NOT generate any desktop environment elements, window borders, icons, taskbars, or colorful text. Focus 100% on the text, commands, and code structure.`;

function writeFiles(studentId, subDir, files) {
    const dir = path.join(`src/${studentId}/лабораторные`, subDir);
    fs.mkdirSync(dir, { recursive: true });
    for (const [name, content] of Object.entries(files)) {
        fs.writeFileSync(path.join(dir, name), content.trim() + '\n');
    }
}

students.forEach(s => {
    const isS1 = s.id === '2';
    
    // ЛР 1
    const md1 = `# Отчет по лабораторной работе №1
## Дисциплина: «Операционные системы реального времени»

**Цель работы:** Ознакомиться с файловой структурой ОС FreeBSD и изучить основные команды работы с файлами.

### 1. Создание текстовых файлов
Для создания файлов применялись редакторы \`vim\` и \`nano\`. 
Были созданы файлы \`${isS1 ? 'doc1.txt' : 'fileA.txt'}\` и \`${isS1 ? 'doc2.txt' : 'fileB.txt'}\`.

### 2. Создание структуры каталогов
С помощью команды \`mkdir\` создана структура директорий:
\`\`\`sh
mkdir -p ${isS1 ? 'workdir/docs workdir/scripts' : 'project/src project/logs'}
\`\`\`

### 3. Работа с жесткими и символическими ссылками
Созданы ссылки на файл:
\`\`\`sh
ln -s ${isS1 ? 'doc1.txt link1_soft' : 'fileA.txt sym_link'}
ln ${isS1 ? 'doc1.txt link2_hard' : 'fileA.txt hard_link'}
\`\`\`
После удаления оригинального файла символическая ссылка перестала работать, а жесткая сохранила доступ к данным.

**Вывод:** Изучены основные команды FreeBSD для управления файлами и отличия жестких ссылок от символических.`;

    const prompt1 = `Prompt:
${terminalPrompt} Background around terminal: ${s.bg}.
Terminal content shows:
$ mkdir -p ${isS1 ? 'workdir/docs' : 'project/src'}
$ ln -s ${isS1 ? 'doc1.txt link1_soft' : 'fileA.txt sym_link'}
$ rm ${isS1 ? 'doc1.txt' : 'fileA.txt'}
$ cat ${isS1 ? 'link1_soft' : 'sym_link'}
cat: ${isS1 ? 'link1_soft' : 'sym_link'}: No such file or directory`;

    writeFiles(s.id, 'ОСРВ_ЛР_1', { 'Отчет_ЛР1.md': md1, 'prompt_screenshot_1.txt': prompt1 });

    // ЛР 2
    const md2 = `# Отчет по лабораторной работе №2
## Дисциплина: «Операционные системы реального времени»

**Цель работы:** Изучение утилит архивации и сжатия файлов в ОС FreeBSD.

### 1. Создание архивов tar
Были созданы 3 типа архивов:
\`\`\`sh
tar -cvf arch1.tar ${isS1 ? 'workdir/docs' : 'project/src'}
tar -cvf arch2.tar *.txt
tar -cvf arch3.tar ${isS1 ? 'workdir/' : 'project/'}
\`\`\`
Программа \`tar\` лишь объединяет файлы, не сжимая их.

### 2. Сжатие архивов
Для сжатия использовались утилиты \`gzip\` и \`bzip2\`:
\`\`\`sh
gzip arch1.tar
bzip2 arch2.tar
\`\`\`
Сравнение объемов (\`ls -lh\`) показало, что \`bzip2\` сжимает сильнее.

**Вывод:** Получены навыки создания архивов и сжатия данных в консоли FreeBSD.`;

    const prompt2 = `Prompt:
${terminalPrompt} Background around terminal: ${s.bg}.
Terminal content shows:
$ tar -cvf arch2.tar *.txt
a file1.txt
a file2.txt
$ gzip arch1.tar
$ bzip2 arch2.tar
$ ls -lh
-rw-r--r--  1 ${s.user}  wheel   2.1K Mar 12 10:00 arch1.tar.gz
-rw-r--r--  1 ${s.user}  wheel   1.8K Mar 12 10:01 arch2.tar.bz2`;

    writeFiles(s.id, 'ОСРВ_ЛР_2', { 'Отчет_ЛР2.md': md2, 'prompt_screenshot_1.txt': prompt2 });

    // ЛР 3
    const md3 = `# Отчет по лабораторной работе №3
## Дисциплина: «Операционные системы реального времени»

**Цель работы:** Изучить команды работы с пользователями, группами и правами доступа.

### 1. Системные файлы и права
Просмотрены файлы \`/etc/passwd\` и \`/etc/group\`.
Выполнен вход под root (\`su\`).

### 2. Создание пользователя и группы
\`\`\`sh
adduser ${isS1 ? 'ivanov_new' : 'dev_alex'}
passwd ${isS1 ? 'ivanov_new' : 'dev_alex'}
pw groupadd ${isS1 ? 'admins_grp' : 'developers'}
pw groupmod ${isS1 ? 'admins_grp' : 'developers'} -m ${isS1 ? 'ivanov_new' : 'dev_alex'}
\`\`\`

### 3. Изменение прав доступа
Права к файлу изменены буквенным и числовым способами:
\`\`\`sh
chmod a+rx test.txt
chmod 755 test2.txt
chown ${isS1 ? 'ivanov_new' : 'dev_alex'} test.txt
\`\`\`

**Вывод:** Изучены принципы управления пользователями и правами в POSIX-системах.`;

    const prompt3 = `Prompt:
${terminalPrompt} Background around terminal: ${s.bg}.
Terminal content shows root prompt:
# adduser ${isS1 ? 'ivanov_new' : 'dev_alex'}
Username: ${isS1 ? 'ivanov_new' : 'dev_alex'}
Full name: User
...
# pw groupadd ${isS1 ? 'admins_grp' : 'developers'}
# chmod 755 test2.txt
# ls -l test2.txt
-rwxr-xr-x  1 root  wheel  123 Mar 12 10:15 test2.txt`;

    writeFiles(s.id, 'ОСРВ_ЛР_3', { 'Отчет_ЛР3.md': md3, 'prompt_screenshot_1.txt': prompt3 });

    // ЛР 4
    const md4 = `# Отчет по лабораторной работе №4
## Дисциплина: «Операционные системы реального времени»

**Цель работы:** Изучить текстовые фильтры и утилиту grep.

### 1. Фильтрация данных с grep
Выполнены выборки из тестовых файлов:
\`\`\`sh
grep "201" query4
grep "^11" query2
grep -E "TENNIS.*1990" query3
\`\`\`

### 2. Работа со строками
Вывод конца файла, обратный порядок и сортировка:
\`\`\`sh
tail -n 10 query1
tail -r query1
tail -n 20 query1 | sort
\`\`\`

**Вывод:** Освоены инструменты фильтрации и потоковой обработки текста.`;

    const prompt4 = `Prompt:
${terminalPrompt} Background around terminal: ${s.bg}.
Terminal content shows:
$ grep "^11" query2
11045  New York   100
11048  Boston     150
$ tail -n 20 query1 | sort
Adams
Baker
Clark
Smith`;

    writeFiles(s.id, 'ОСРВ_ЛР_4', { 'Отчет_ЛР4.md': md4, 'prompt_screenshot_1.txt': prompt4 });

    // ЛР 5
    const md5 = `# Отчет по лабораторной работе №5
## Дисциплина: «Операционные системы реального времени»

**Цель работы:** Написание скриптов на интерпретаторе bash.

В ходе работы разработано 11 скриптов:
- \`task1.sh\` - параметры командной строки.
- \`task2.sh\` - арифметические расчеты.
- \`task8.sh\` - подсчет слов с проверкой типа файла.
- И другие скрипты администрирования.

**Вывод:** Получены навыки автоматизации задач с помощью shell-скриптов.`;

    const prompt5 = `Prompt:
${terminalPrompt} Background around terminal: ${s.bg}.
Terminal content shows:
$ ./task2.sh
10600
$ ./task4.sh
User: ${s.user}
верно`;

    const scripts = {
        'task1.sh': `#!/bin/sh\necho "Param 1: $1, Param 2: $2"`,
        'task2.sh': `#!/bin/sh\nA=10; B=100; C=200; D=$(((A*2 + B/3)*C)); echo $D`,
        'task3.sh': `#!/bin/sh\nls ~ > files.txt; sort files.txt; wc -l < files.txt`,
        'task4.sh': `#!/bin/sh\nread -p "User: " u; if [ "$u" = "$USER" ]; then echo "верно"; else echo "неверно"; fi`,
        'task5.sh': `#!/bin/sh\nread -p "File: " f; file "$f"`,
        'task6.sh': `#!/bin/sh\nfind . -maxdepth 1 -type f -mtime -1`,
        'task7.sh': `#!/bin/sh\nif [ -h "$1" ]; then readlink -f "$1"; fi`,
        'task8.sh': `#!/bin/sh\nif file "$1" | grep -q "text"; then grep -c "$2" "$1"; else echo "Not text"; fi`,
        'task9.sh': `#!/bin/sh\nls -i`,
        'task10.sh': `#!/bin/sh\necho "User files:"; find . -user $1 | wc -l; echo "Other:"; find . ! -user $1 | wc -l`,
        'task11.sh': `#!/bin/sh\nIFS=:; for d in $PATH; do ls -ld "$d"; done`
    };
    scripts['Отчет_ЛР5.md'] = md5;
    scripts['prompt_screenshot_1.txt'] = prompt5;

    writeFiles(s.id, 'ОСРВ_ЛР_5', scripts);

    // ЛР 6
    const md6 = `# Отчет по лабораторной работе №6
## Дисциплина: «Операционные системы реального времени»

**Цель работы:** Изучение средств мониторинга производительности и автоматизации.

### 1. Мониторинг и приоритеты
Изучены команды \`ps\` и \`top\`. Приоритет процесса изменен:
\`\`\`sh
renice +5 $PID
\`\`\`

### 2. Фоновые процессы
Программа \`loop.c\` скомпилирована и запущена в фоне (\`&\`). Процесс прерван командой \`kill\`.

### 3. Автоматизация (cron)
Скрипт архивации добавлен в \`crontab\`:
\`\`\`sh
*/2 * * * * /home/${s.user}/backup.sh
\`\`\`

**Вывод:** Получены навыки работы с приоритетами процессов и планировщиком cron.`;

    const prompt6 = `Prompt:
${terminalPrompt} Background around terminal: ${s.bg}.
Terminal content shows:
$ gcc loop.c -o loop
$ ./loop &
[1] 34567
$ renice +5 34567
34567: old priority 0, new priority 5
$ kill 34567
[1]+  Terminated              ./loop`;

    writeFiles(s.id, 'ОСРВ_ЛР_6', { 
        'Отчет_ЛР6.md': md6, 
        'prompt_screenshot_1.txt': prompt6,
        'loop.c': `#include <unistd.h>\nint main() { while(1) { sleep(1); } return 0; }`,
        'backup.sh': `#!/bin/sh\nif [ "$(ls -A $1)" ]; then tar -czf backup_$(date +%Y%m%d).tar.gz $1; fi`
    });

    // ЛР 7
    const md7 = `# Отчет по лабораторной работе №7
## Дисциплина: «Операционные системы реального времени»

**Цель работы:** Монтирование устройств и проверка состояния дисков.

### 1. Монтирование файловых систем
\`\`\`sh
mount -t msdosfs /dev/da0s1 /mnt/usb
mount -t cd9660 /dev/cd0 /mnt/cdrom
\`\`\`

### 2. Проверка места
Команда \`df -h\` показала свободное место на дисках.
Команда \`du -sh\` показала размер каталогов.

### 3. Демонтирование
\`\`\`sh
umount /mnt/usb
\`\`\`

**Вывод:** Изучены средства монтирования устройств хранения в ОС FreeBSD.`;

    const prompt7 = `Prompt:
${terminalPrompt} Background around terminal: ${s.bg}.
Terminal content shows root prompt:
# mount -t msdosfs /dev/da0s1 /mnt/usb
# df -h
Filesystem      Size    Used   Avail Capacity  Mounted on
/dev/ada0p2      20G    4.5G     14G    24%    /
/dev/da0s1      7.5G    1.2G    6.3G    16%    /mnt/usb
# umount /mnt/usb`;

    writeFiles(s.id, 'ОСРВ_ЛР_7', { 'Отчет_ЛР7.md': md7, 'prompt_screenshot_1.txt': prompt7 });

});

console.log("All OSRV labs generated successfully!");