import { useMutation } from "@apollo/client";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import PageAlert from "../../components/blocks/page-alert";
import PasswordField from "../../components/form/PasswordField";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { formatApiError } from "../../components/util/formatError";
import {
  ResetPassword,
  ResetPasswordVariables,
  ResetPassword_resetPassword_Error,
  ResetPassword_resetPassword_FieldErrors,
} from "../../graphql/ResetPassword";
import { Aubtn, AuFormGroup } from "../../types/auds";
import {
  ApiError,
  FormSubmitState,
  ResetPasswordData,
} from "../../types/types";
import SEO from "../seo";
import {
  InitialValues,
  RESET_PASSWORD_SCHEMA,
  validationSchema,
} from "./resetPassword_schema";

interface Props extends RouteComponentProps<{ key: string }> {} // key

export const ResetPasswordPage: React.FC<Props> = ({ history, match }) => {
  const { key } = match.params; //key parameter

  const [state, setState] = useState<FormSubmitState>({
    isErrors: false,
    submitted: false,
    apiError: false,
    apiErrorList: [],
  });

  const [isSaving, setSaving] = useState<boolean>(false);

  const [resetPassword] = useMutation<ResetPassword, ResetPasswordVariables>(
    RESET_PASSWORD_SCHEMA
  );

  const handleResetPassword = async (formData: ResetPasswordData) => {
    setSaving(true);
    const { password } = formData;
    const result = await resetPassword({
      variables: { newPassword: password, key },
    });
    setSaving(false);

    if (result.data) {
      const serverResult = result.data.resetPassword;

      const { __typename } = serverResult;

      switch (__typename) {
        case "FieldErrors":
          const errorList: Array<ApiError> = [];
          const {
            errors,
          } = serverResult as ResetPassword_resetPassword_FieldErrors;
          errors?.map((error) =>
            errorList.push({ path: error.path, message: error.message })
          );
          setState({
            ...state,
            apiError: true,
            apiErrorList: errorList,
          });
          break;

        case "Error":
          const {
            message,
            path,
          } = serverResult as ResetPassword_resetPassword_Error;
          setState({
            ...state,
            apiError: true,
            apiErrorList: [{ path, message }],
          });
          break;

        case "Success":
          history.push("/login");
          break;
      }
    }
  };

  return (
    <DefaultLayout>
      <>
        <SEO title="Reset password" />

        <div className="container-fluid au-body">
          <h2>Create a new password</h2>
          <p>You can now create a new password for your account.</p>
          <Formik
            initialValues={InitialValues}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(data, errors) => {
              handleResetPassword(data);
            }}
          >
            {({ values, errors, touched, handleSubmit, submitForm }) => (
              <Form
                id="resend-confirmation"
                noValidate
                onSubmit={(e) => {
                  handleSubmit(e);
                  if (Object.keys(errors).length < 1) return;

                  setState({
                    ...state,
                    isErrors: true,
                    apiError: false,
                    apiErrorList: [],
                  });
                  document.title = "Errors | Sign up form";
                  const timeout = setTimeout(() => {
                    const errorSum = document.getElementById(
                      "error-heading"
                    ) as any;
                    if (errorSum && errorSum.focus()) {
                      errorSum.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                    clearTimeout(timeout);
                  }, 500);
                }}
              >
                {state.apiError && state.apiErrorList.length > 0 && (
                  <PageAlert type="error" className="max-42">
                    <>
                      <h3 id="api-error-heading">There was an error</h3>
                      <ul>{formatApiError(state.apiErrorList)}</ul>
                    </>
                  </PageAlert>
                )}
                {state.isErrors && Object.keys(errors).length > 0 ? (
                  <PageAlert type="error" className="max-42">
                    <>
                      <h3 tabIndex={0} id="error-heading">
                        There has been an error
                      </h3>
                      <ul>
                        {
                          <li>
                            <a href={`#password`}>{errors["password"]}</a>
                          </li>
                        }
                      </ul>
                    </>
                  </PageAlert>
                ) : (
                  ""
                )}
                <PasswordField
                  id="password"
                  width="xl"
                  type="password"
                  dark={false}
                  label="Password"
                  required={true}
                />
                <AuFormGroup>
                  <Aubtn
                    type="submit"
                    disabled={isSaving}
                    onClick={submitForm}
                    className="au-btn--medium"
                  >
                    {isSaving ? "Submitting" : "Reset"}
                  </Aubtn>
                </AuFormGroup>
              </Form>
            )}
          </Formik>
        </div>
      </>
    </DefaultLayout>
  );
};
