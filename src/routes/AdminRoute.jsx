import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout";
import Price from "../pages/Admin/Price";
import Subscription from "../pages/Admin/Subscription";

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
      component: <div>dashboard</div>,
    },
  ];
  return (
    <Routes>
      {routeList?.map((elm, index) => {
        return (
          <Route
            key={index}
            path={elm.path}
            element={<Layout>{elm.component}</Layout>}
          />
        );
      })}
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
};

export default AdminRoute;
