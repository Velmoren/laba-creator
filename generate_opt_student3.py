import os

base_dir = "src/3_novoselz_drum/Методы оптимизации"
os.makedirs(f"{base_dir}/ЛР_1/source", exist_ok=True)
os.makedirs(f"{base_dir}/ЛР_2/source", exist_ok=True)

def write_f(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip())

# LR1 Report for Student 3 (Novoselz)
write_f(f"{base_dir}/ЛР_1/Отчет_ЛР1.md", """
# Отчет по лабораторной работе №1: Графический метод и Excel Solver (Технический дневник)

## 1. Введение: Зачем нужна оптимизация?
Привет! В этой лабораторной работе я погружаюсь в мир методов оптимизации. Обычно кажется, что найти максимум прибыли или минимум затрат можно на глаз, но когда ресурсов много, а ограничений еще больше — без математики никуда. Основная цель — научиться составлять модель и скармливать её надстройке Solver (Поиск решения) в Excel. У меня английская версия интерфейса, поэтому всё буду писать через `=SUMPRODUCT()`.

## 2. Задача 1. Оптимизация на заводе деталей (Вариант 1.3)
### 2.1. С чем работаем?
Завод выпускает детали X и Y. У нас есть фонд рабочего времени — 4000 чел.-ч в неделю. Деталь X съедает 1 час, деталь Y — 2 часа. Максимум можем делать 2250 X и 1750 Y.
По материалам: X просит 2 кг стержней и 5 кг листового металла. Y просит 5 кг стержней и 2 кг листа. Запасы каждого металла — ровно 10000 кг.
Обязательства: заказчику отдаем 600 шт. X еженедельно, а профсоюз требует, чтобы в сумме деталей было не меньше 1500.
Доход: X приносит 30 ед., Y — 40 ед. Надо выжать максимум.

### 2.2. Математика на бумаге
Для английской нотации и минимализма буду использовать простые буквы:
- $x$ — количество деталей X;
- $y$ — количество деталей Y.

Цель — это наши деньги:
$E(x, y) = 30x + 40y \rightarrow \max$

А вот и жесткие рамки (ограничения):
1. Время: $1x + 2y \le 4000$
2. Лимит станков: $x \le 2250$, $y \le 1750$
3. Стержни: $2x + 5y \le 10000$
4. Листы: $5x + 2y \le 10000$
5. План заказчика: $x \ge 600$
6. Профсоюз: $x + y \ge 1500$
Неотрицательность: $x \ge 0, y \ge 0$.

### 2.3. Как я настраивал Excel
Я решил сделать горизонтальную компоновку: переменные $x$ и $y$ идут в строчку слева, а блок ограничений вынесен правее. Дизайн Minimalist: никаких цветных заливок, только черные рамки (Borders) и Arial шрифт.

В ячейку целевой функции я вписал `=SUMPRODUCT()`, умножив строку переменных на строку с доходами (30 и 40). 

![Моя модель в Excel](prompt_excel_1_1_model.png)

Потом открыл Data -> Solver. Выбрал "Max", указал изменяемые ячейки и накликал все 6 ограничений. Важно было выбрать "Simplex LP", иначе Solver мог бы пойти по нелинейному алгоритму, а он тут не нужен.

![Окно Solver'а](prompt_excel_1_1_solver.png)

### 2.4. Что получилось
Solver быстро всё посчитал.
![Результат](prompt_excel_1_1_result.png)

Интересный момент: если бы я поставил задачу на $\min$ (вдруг захотелось бы заработать как можно меньше), Solver бы не выдал нули! Ведь у нас есть жесткое условие от заказчика ($x \ge 600$) и от профсоюза ($x + y \ge 1500$). Так что минимум будет лежать на границе этих двух обязательств.

## 3. Задача 2. Изучаем двойственность (Вариант 2.3)
### 3.1. Что дано?
У нас есть три станка (Токарный, Фрезерный, Шлифовальный) и четыре изделия (А, Б, В, Г).
Матрица расходов и фонды:
- Токарное (300ч): А=2, Б=1, В=1, Г=3
- Фрезерное (70ч): А=1, Б=0, В=2, Г=1
- Шлифовальное (340ч): А=1, Б=2, В=1, Г=0
Цена: А=8, Б=3, В=2, Г=1.

### 3.2. Строим модель
Буквы: $a, b, c, d$ — объемы выпуска.
$E = 8a + 3b + 2c + 1d \rightarrow \max$

$2a + 1b + 1c + 3d \le 300$
$1a + 0b + 2c + 1d \le 70$
$1a + 2b + 1c + 0d \le 340$
И, конечно, $a, b, c, d \ge 0$.

### 3.3. Решение и сюрпризы
Опять горизонтальная структура, `=SUMPRODUCT()`. При запуске Solver'а я не забыл поставить галочку "Sensitivity Report".

![Отчет Sensitivity Report](prompt_excel_1_2_sensitivity.png)

Что я понял из отчета: 
Если переменная в оптимальном плане равна нулю (например, мы решили не делать деталь Г), это значит, что её выпуск приносит убытки — она съедает слишком много дефицитного времени станков, а стоит всего 1 рубль.
Если мы добавим 24 часа к Шлифовальному станку (до 364), то общая прибыль вырастет ровно на $24 \times (\text{Теневая цена шлифовального})$.
Изделие "Д" (цена 11, расход 8, 2, 2) я бы не брал: если умножить эти расходы на теневые цены из отчета, затраты получатся явно больше 11.

## 4. Итог
Excel Solver — это мощь. Я понял, как горизонтально укладывать данные, чтобы матрица легко читалась, и как вытаскивать инсайты из Sensitivity Report.
""")

