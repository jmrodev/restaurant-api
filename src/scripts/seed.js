const { connectDB, closeDB } = require('../config/db');
const Plato = require('../models/plato.model');

// 10 Platos con perfiles dietéticos, orígenes e ingredientes completamente diversos:
const platosVariados = [
  {
    nombre: "Ensalada Mediterránea de Quinoa Real",
    descripcion: "Quinoa andina sobre colchón de rúcula salvaje, tomates cherry confitados, pepino persa, aceitunas negras griegas y vinagreta de limón y oliva extravirgen.",
    ingredientes: ["quinoa real", "rúcula", "tomate cherry", "pepino", "aceitunas negras", "aceite de oliva extravirgen", "jugo de limón"],
    precio: 8500,
    apto_celiacos: true,
    apto_veganos: true,
    apto_diabeticos: true,
    cantidad_calorias: 310,
    imagen_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800"
  },
  {
    nombre: "Bife de Chorizo Angus a las Brasas",
    descripcion: "Corte de carne vacuna de pastura de 400g sellado a la parrilla de quebracho, acompañado de ensalada fresca mixta de lechuga, tomate y cebolla morada.",
    ingredientes: ["bife de chorizo angus", "sal marina gruesa", "lechuga mantecosa", "tomate perita", "cebolla morada", "aceite de oliva"],
    precio: 19800,
    apto_celiacos: true,
    apto_veganos: false,
    apto_diabeticos: true,
    cantidad_calorias: 690,
    imagen_url: "https://images.unsplash.com/photo-1558030006-450675393462?w=800"
  },
  {
    nombre: "Risotto de Hongos Silvestres y Trufa Negra",
    descripcion: "Arroz arborio italiano cocinado a fuego lento con hongos portobello, gírgolas salteadas, manteca clarificada y queso parmesano Reggiano de 24 meses.",
    ingredientes: ["arroz arborio", "hongos portobello", "gírgolas", "caldo vegetal", "vino blanco seco", "manteca", "queso parmesano"],
    precio: 14500,
    apto_celiacos: true,
    apto_veganos: false,
    apto_diabeticos: false,
    cantidad_calorias: 560,
    imagen_url: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800"
  },
  {
    nombre: "Wok Thai de Vegetales Crocantes con Tofu Sellado",
    descripcion: "Dados de tofu orgánico dorados al sésamo con ramilletes de brócoli, pimientos tricolor, zanahoria y brotes de soja reducidos en salsa tamari sin TACC.",
    ingredientes: ["tofu orgánico", "brócoli", "morrón rojo", "morrón amarillo", "zanahoria", "brotes de soja", "tamari sin gluten", "aceite de sésamo"],
    precio: 11200,
    apto_celiacos: true,
    apto_veganos: true,
    apto_diabeticos: true,
    cantidad_calorias: 295,
    imagen_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"
  },
  {
    nombre: "Salmón Austral Grillado con Espinacas a la Crema de Coco",
    descripcion: "Filet de salmón fresco del pacífico cocinado a punto, servido sobre puré rústico de espinacas tiernas con crema de coco y nuez moscada.",
    ingredientes: ["salmón austral", "espinaca fresca", "leche de coco", "aceite de oliva", "nuez moscada", "sal rosada del himalaya", "pimienta negra"],
    precio: 23500,
    apto_celiacos: true,
    apto_veganos: false,
    apto_diabeticos: true,
    cantidad_calorias: 480,
    imagen_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800"
  },
  {
    nombre: "Lasaña Tradicional Casera a la Boloñesa",
    descripcion: "Masa artesanal al huevo intercalada con ragú boloñesa de carne y panceta cocido 4 horas, salsa bechamel cremosa y gratén dorado de mozzarella.",
    ingredientes: ["harina de trigo 0000", "huevo de campo", "carne vacuna picada", "salsa de tomate pomodoro", "leche entera", "queso mozzarella", "cebolla", "zanahoria"],
    precio: 13200,
    apto_celiacos: false,
    apto_veganos: false,
    apto_diabeticos: false,
    cantidad_calorias: 790,
    imagen_url: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800"
  },
  {
    nombre: "Sopa Velouté de Calabaza Asada y Jengibre Fresco",
    descripcion: "Crema aterciopelada de calabazas horneadas a la leña, perfumada con jengibre rallado, leche vegetal de almendras y semillas tostadas crujientes.",
    ingredientes: ["calabaza kabutiá", "jengibre", "leche de almendras sin azúcar", "caldo de puerros", "semillas de zapallo", "aceite de oliva"],
    precio: 7600,
    apto_celiacos: true,
    apto_veganos: true,
    apto_diabeticos: true,
    cantidad_calorias: 215,
    imagen_url: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800"
  },
  {
    nombre: "Tacos de Maíz con Lentejas Braseadas y Guacamole",
    descripcion: "Tres tortillas de puro maíz nixtamalizado con guisado especiado de lentejas al pimentón dulce, palta hass en cubos, pico de gallo y gajos de lima.",
    ingredientes: ["harina de maíz nixtamalizado", "lentejas pardinas", "palta hass", "tomate perita", "cebolla morada", "cilantro", "comino", "jugo de lima"],
    precio: 10400,
    apto_celiacos: true,
    apto_veganos: true,
    apto_diabeticos: true,
    cantidad_calorias: 385,
    imagen_url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800"
  },
  {
    nombre: "Suprema al Limón y Finas Hierbas con Papas Rústicas",
    descripcion: "Pechuga de pollo de granja marinada en jugo natural de limón y romero fresco, horneada al punto jugoso con cuñas de papas con cáscara doradas.",
    ingredientes: ["pechuga de pollo", "limón sutil", "papas con cáscara", "romero fresco", "tomillo", "ajo confitado", "aceite de girasol"],
    precio: 12100,
    apto_celiacos: true,
    apto_veganos: false,
    apto_diabeticos: true,
    cantidad_calorias: 460,
    imagen_url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800"
  },
  {
    nombre: "Raviolones Artesanales de Ricota y Nuez al Fileto",
    descripcion: "Pasta rellena con ricota cremosa y trozos de nueces tostadas, salseada con tomate perita italiano madurado al sol y hojas de albahaca fresca.",
    ingredientes: ["harina de trigo", "ricota de tambo", "nueces peladas", "huevo", "tomates perita", "albahaca genovesa", "aceite de oliva"],
    precio: 12800,
    apto_celiacos: false,
    apto_veganos: false,
    apto_diabeticos: false,
    cantidad_calorias: 620,
    imagen_url: "https://images.unsplash.com/photo-1587740896339-968901f05477?w=800"
  }
];

async function seed() {
  try {
    await connectDB();
    await Plato.deleteMany({});
    console.log('[INFO] Colección platos vaciada.');

    const insertados = await Plato.insertMany(platosVariados);
    console.log(`[SUCCESS] Se insertaron exitosamente ${insertados.length} platos con Mongoose Schema.`);
  } catch (err) {
    console.error('[ERROR] Fallo al sembrar datos:', err.message);
  } finally {
    await closeDB();
  }
}

if (require.main === module) {
  seed();
}

module.exports = { seed, platosVariados };
