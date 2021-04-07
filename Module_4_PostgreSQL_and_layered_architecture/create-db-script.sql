CREATE SCHEMA scm 
CREATE TABLE USER(
    ID   text NOT NULL,
    LOGIN VARCHAR(20) NOT NULL,
    AGE  INTEGER,
    PASSWORD  VARCHAR(25) NOT NULL,
    ISDELETED  BOOLEAN default false,  
    PRIMARY KEY (ID)
);