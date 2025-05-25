import { validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "email",
      value: req.body?.email ? req.body.email : "",
      err: req.formErrorFields?.email ? req.formErrorFields.email : "",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      value: req.body?.password ? req.body.password : "",
      err: req.formErrorFields?.password ? req.formErrorFields.password : "",
    },
  ];
  res.clearCookie('token');
  res.render("pages/login", {
    layout: "layout/authentication",
    inputs,
  })
}

export async function postLogin(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.formErrorFields = {};
      errors.array().forEach((error) => {
        req.formErrorFields[error.path] = error.msg;
      });

      return next();
    } else {
      const user = await User.query().findOne({ email: req.body.email });

      if (user) {
        const passwordMatches = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (passwordMatches) {
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.TOKEN_SALT,
            { expiresIn: "1h" }
          );

          res.cookie("token", token, { httpOnly: true });
          res.redirect("/");
          
        } else {
          req.formErrorFields = { password: "Incorrect password." };
          return next();
        }
      } else {
        req.formErrorFields = { email: "This E-mail address doesn't exist." };
        return next();
      }
    }
  } catch (error) {
    next(error.message);
  }
}

export async function postRegister(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.formErrorFields = {};
      errors.array().forEach((error) => {
        req.formErrorFields[error.path] = error.msg;
      });

      return next();
    } else {
      const user = await User.query().findOne({ email: req.body.email });

      if (user) {
        req.formErrorFields = {
          email: "This e-mail address is already in use.",
        };
        return next();
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      await User.query().insert({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
      });

      res.redirect("/login");
    }
  } catch (error) {
    next(error.message);
  }
}

export async function register(req, res) {
  const inputs = [
    {
      name: "firstname",
      label: "First name",
      type: "text",
      value: req.body?.firstname ? req.body.firstname : "",
      err: req.formErrorFields?.firstname ? req.formErrorFields.firstname : "",
    },
    {
      name: "lastname",
      label: "Last name",
      type: "text",
      value: req.body?.lastname ? req.body.lastname : "",
      err: req.formErrorFields?.lastname ? req.formErrorFields.lastname : "",
    },
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      err: req.formErrorFields?.email ? req.formErrorFields.email : "",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      value: req.body?.password ? req.body.password : "",
      err: req.formErrorFields?.password ? req.formErrorFields.password : "",
    },
  ];

  res.render("pages/register", {
    layout: "layout/authentication",
    inputs,
  });
}
