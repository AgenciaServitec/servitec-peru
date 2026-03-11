export const VALIDATION_MESSAGES = {
  nombre: {
    required: "El nombre completo es obligatorio para el registro",
    min: "Tu nombre debe tener al menos 3 caracteres",
  },
  celular: {
    required: "Necesitamos un número para contactarte",
    matches: "Debe contener exactamente 9 dígitos",
  },
  correo: {
    required: "El correo es indispensable",
    format: "Esto no parece un correo electrónico válido",
  },
};
