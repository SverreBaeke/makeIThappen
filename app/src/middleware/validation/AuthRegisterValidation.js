import { body } from "express-validator";

export default [
    body("firstname")
        .notEmpty()
        .withMessage("First name is required.")
        .bail()
        .isLength({ min: 2})
        .withMessage("First name has to be atleast 2 characters."),
    body("lastname")
        .notEmpty()
        .withMessage("Last name is required.")
        .bail()
        .isLength({ min: 2 })
        .withMessage("Last name has to be atleast 2 characters."),
    body("email")
        .notEmpty()
        .withMessage("Email is required.")
        .bail()
        .isEmail()
        .withMessage("Invalid email address"),
    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .bail()
        .isLength( {min: 8} )
        .withMessage("Password should be at least 8 characters.")
]