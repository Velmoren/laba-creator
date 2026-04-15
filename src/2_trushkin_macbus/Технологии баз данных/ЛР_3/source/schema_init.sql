-- Инициализация схемы Галереи «View Ridge»
-- Студент: Трушкин (ID 2)

CREATE SEQUENCE ArtistID_Seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE WorkID_Seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE CustID_Seq START WITH 1000 INCREMENT BY 1;

CREATE TABLE ARTIST (
    ArtistID int PRIMARY KEY DEFAULT nextval('ArtistID_Seq'),
    Name varchar(255) NOT NULL,
    Nationality varchar(100) DEFAULT 'Unknown',
    BirthDate int,
    DeceasedDate int
);

CREATE TABLE CUSTOMER (
    CustomerID int DEFAULT nextval('CustID_Seq'),
    Name varchar(255) NOT NULL,
    AreaCode varchar(10),
    PhoneNumber varchar(50)
);

ALTER TABLE CUSTOMER ADD CONSTRAINT PK_CUSTOMER_ID PRIMARY KEY (CustomerID);

CREATE TABLE WORK (
    WorkID int PRIMARY KEY DEFAULT nextval('WorkID_Seq'),
    Title varchar(255) NOT NULL,
    Description text,
    Copy varchar(50),
    ArtistID int
);
