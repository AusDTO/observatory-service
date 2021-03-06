import React from "react";
import { Link } from "react-router-dom";
import { AuCard, AuCardInner } from "../../types/auds";

interface Props {
  propertyUaId: string;
  domain: string;
} // key

export const ServiceQuestions: React.FC<Props> = ({ propertyUaId, domain }) => {
  return (
    <section className="mt-2">
      <h2>
        Which questions are going to help you achieve your business objectives
        today?
      </h2>
      <div className="row">
        <ul className="au-card-list au-card-list--matchheight">
          <li className="col-md-4 col-sm-6 col-xs-12">
            <AuCard>
              <AuCardInner>
                <h3 className="mt-0 font-weight-500">Usage</h3>
                <ul className="au-link-list">
                  <li>
                    <Link
                      to={`/service/snapshot/${propertyUaId}?timePeriod=weekly`}
                    >
                      What is a snapshot of our site?
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={`/service/engagement/${propertyUaId}?url=https://www.${domain}/&timePeriod=weekly`}
                    >
                      How are people engaging with [URL's] content?
                    </Link>
                  </li>
                  <li>
                    <Link to={`/service/peak-demand/${propertyUaId}`}>
                      Is there a peak demand time for my service?
                    </Link>
                  </li>
                </ul>
              </AuCardInner>
            </AuCard>
          </li>
          <li className="col-md-4 col-sm-6 col-xs-12">
            <AuCard>
              <AuCardInner>
                <h3 className="mt-0 font-weight-500">Content review</h3>
                <ul className="au-link-list">
                  <li>
                    <a href="#" className="disabled-link">
                      Are there any pages on our site which are 'leaking' users?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="disabled-link">
                      What content is outdated/unused?
                    </a>
                  </li>
                </ul>
              </AuCardInner>
            </AuCard>
          </li>
          <li className="col-md-4 col-sm-6 col-xs-12">
            <AuCard>
              <AuCardInner>
                <h3 className="mt-0 font-weight-500">Journeys</h3>
                <ul className="au-link-list">
                  <li>
                    <a href="#" className="disabled-link">
                      How many steps are users taking to find [PageUrl]?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="disabled-link">
                      How many users are completing a journey from Page A to
                      Page B ?
                    </a>
                  </li>
                </ul>
              </AuCardInner>
            </AuCard>
          </li>
        </ul>
      </div>
    </section>
  );
};
