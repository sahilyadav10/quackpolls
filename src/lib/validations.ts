import * as yup from "yup";

export const signUpValidation = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .min(13, "Please enter a valid age")
    .max(100, "Please enter a valid age")
    .required("Age is required"),
  gender: yup.string().required("Gender is required"),
});
