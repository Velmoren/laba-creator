-- Представления и обработка ошибок
-- Студент: Трушкин (ID 2)

-- Создание сложного представления
CREATE OR REPLACE VIEW CustomerPurchases AS
SELECT 
    c.Name as CustName,
    w.Title,
    a.Name as ArtistName
FROM CUSTOMER c
JOIN TRANSACTION t ON c.CustomerID = t.CustomerID
JOIN WORK w ON t.WorkID = w.WorkID
JOIN ARTIST a ON w.ArtistID = a.ArtistID;

-- Триггер INSTEAD OF для обновления вью
CREATE OR REPLACE FUNCTION fn_update_work_title() RETURNS TRIGGER AS $$
BEGIN
    UPDATE WORK SET Title = NEW.Title WHERE Title = OLD.Title;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_view_title
INSTEAD OF UPDATE ON CustomerPurchases
FOR EACH ROW EXECUTE FUNCTION fn_update_work_title();

-- Пример блока с перехватом исключений
DO $$
BEGIN
    -- Вызов заведомо ошибочной операции
    UPDATE WORK SET ArtistID = -1 WHERE WorkID = 999;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'ОШИБКА ЗАХВАЧЕНА: %', SQLERRM;
END $$;
