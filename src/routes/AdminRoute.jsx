import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AdminLayout from "../pages/AdminLayout/AdminLayout";
import Subscription from "../pages/Admin/Subscription";

const AdminRoute = () => {
  const routeList = [
    {
      path: "/admin/dashboard",
      component: (
        <div className="wp-100 hp-100">
          <div>Dashboard</div>
        </div>
      ),
      pageTitle: "Dashboard",
      onBack: () => {},
    },
    {
      path: "/admin/subscription",
      component: <Subscription />,
      pageTitle: "Subscription",
      onBack: () => {},
    },
  ];
  return (
    <Routes>
      {routeList?.map((elm, index) => {
        console.log("elm", elm);
        return (
          <Route
            key={index}
            path={elm.path}
            element={
              <AdminLayout pageTitle={elm.pageTitle}>
                {elm.component}
              </AdminLayout>
            }
          />
        );
      })}
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
};

export default AdminRoute;
