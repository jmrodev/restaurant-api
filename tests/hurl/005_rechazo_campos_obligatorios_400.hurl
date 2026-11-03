POST {{host}}/api/platos
Content-Type: application/json
{
  "descripcion": "Plato incompleto sin nombre ni precio"
}

HTTP 400
[Asserts]
header "Content-Type" contains "application/json"
jsonpath "$.error" exists
