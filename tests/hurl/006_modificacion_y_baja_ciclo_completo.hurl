# 1. Crear plato temporal específico para probar modificación y baja
POST {{host}}/api/platos
Content-Type: application/json
{
  "nombre": "Plato Temporal CRUD",
  "descripcion": "Descripción inicial para test de ciclo de vida",
  "ingredientes": ["arroz", "vegetales"],
  "precio": 5000,
  "apto_celiacos": true,
  "apto_veganos": true,
  "apto_diabeticos": true,
  "cantidad_calorias": 250,
  "imagen_url": "https://example.com/temp.jpg"
}

HTTP 201
[Asserts]
jsonpath "$._id" exists
[Captures]
plato_id: jsonpath "$._id"

# 2. Consultar el plato individual por ID
GET {{host}}/api/platos/{{plato_id}}

HTTP 200
[Asserts]
jsonpath "$.nombre" == "Plato Temporal CRUD"

# 3. Modificación del plato (PUT)
PUT {{host}}/api/platos/{{plato_id}}
Content-Type: application/json
{
  "precio": 6200,
  "cantidad_calorias": 280
}

HTTP 200
[Asserts]
header "Content-Type" contains "application/json"
jsonpath "$.precio" == 6200
jsonpath "$.cantidad_calorias" == 280

# 4. Baja del plato (DELETE)
DELETE {{host}}/api/platos/{{plato_id}}

HTTP 200
[Asserts]
jsonpath "$.success" == true

# 5. Verificación de que ya no existe (404)
GET {{host}}/api/platos/{{plato_id}}

HTTP 404
[Asserts]
jsonpath "$.error" exists

# Limpieza adicional: eliminar Milanesa de Berenjena creada en test 003
GET {{host}}/api/platos

HTTP 200
