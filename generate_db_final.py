import os

def write_f(path, content):
    if len(content) < 1000 and ".txt" in path:
        print(f"CRITICAL ERROR: Prompt {path} too short ({len(content)})")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip())

students = [
    {"id": 2, "name": "2_trushkin_macbus", "os": "macOS Sonoma", "theme": "Light", "style": "Corporate", "lang": "Russian"},
    {"id": 3, "name": "3_novoselz_drum", "os": "Windows 11", "theme": "Dark", "style": "Minimalist", "lang": "English"}
]

for s in students:
    base = f"src/{s['name']}/Технологии баз данных"
    
    # ЛР 7: ТРИГГЕРЫ (Пример глубокого промпта)
    p7_text = f"""
Create a highly realistic, 4K full-screen screenshot of pgAdmin 4 version 7.0 or later, running on {s['os']} ({s['theme']} theme). 
The desktop background shows a professional workspace. The pgAdmin window is active and localized in {s['lang']}.
Visual Style: {s['style']}. All UI elements (tabs, icons, buttons) strictly match the {s['os']} design language.

MAIN CONTENT:
The 'Query Tool' is open. In the SQL editor, the following command is visible and recently executed:
'INSERT INTO TRANSACTION (TransactionID, DateAcquired, AcquisitionPrice, WorkID) 
VALUES (nextval(\'TransID_Seq\'), CURRENT_DATE, 15000.00, 5);
SELECT * FROM TRANSACTION WHERE AcquisitionPrice = 15000.00;'

The 'Data Output' tab at the bottom is active and displays the result table. 
Crucially, the 'AskingPrice' column shows the value '30000.00'. This confirms the BEFORE INSERT trigger 'trg_asking_price' has successfully executed the logic (AcquisitionPrice * 2).
The row also shows the current date in the 'DateAcquired' column.

BROWSER TREE (Left Panel):
The 'Servers' hierarchy is expanded: Servers > PostgreSQL 15 > Databases > test > Schemas > public > Tables > TRANSACTION > Triggers. 
The trigger 'trg_asking_price' is highlighted with a distinct blue selection bar. 
The 'Properties' tab for the trigger is visible in the lower-left pane, showing 'Type: BEFORE INSERT' and 'Procedure: fn_calc_asking_price'.

TECHNICAL DETAILS:
The fonts are crisp ({'SF Mono' if 'mac' in s['os'].lower() else 'Consolas'}). 
Syntax highlighting colors: Keywords are bold blue, strings are green, numbers are dark red. 
No distracting desktop icons. High contrast and professional engineering look.
"""
    write_f(f"{base}/ЛР_7/source/prompt_db_7_triggers.txt", p7_text)

    # ЛР 8: ИСКЛЮЧЕНИЯ (Пример глубокого промпта)
    p8_text = f"""
Create a highly detailed full-screen screenshot of an error handling scenario in pgAdmin 4 on {s['os']} ({s['theme']} theme).
Interface Language: {s['lang']}. Visual Design: {s['style']}.

MAIN CONTENT:
The 'Query Tool' window is split. The top half shows a PL/pgSQL block designed to test exception handling:
'BEGIN
    CALL NewCustomerWithTransaction(\'Ivanov\', \'495\', \'000-00-00\', \'Unknown Artist\', \'Non-existent Work\', \'1\', 5000);
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE \'CUSTOM ERROR CAPTURED: % \', SQLERRM;
END;'

The 'Messages' tab at the bottom is selected. It displays a bold, high-contrast log output:
'NOTICE: CUSTOM ERROR CAPTURED: Work "Non-existent Work" not found in the Gallery database.
Total query runtime: 12 msec.
Query returned successfully (with notices).'

The pop-up notification toast in the bottom-right corner of the pgAdmin interface is visible, mirroring the error notice.

BROWSER TREE:
The 'Views' folder is expanded under the 'public' schema, showing the 'CustomerPurchases' view. 
The 'Triggers' sub-folder for this view is also expanded, showing the 'INSTEAD OF' trigger 'trg_update_view_title'.

DETAILS:
The overall UI is clean. In {s['theme']} theme, the background is {'white' if 'light' in s['theme'].lower() else '#2c2c2c'}. 
The fonts are perfectly antialiased. The screenshot captures the exact moment after the error was handled by the system.
"""
    write_f(f"{base}/ЛР_8/source/prompt_db_8_errors.txt", p8_text)

    # (Здесь я добавлю такие же глубокие промпты для ЛР 3, 4, 5, 6 в финальном скрипте)
    # И сгенерирую расширенные отчеты...
    
