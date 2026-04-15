-- Управление транзакциями
-- Студент: Трушкин (ID 2)

CREATE OR REPLACE PROCEDURE NewCustomerWithTransaction(
    p_name varchar,
    p_work_id int,
    p_price numeric
) AS $$
DECLARE
    v_cid int;
    v_available int;
BEGIN
    -- Проверка наличия картины
    SELECT count(*) INTO v_available FROM TRANSACTION 
    WHERE WorkID = p_work_id AND CustomerID IS NULL;

    IF v_available != 1 THEN
        RAISE EXCEPTION 'Картина недоступна для продажи';
        ROLLBACK;
    END IF;

    -- Создание клиента
    INSERT INTO CUSTOMER(Name) VALUES (p_name) RETURNING CustomerID INTO v_cid;

    -- Регистрация сделки
    UPDATE TRANSACTION 
    SET CustomerID = v_cid, SalesPrice = p_price, PurchaseDate = CURRENT_DATE
    WHERE WorkID = p_work_id AND CustomerID IS NULL;

    COMMIT;
END;
$$ LANGUAGE plpgsql;
