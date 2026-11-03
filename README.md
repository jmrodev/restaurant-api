# Restaurant API - MongoDB & Mongoose

API REST para la gestión de platos de comida de un restaurante, desarrollada con **Node.js**, **Express**, **MongoDB Atlas** y **Mongoose**.

---

## 📋 Estructura del Documento (Schema de Mongoose)

Cada plato en la colección `platos` contiene los campos obligatorios solicitados:

```javascript
const platoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true, unique: true },
  descripcion: { type: String, required: true, trim: true },
  ingredientes: { type: [String], required: true },
  precio: { type: Number, required: true, min: 0.01 },
  apto_celiacos: { type: Boolean, required: true, default: false },
  apto_veganos: { type: Boolean, required: true, default: false },
  apto_diabeticos: { type: Boolean, required: true, default: false },
  cantidad_calorias: { type: Number, required: true, min: 0 },
  imagen_url: { type: String, required: true, trim: true }
}, { timestamps: true, versionKey: false });
```

---

## 🍲 Semilla de Datos (Seed con 10 Platos Variados)

El script `src/scripts/seed.js` inicializa la base de datos con 10 platos variados:
1. **Ensalada Mediterránea de Quinoa Real** (Vegano, Celíaco, Diabético - 310 kcal)
2. **Bife de Chorizo Angus a las Brasas** (Celíaco, Diabético - 690 kcal)
3. **Risotto de Hongos Silvestres y Trufa Negra** (Celíaco - 560 kcal)
4. **Wok Thai de Vegetales Crocantes con Tofu Sellado** (Vegano, Celíaco, Diabético - 295 kcal)
5. **Salmón Austral Grillado con Espinacas a la Crema de Coco** (Celíaco, Diabético - 480 kcal)
6. **Lasaña Tradicional Casera a la Boloñesa** (Contiene TACC - 790 kcal)
7. **Sopa Velouté de Calabaza Asada y Jengibre Fresco** (Vegano, Celíaco, Diabético - 215 kcal)
8. **Tacos de Maíz con Lentejas Braseadas y Guacamole** (Vegano, Celíaco, Diabético - 385 kcal)
9. **Suprema al Limón y Finas Hierbas con Papas Rústicas** (Celíaco, Diabético - 460 kcal)
10. **Raviolones Artesanales de Ricota y Nuez al Fileto** (Pasta fresca tradicional - 620 kcal)

Para ejecutar la siembra:
```bash
npm run seed
```

---

## 🚀 Endpoints de la API

| Método | Endpoint | Descripción | Status Codes |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/platos` | Listar todos los platos (con filtros dietéticos opcionales) | 200, 500 |
| **GET** | `/api/platos/:id` | Consultar detalle de un plato por ObjectId | 200, 400, 404 |
| **POST** | `/api/platos` | Registrar un nuevo plato (**Alta**) | 201, 400, 409 |
| **PUT** | `/api/platos/:id` | Modificar un plato existente (**Modificación**) | 200, 400, 404, 409 |
| **DELETE** | `/api/platos/:id` | Eliminar un plato (**Baja**) | 200, 400, 404 |

---

## 🧪 Pruebas Automatizadas con Hurl (Chelo-Harness) y OpenAPI

El proyecto incluye:
- Especificación completa de OpenAPI 3.0 en `openapi.yaml`.
- Suite de pruebas de integración con Hurl en `tests/hurl/`:
  - `001_health.hurl`: Healthcheck del servicio.
  - `002_listar_platos.hurl`: Verificación de listado y conteo de al menos 10 platos.
  - `003_alta_plato_exitoso.hurl`: Alta de plato con validación de persistencia.
  - `004_rechazo_nombre_duplicado_409.hurl`: Validación de unicidad de nombre de plato.
  - `005_rechazo_campos_obligatorios_400.hurl`: Rechazo ante campos faltantes.
  - `006_modificacion_y_baja_ciclo_completo.hurl`: Modificación (PUT), Baja (DELETE) y verificación 404.

Para ejecutar toda la suite de pruebas:
```bash
npm test
```
