import React from "react";

import SEO from "../seo";
import AdminLayout from "../../components/layouts/AdminLayout";
import { GetProperty_getProperty_Property } from "../../graphql/GetProperty";
import PageAlert from "../../components/blocks/page-alert";

interface Props {
  apiErrorMessage?: string;
  property?: GetProperty_getProperty_Property;
} // key

export const ServiceLandingPage: React.FC<Props> = ({
  apiErrorMessage,
  property,
}) => {
  const renderProperty = () => {
    if (apiErrorMessage) {
      return (
        <PageAlert type="warning" className="max-42">
          <p>{apiErrorMessage}</p>
        </PageAlert>
      );
    }

    if (property) {
      const { domain, ua_id, service_name } = property;
      return (
        <dl className="au-body">
          <dt className="bold">Domain:</dt>
          <dd>{domain}</dd>
          <dt className="bold">Service:</dt>
          <dd>{service_name}</dd>
          <dt className="bold">UA_ID:</dt>
          <dd>{ua_id}</dd>
        </dl>
      );
    }
  };

  return (
    <AdminLayout>
      <>
        <SEO title={property ? property.service_name : "Error"} />

        <div className="container-fluid au-body">
          <h2>Property dashboard</h2>
          {renderProperty()}
        </div>
      </>
    </AdminLayout>
  );
};