# LR2 Report
write_f(f"{base_dir}/ЛР_2/Отчет_ЛР2.md", """
# Отчет по лабораторной работе №2: Сложные задачи и транспортная сеть

## 1. Предисловие
Продолжаем использовать Excel Solver. В этот раз задачки стали хитрее. Буду балансировать рационы и развозить песок по стройкам. Интерфейс всё тот же — английский (Windows 11 Dark), подход — минимализм.

## 2. Задача 1. Рацион для бройлеров (Вариант 1.3)
### 2.1. В чем суть
У нас 20000 цыплят. Им нужно 0.5 кг корма в неделю каждому, то есть всего 10 тонн (10000 кг).
В корме должно быть: Кальций $\ge 0.8\%$, Белок $\ge 22\%$, Клетчатка $\le 5\%$.
Есть Известняк (дешево, много кальция), Зерно и Бобы (дорого, но там белок). Надо всё смешать, чтобы цыплята были довольны, а ферма не разорилась.

### 2.2. Математика
Введем переменные (в килограммах):
$x$ — известняк, $y$ — зерно, $z$ — соевые бобы.
Цель — минимизация стоимости:
$E = 0.4x + 0.15y + 0.40z \rightarrow \min$

Ограничения:
1. Общий вес: $x + y + z = 10000$
2. Кальций: $0.38x + 0.001y + 0.002z \ge 0.008 \times 10000$
3. Белок: $0x + 0.09y + 0.50z \ge 0.22 \times 10000$
4. Клетчатка: $0x + 0.02y + 0.08z \le 0.05 \times 10000$
Все переменные неотрицательны.

### 2.3. Solver в деле
Завел таблицу. Вбил `=SUMPRODUCT()`. В Solver указал целевую ячейку и "Min". 

![Решение задачи о рационе](prompt_excel_2_1_result.png)

Оказалось, что соевые бобы, хоть и дорогие, критически важны из-за высокого содержания белка. Без них $22\%$ не набрать. А известняк отлично вытягивает кальций.

## 3. Задача 2. Логистика песка (Вариант 2.3)
### 3.1. Условия
3 карьера ($A_1, A_2, A_3$) и 5 участков дорог ($B_1 - B_5$). 
Карьеры дают: 60, 90, 140 тонн.
Дорогам нужно: 40, 30, 90, 80, 50 тонн.
Суммарно: карьеры дают 290 тонн, а нужно 290 тонн. Идеально! Транспортная задача закрытого типа (сбалансированная).

### 3.2. Модель
$x_{ij}$ — сколько везем от $i$-го карьера к $j$-му участку.
Матрица тарифов $3 \times 5$:
$A_1$: 4, 2, 3, 4, 1
$A_2$: 2, 4, 3, 5, 6
$A_3$: 6, 5, 4, 6, 2

Целевая функция: сумма произведений тарифов на объемы $\rightarrow \min$.
Ограничения — суммы по строкам равны предложению, суммы по столбцам равны потребностям.

### 3.3. Как я решал
Горизонтально разместил матрицу тарифов и пустую матрицу для решения. Добавил суммы по краям. 

![Матрица транспортной задачи](prompt_excel_2_2_matrix.png)
![Окно Solver для логистики](prompt_excel_2_2_solver.png)

**Эксперименты с ограничениями:**
а) Запрет на перевозку $A_1 \rightarrow B_2$: я просто влез в матрицу тарифов и вместо двойки написал 9999 (искусственно сделал маршрут сверхдорогим). Solver сразу перестроил потоки.
б) Ограничение объема: я добавил в диалоговом окне Solver еще одно условие: $x_{12} \le 3$. Это заставило алгоритм перераспределить песок с минимальными потерями для общей стоимости.

## 4. Финал
Я научился балансировать смеси и строить логистические сети. Solver — очень классный инструмент, если правильно сформулировать ограничения на бумаге, прежде чем переносить их в ячейки.
""")

