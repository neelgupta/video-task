import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout";
import Product from "../pages/Admin/Product";
import Solutions from "../pages/Admin/Solutions";
import Examples from "../pages/Admin/Examples";
import Resources from "../pages/Admin/Resources";
import Price from "../pages/Admin/Price";

const AdminRoute = () => {
  const routeList = [
    {
      path: "/admin/product",
      component: <Product />,
    },
    {
      path: "/admin/solutions/:type",
      component: <Solutions />,
    },
    {
      path: "/admin/examples/:type",
      component: <Examples />,
    },
    {
      path: "/admin/resources/:type",
      component: <Resources />,
    },
    {
      path: "/admin/price",
      component: <Price />,
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
      <Route path="*" element={<Navigate to="/admin/product" />} />
    </Routes>
  );
};

export default AdminRoute;
