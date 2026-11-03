GET {{host}}/api/platos

HTTP 200
[Asserts]
header "Content-Type" contains "application/json"
jsonpath "$" isCollection
jsonpath "$" count >= 10
jsonpath "$[0].nombre" exists
jsonpath "$[0].precio" exists
jsonpath "$[0].apto_celiacos" exists
jsonpath "$[0].apto_veganos" exists
jsonpath "$[0].apto_diabeticos" exists
