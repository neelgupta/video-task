import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "../pages/Layout";
import Price from "../pages/Admin/Price";
import Subscription from "../pages/Admin/Subscription";
import Dashboard from "../pages/Admin/Dashboard";
import AssetAllocation from "../pages/Admin/AssetAllocation";
import Interaction from "../pages/Admin/Interactions";
import Trash from "../pages/Admin/Trash";
import MyCollection from "../pages/Admin/MyCollection";
import Profile from "../pages/Admin/Profile";
import { useState } from "react";
import Contacts from "../pages/Admin/Contacts";
import VisitContacts from "../pages/Admin/Contacts/VisitContacts";
import FlowCanvas from "../pages/FlowCanvas";
import MyOrganization from "../pages/Admin/MyOrganization";

const UserRoute = () => {
  const [isResetPassword, setIsResetPassword] = useState(false);
  const navigate = useNavigate();
  const routeList = [
    {
      path: "/user/price",
      component: <Price />,
    },
    {
      path: "/user/subscription",
      component: <Subscription />,
    },
    {
      path: "/user/interactions",
      component: <Interaction />,
      pageTitle: "Interactions",
    },
    {
      path: "/user/contacts",
      component: <Contacts />,
      pageTitle: "Contacts",
    },
    {
      path: "/user/collection",
      component: <MyCollection />,
      pageTitle: "My Collection",
    },
    {
      path: "/user/trash",
      component: <Trash />,
      pageTitle: "Trash",
    },
    {
      path: "/user/dashboard",
      component: <Dashboard />,
      pageTitle: "Dashboard",
    },
    {
      path: "/user/contacts/visit",
      component: <VisitContacts />,
      pageTitle: "Back to Contacts",
      onBack: () => navigate("/user/contacts"),
    },
    {
      path: "/user/profile",
      component: (
        <Profile
          isResetPassword={isResetPassword}
          setIsResetPassword={setIsResetPassword}
        />
      ),
      pageTitle: isResetPassword ? "Reset Password" : "My Account",
      onBack: () => setIsResetPassword(false),
    },
    {
      path: "/user/asset-allocation",
      component: <AssetAllocation />,
      pageTitle: "Asset Allocation",
    },
    {
      path: "/user/my-organization/:type",
      component: <MyOrganization />,
      pageTitle: "Explore Your Organization",
    },
  ];
  return (
    <Routes>
      {routeList?.map((elm, index) => {
        return (
          <Route
            key={index}
            path={elm.path}
            element={
              <Layout pageTitle={elm.pageTitle} onBack={elm.onBack}>
                {elm.component}
              </Layout>
            }
          />
        );
      })}
      <Route path="/flow" element={<FlowCanvas />} />
      <Route path="*" element={<Navigate to="/user/dashboard" />} />
    </Routes>
  );
};

export default UserRoute;
