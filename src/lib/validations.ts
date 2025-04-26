import * as yup from "yup";
import { PollPrivacy } from "@/types/poll";

export const signInValidation = yup.object({
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
});

export const signUpValidation = signInValidation.concat(
  yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    age: yup
      .number()
      .typeError("Age must be a number")
      .min(13, "Please enter a valid age")
      .max(100, "Please enter a valid age")
      .required("Age is required"),
    gender: yup.string().required("Gender is required"),
  })
);

export const pollValidations = yup.object({
  question: yup.string().required("Question is required"),
  options: yup
    .array()
    .of(
      yup.object({
        value: yup.string().required("Choice cannot be empty"),
      })
    )
    .min(2, "At least 2 choices are required")
    .max(10, "No more than 10 choices allowed")
    .required("Choices are required"),
  pollPrivacy: yup
    .string()
    .oneOf(
      Object.values(PollPrivacy),
      "Poll privacy must be either Public or Private"
    )
    .required("Poll privacy is required"),
  closeTime: yup.date().required("Close time is required"),
});
