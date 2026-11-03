const mongoose = require('mongoose');

const platoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del plato es obligatorio'],
      trim: true,
      unique: true
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true
    },
    ingredientes: {
      type: [String],
      required: [true, 'Debe incluir al menos un ingrediente'],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: 'El plato debe tener al menos un ingrediente'
      }
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0.01, 'El precio debe ser un número positivo mayor a 0']
    },
    apto_celiacos: {
      type: Boolean,
      required: [true, 'Debe indicar si es apto para celíacos'],
      default: false
    },
    apto_veganos: {
      type: Boolean,
      required: [true, 'Debe indicar si es apto para veganos'],
      default: false
    },
    apto_diabeticos: {
      type: Boolean,
      required: [true, 'Debe indicar si es apto para diabéticos'],
      default: false
    },
    cantidad_calorias: {
      type: Number,
      required: [true, 'La cantidad de calorías es obligatoria'],
      min: [0, 'La cantidad de calorías no puede ser negativa']
    },
    imagen_url: {
      type: String,
      required: [true, 'La URL de la imagen es obligatoria'],
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('Plato', platoSchema);
