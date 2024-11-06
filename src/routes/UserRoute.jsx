import { Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "../pages/UserLayout";
import Organizations from "../pages/User/Organizations";
import CreateVideoStart from "../pages/User/CreateVideoStart/CreateVideoStart";
import MediaSelect from "../pages/User/MediaSelect";

const UserRoute = () => {
  const routeList = [
    {
      path: "/organizations",
      component: <Organizations />,
    },
    {
      path: "/get-started",
      component: <CreateVideoStart />,
    },
    {
      path: "/media-type",
      component: <MediaSelect />,
    },
  ];
  return (
    <Routes>
      {routeList?.map((elm, index) => {
        return (
          <Route
            key={index}
            path={elm.path}
            element={<UserLayout>{elm.component}</UserLayout>}
          />
        );
      })}
      <Route path="*" element={<Navigate to="/organizations" />} />
    </Routes>
  );
};

export default UserRoute;
