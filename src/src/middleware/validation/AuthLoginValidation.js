import { body } from "express-validator";

export default [
  body("email")
    .notEmpty()
    .withMessage("E-mail is required.")
    .bail()
    .isEmail()
    .withMessage("Invalid E-mail address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password has to be at least 8 characters."),
];
