import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./MyOrganization.scss";
import OrganizationHeader from "./OrganizationHeader";
import Overview from "./pages/Overview";
import PlanBilling from "./pages/PlanBilling";
import Referrals from "./pages/Referrals";
import Team from "./pages/Team";
import Notifications from "./pages/Notifications";
import MediaLibrary from "./pages/MediaLibrary";
import DeveloperApps from "./pages/DeveloperApps";
import Webhooks from "./pages/Webhooks";
import { api } from "../../../services/api";
import { Spinner } from "react-bootstrap";
function MyOrganization() {
  const { type } = useParams();
  return (
    <div className="MyOrganization-container">
      <OrganizationHeader type={type} />
      <div className="organization-content flow">
        {type === "overview" && <Overview />}
        {type === "plan-billing" && <PlanBilling />}
        {type === "referrals" && <Referrals />}
        {type === "team" && <Team />}
        {type === "notifications" && <Notifications />}
        {type === "media-library" && <MediaLibrary />}
        {type === "developer-apps" && <DeveloperApps />}
        {type === "webhooks" && <Webhooks />}
      </div>
    </div>
  );
}

export default MyOrganization;