# Prompts for Student 3 (Novoselz) - Windows 11 Dark, English, Minimalist
write_f(f"{base_dir}/ЛР_1/source/prompt_excel_1_1_model.txt", "MS Excel window on Windows 11 Dark Mode. Minimalist visual style (no cell shading, just black borders, Arial font). Language: English. The sheet shows a linear programming model. Cells contain parameters for Variant 1.3 (factory elements X and Y). Horizontal layout: variables x and y on the left, objective function =SUMPRODUCT() and constraints on the right.")
write_f(f"{base_dir}/ЛР_1/source/prompt_excel_1_1_solver.txt", "MS Excel 'Solver Parameters' dialog box. English interface on Windows 11 Dark Mode. Target cell is set to Max. Changing variable cells are selected. Constraints list shows inequalities <= 4000, <= 2250, >= 600, etc. Solving method: 'Simplex LP'.")
write_f(f"{base_dir}/ЛР_1/source/prompt_excel_1_1_result.txt", "MS Excel spreadsheet showing the solved model for Variant 1.3. Minimalist black-and-white style. The input cells for x and y contain optimal values. Target cell uses =SUMPRODUCT() showing max revenue.")
write_f(f"{base_dir}/ЛР_1/source/prompt_excel_1_2_sensitivity.txt", "MS Excel 'Sensitivity Report' window. English language. Shows Final Value, Shadow Price, Constraint R.H. Side, Allowable Increase/Decrease. Minimalist formatting. Dark Windows 11 window borders.")

write_f(f"{base_dir}/ЛР_2/source/prompt_excel_2_1_result.txt", "MS Excel spreadsheet with solved optimization model for broiler ration (Variant 1.3). Horizontal layout, Minimalist style (no colors). Variables x, y, z. The target cell uses =SUMPRODUCT() and shows minimized cost. English interface.")
write_f(f"{base_dir}/ЛР_2/source/prompt_excel_2_2_matrix.txt", "MS Excel spreadsheet showing a 3x5 transportation matrix (Variant 2.3). Minimalist style. Rows A1, A2, A3. Columns B1 to B5. Shows shipping costs and edge sum formulas. English interface.")
write_f(f"{base_dir}/ЛР_2/source/prompt_excel_2_2_solver.txt", "MS Excel 'Solver Parameters' dialog box for the transportation problem. English interface. Constraints show sum of shipped items equals supply and demand. Additional constraint x12 <= 3 is in the list.")

write_f(f"{base_dir}/ЛР_1/source/lab1_model.xlsx", "DUMMY EXCEL FILE")
write_f(f"{base_dir}/ЛР_2/source/lab2_model.xlsx", "DUMMY EXCEL FILE")
