export const errorMessages = {
  es: {
    invalid_type: "Dato inválido.",
    invalid_email: "Dirección de correo inválida.",
    required: "Este campo es obligatorio.",
    too_small: (min: number, type: string) =>
      min === 1 ? "Este campo es obligatorio." : `Mínimo ${min} caracteres.`,
    too_big: (max: number, type: string) => `Máximo ${max} caracteres.`,
    exact: (len: number) => `Debe tener exactamente ${len} caracteres.`,
  },
};
export const msg = errorMessages.es;
