import * as Yup from "yup";

 export const registerValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Geef een geldig email adres in")
      .required("Email is verplicht"),
    password: Yup.string()
      .min(6, "Wachtwoord moet minstens 6 karakters bevatten")
      .required("Wachtwoord is verplicht"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Wachtwoorden komen niet overeen")
      .required("Bevestig je wachtwoord"),
  });

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geef een geldig email adres in")
    .required("Email is verplicht"),
  password: Yup.string()
    .required("Wachtwoord is verplicht"),
});
