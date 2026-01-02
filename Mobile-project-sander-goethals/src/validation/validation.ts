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
