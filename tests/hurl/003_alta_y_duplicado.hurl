# 1. Alta exitosa de plato
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
[Captures]
creado_id: jsonpath "$._id"

# 2. Intento de alta duplicada con el mismo nombre debe responder 409 Conflict
POST {{host}}/api/platos
Content-Type: application/json
{
  "nombre": "Milanesa de Berenjena Napolitana",
  "descripcion": "Intento de duplicación",
  "ingredientes": ["berenjena"],
  "precio": 8000,
  "apto_celiacos": true,
  "apto_veganos": true,
  "apto_diabeticos": true,
  "cantidad_calorias": 300,
  "imagen_url": "https://example.com/duplicado.jpg"
}

HTTP 409
[Asserts]
header "Content-Type" contains "application/json"
jsonpath "$.error" exists
jsonpath "$.error" contains "Milanesa de Berenjena Napolitana"

# 3. Limpieza inmediata usando el ID capturado
DELETE {{host}}/api/platos/{{creado_id}}

HTTP 200
[Asserts]
jsonpath "$.success" == true
