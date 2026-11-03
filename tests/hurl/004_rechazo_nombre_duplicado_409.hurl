POST {{host}}/api/platos
Content-Type: application/json
{
  "nombre": "Milanesa de Berenjena Napolitana",
  "descripcion": "Duplicado de prueba para validar restricción unique",
  "ingredientes": ["berenjena"],
  "precio": 9000,
  "apto_celiacos": true,
  "apto_veganos": true,
  "apto_diabeticos": true,
  "cantidad_calorias": 300,
  "imagen_url": "https://example.com/foto.jpg"
}

HTTP 409
[Asserts]
header "Content-Type" contains "application/json"
jsonpath "$.error" exists
jsonpath "$.error" contains "Milanesa de Berenjena Napolitana"
