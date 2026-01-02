import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .lowercase()
    .email("Voer een geldig e-mailadres in")
    .required("E-mailadres is verplicht"),

  password: Yup.string()
    .min(8, "Wachtwoord moet minstens 8 tekens bevatten")
    .matches(/[A-Z]/, "Wachtwoord moet minstens één hoofdletter bevatten")
    .matches(/[a-z]/, "Wachtwoord moet minstens één kleine letter bevatten")
    .matches(/[0-9]/, "Wachtwoord moet minstens één cijfer bevatten")
    .matches(/[^A-Za-z0-9]/, "Wachtwoord moet minstens één speciaal teken bevatten")
    .required("Wachtwoord is verplicht"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Wachtwoorden komen niet overeen")
    .required("Bevestiging van wachtwoord is verplicht"),
});


export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geef een geldig email adres in")
    .required("Email is verplicht"),
  password: Yup.string()
    .required("Wachtwoord is verplicht"),
});

export const reviewValidationSchema = Yup.object({
  comment: Yup.string()
    .trim()
    .required("Comment is verplicht"),
  score: Yup.number()
    .typeError("Score moet een getal zijn")
    .min(0, "Score moet minstens 0 zijn")
    .max(10, "Score mag maximaal 10 zijn")
    .required("Score is verplicht"),
});

export const addSpaValidationSchema = Yup.object().shape({
  name: Yup.string().required("Naam is verplicht"),
  location: Yup.string().required("Locatie is verplicht"),
  description: Yup.string()
    .min(10, "Beschrijving moet minstens 10 tekens bevatten")
    .required("Beschrijving is verplicht"),
});