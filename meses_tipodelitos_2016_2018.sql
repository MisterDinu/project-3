WITH DelitosPorMes AS (
    SELECT
        anio_hecho,
        mes_hecho,
        delito, 
        COUNT(*) AS cantidad_delito
    FROM
        datos_delitos_2016_2018
    WHERE
        anio_hecho >= '2016'
    GROUP BY
        anio_hecho,
        mes_hecho,
        delito
),
DelitosRanking AS (
    SELECT
        anio_hecho,
        mes_hecho,
        delito,
        cantidad_delito,
        ROW_NUMBER() OVER (PARTITION BY anio_hecho, mes_hecho ORDER BY cantidad_delito DESC) AS ranking
    FROM
        DelitosPorMes
)
SELECT
    anio_hecho,
    mes_hecho,
    delito AS tipo_delito_mas_comun,
    cantidad_delito AS cantidad_delito_mas_comun
FROM
    DelitosRanking
WHERE
    ranking = 1
ORDER BY
    anio_hecho,
    mes_hecho DESC;



