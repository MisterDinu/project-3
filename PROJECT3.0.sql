DROP TABLE datos_delitos_2016_2018;
DROP TABLE datos_delitos_2019_2021;
DROP TABLE datos_delitos_2022_2023;

CREATE TABLE datos_delitos_2016_2018 (
    anio_hecho VARCHAR(255),
    mes_hecho VARCHAR(255),
    anio_inicio INT,
    mes_inicio VARCHAR(255),
    delito VARCHAR(255),
    categoria VARCHAR(255),
    alcaldia_hecho VARCHAR(255),
    colonia VARCHAR(255),
    longitud FLOAT,
    latitud FLOAT
);


CREATE TABLE datos_delitos_2019_2021 (
    anio_hecho VARCHAR(255),
    mes_hecho VARCHAR(255),
    anio_inicio INT,
    mes_inicio VARCHAR(255),
    delito VARCHAR(255),
    categoria VARCHAR(255),
    alcaldia_hecho VARCHAR(255),
    colonia VARCHAR(255),
    longitud FLOAT,
    latitud FLOAT
);


CREATE TABLE datos_delitos_2022_2023 (
    anio_hecho VARCHAR(255),
    mes_hecho VARCHAR(255),
    anio_inicio INT,
    mes_inicio VARCHAR(255),
    delito VARCHAR(255),
    categoria VARCHAR(255),
    alcaldia_hecho VARCHAR(255),
    colonia VARCHAR(255),
    longitud VARCHAR(255),
    latitud VARCHAR(255)
);
