import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout";
import Price from "../pages/Admin/Price";
import Subscription from "../pages/Admin/Subscription";
import Dashboard from "../pages/Admin/Dashboard";
import AssetAllocation from "../pages/Admin/AssetAllocation";

const AdminRoute = () => {
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
      component: <div>Interactions</div>,
    },
    {
      path: "/admin/contacts",
      component: <div>Contacts</div>,
    },
    {
      path: "/admin/collection",
      component: <div>My Collection</div>,
    },
    {
      path: "/admin/trash",
      component: <div>Trash</div>,
    },
    {
      path: "/admin/dashboard",
      component: <Dashboard />,
      pageTitle: "Dashboard",
    },
    {
      path: "/admin/asset-allocation",
      component: <AssetAllocation />,
      pageTitle: "Asset Allocation",
    },
  ];
  return (
    <Routes>
      {routeList?.map((elm, index) => {
        return (
          <Route
            key={index}
            path={elm.path}
            element={<Layout pageTitle={elm.pageTitle}>{elm.component}</Layout>}
          />
        );
      })}
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
};

export default AdminRoute;
