WITH DelitosPorAlcaldiaMes AS (
    SELECT
        anio_hecho,
        mes_hecho,
        alcaldia_hecho,
        delito,
        COUNT(*) AS cantidad_delitos
    FROM
        datos_delitos_2016_2018
    WHERE
        anio_hecho >= '2016'  -- Filtra los datos a partir de 2016
    GROUP BY
        anio_hecho,
        mes_hecho,
        alcaldia_hecho,
        delito
),
DelitosRanking AS (
    SELECT
        anio_hecho,
        mes_hecho,
        alcaldia_hecho,
        delito,
        cantidad_delitos,
        ROW_NUMBER() OVER (PARTITION BY anio_hecho, mes_hecho, alcaldia_hecho ORDER BY cantidad_delitos DESC) AS ranking
    FROM
        DelitosPorAlcaldiaMes
)
SELECT
    anio_hecho,
    mes_hecho,
    alcaldia_hecho,
    delito AS tipo_delito_mas_comun,
    cantidad_delitos AS cantidad_delito_mas_comun
FROM
    DelitosRanking
WHERE
    ranking = 1
ORDER BY
	alcaldia_hecho,
    anio_hecho,
    mes_hecho
    ;




