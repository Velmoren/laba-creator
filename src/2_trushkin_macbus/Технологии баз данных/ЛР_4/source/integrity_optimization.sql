-- Настройка связей и индексов
-- Студент: Трушкин (ID 2)

-- Внешние ключи с каскадным удалением
ALTER TABLE WORK ADD CONSTRAINT FK_WORK_ARTIST 
FOREIGN KEY (ArtistID) REFERENCES ARTIST(ArtistID) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- Индексы для ускорения поиска
CREATE INDEX idx_artist_name_search ON ARTIST(Name);
CREATE INDEX idx_customer_name ON CUSTOMER(Name);

-- Контрольное задание: расширение структуры
ALTER TABLE CUSTOMER ADD COLUMN SecondName varchar(255);

-- Ограничение на логику дат
ALTER TABLE ARTIST ADD CONSTRAINT CHK_ARTIST_LIFESPAN 
CHECK (DeceasedDate >= BirthDate OR DeceasedDate IS NULL);
