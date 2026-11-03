POST {{host}}/api/platos
Content-Type: application/json
{
  "nombre": "Milanesa de Berenjena Napolitana",
  "descripcion": "Rodajas de berenjena rebozadas en harina de arroz y semillas, con salsa de tomate y queso gratinado.",
  "ingredientes": ["berenjena", "harina de arroz", "semillas de sésamo", "salsa de tomate", "queso mozzarella"],
  "precio": 9200,
  "apto_celiacos": true,
  "apto_veganos": false,
  "apto_diabeticos": true,
  "cantidad_calorias": 380,
  "imagen_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800"
}

HTTP 201
[Asserts]
header "Content-Type" contains "application/json"
jsonpath "$._id" exists
jsonpath "$.nombre" == "Milanesa de Berenjena Napolitana"
jsonpath "$.apto_celiacos" == true
jsonpath "$.precio" == 9200
