import { body } from "express-validator";

export const searchValidation = () => {
  return [
    body("website")
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage("O website é obrigatório")
      .isString()
      .withMessage('O website deve ser do tipo "string"'),
  ];
};
