-- Процедурное программирование PL/pgSQL
-- Студент: Трушкин (ID 2)

CREATE OR REPLACE PROCEDURE CustomerInsert (
    p_name varchar, 
    p_code varchar, 
    p_phone varchar, 
    p_nation varchar
) AS $$
DECLARE
    rec RECORD;
    artistCursor CURSOR FOR 
        SELECT ArtistID FROM ARTIST WHERE Nationality = p_nation;
BEGIN
    -- Вставка клиента
    INSERT INTO CUSTOMER(Name, AreaCode, PhoneNumber) 
    VALUES (p_name, p_code, p_phone);
    
    -- Автоматическая привязка интересов через курсор
    FOR rec IN artistCursor LOOP
        INSERT INTO CUSTOMER_ARTIST_INT(ArtistID, CustomerID) 
        VALUES (rec.ArtistID, currval('CustID_Seq'));
        RAISE NOTICE 'Связь создана для ArtistID: %', rec.ArtistID;
    END LOOP;
    
    RAISE NOTICE 'Клиент % успешно добавлен.', p_name;
END;
$$ LANGUAGE plpgsql;
