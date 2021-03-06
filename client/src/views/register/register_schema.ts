import * as yup from "yup";
import { gql } from "@apollo/client";
import { passwordValidation, emailValidation } from "../../components/util/yup";

export const InitialValues = {
  name: "",
  email: "",
  role: "",
  password: "",
};

export const validationSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required").min(2).max(30),
  email: emailValidation,
  password: passwordValidation,
  role: yup.string().trim().required("Role is required").min(2).max(30),
});

export const REGISTER_SCHEMA = gql`
  mutation RegisterUser(
    $email: String!
    $password: String!
    $name: String!
    $role: String!
  ) {
    register(email: $email, password: $password, name: $name, role: $role) {
      __typename
      ... on UserRegistered {
        message
      }
      ... on FieldErrors {
        errors {
          message
          path
        }
      }
      ... on UserAlreadyExistsError {
        message
        path
      }
    }
  }
`;
