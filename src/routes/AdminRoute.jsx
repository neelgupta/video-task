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

const AdminRoute = () => {
  const [isResetPassword, setIsResetPassword] = useState(false);
  const navigate = useNavigate();
  const routeList = [
    {
      path: "/admin/price",
      component: <Price />,
    },
    {
      path: "/admin/subscription",
      component: <Subscription />,
    },
    {
      path: "/admin/interactions",
      component: <Interaction />,
      pageTitle: "Interactions",
    },
    {
      path: "/admin/contacts",
      component: <Contacts />,
      pageTitle: "Contacts",
    },
    {
      path: "/admin/collection",
      component: <MyCollection />,
      pageTitle: "My Collection",
    },
    {
      path: "/admin/trash",
      component: <Trash />,
      pageTitle: "Trash",
    },
    {
      path: "/admin/dashboard",
      component: <Dashboard />,
      pageTitle: "Dashboard",
    },
    {
      path: "/admin/contacts/visit",
      component: <VisitContacts />,
      pageTitle: "Back to Contacts",
      onBack: () => navigate("/admin/contacts"),
    },
    {
      path: "/admin/profile",
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
      path: "/admin/asset-allocation",
      component: <AssetAllocation />,
      pageTitle: "Asset Allocation",
    },
    {
      path: "/admin/my-organization/:type",
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
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
};

export default AdminRoute;
