-- Автоматизация через триггеры
-- Студент: Трушкин (ID 2)

-- 1. Триггер авторасчета цены (BEFORE)
CREATE OR REPLACE FUNCTION fn_calc_asking_price() RETURNS TRIGGER AS $$
BEGIN
    NEW.AskingPrice := NEW.AcquisitionPrice * 2;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_asking_price
BEFORE INSERT ON TRANSACTION
FOR EACH ROW EXECUTE FUNCTION fn_calc_asking_price();

-- 2. Триггер логистики (AFTER)
CREATE OR REPLACE FUNCTION fn_auto_transaction() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO TRANSACTION (DateAcquired, WorkID) 
    VALUES (CURRENT_DATE, NEW.WorkID);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_on_work_insert
AFTER INSERT ON WORK
FOR EACH ROW EXECUTE FUNCTION fn_auto_transaction();
