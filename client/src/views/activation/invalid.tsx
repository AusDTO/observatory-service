import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import SEO from "../seo";

interface Props extends RouteComponentProps {}

export const InvalidConfirmation: React.FC<Props> = () => {
  return (
    <DefaultLayout>
      <>
        <SEO title="Invalid link" />

        <div className="container-fluid au-body">
          <h2>Invalid confirmation link</h2>
          <p>The link has expired or is not valid.</p>
          <p>You can try:</p>
          <ul>
            <li>
              <Link to="/resend-confirmation">Resend confirmation link</Link>
            </li>
            <li>
              <Link to="/">Register an account</Link>
            </li>
          </ul>
        </div>
      </>
    </DefaultLayout>
  );
};
