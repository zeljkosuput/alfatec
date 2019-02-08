DROP TABLE tablica1;

CREATE TABLE tablica1(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    zupanija VARCHAR(20) NOT NULL,
    grad VARCHAR(20) NOT NULL,
    adresa VARCHAR(20) NOT NULL,
    vrsta VARCHAR(20) NOT NULL,
    prisutan TINYINT,
    sirina FLOAT(10, 6) NOT NULL,
    duzina FLOAT(10, 6) NOT NULL
);

INSERT INTO tablica1(zupanija, grad, adresa, vrsta, prisutan, sirina, duzina )
VALUES  ("Grad Zagreb", "Zagreb", "Adresa neka 1", "fixni", 1, 45.815969, 15.985222),
("Grad Zagreb", "Zagreb", "Prilaz drugi 2", "mobilni", 1, 45.822085, 15.973818),
("Grad Zagreb", "Zagreb", "Ulica 3", "more", 1, 45.813450, 15.968174),
("Grad Zagreb", "Zagreb", "Iza ugla 4", "fixni", 1, 45.792018, 15.972685),
("Grad Zagreb", "Zagreb", "Adresa neka 1", "more", 1, 45.843932, 15.801654),
("Grad Zagreb", "Zagreb", "Adresa 450", "mobilni", 1, 45.819297, 15.817897),
("Grad Zagreb", "Zagreb", "Ulica 3", "more", 1, 45.796868, 15.881206),
("Grad Zagreb", "Zagreb", "Tamo gore 42", "fixni", 1, 45.763921, 15.950362);

UPDATE tablica1
SET 
    adresa = "Blizu 22"
WHERE
    id = 6;