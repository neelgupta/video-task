import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Promptalert } from "./components";
import AuthRoute from "./routes/AuthRoute";
import { getDataFromLocalStorage } from "./utils/helpers";
import UserRoute from "./routes/UserRoute";
import { useEffect } from "react";
import { fontFamilyList } from "./pages/User/MyOrganization/pages/Overview/overviewOption";
import AdminRoute from "./routes/AdminRoute";

function App() {
  // eslint-disable-next-line no-unused-vars
  const reduxData = useSelector((state) => state.global);
  const localData = getDataFromLocalStorage();
  console.log("localData", localData);
  const isAuth = localData?.token ? true : false;

  useEffect(
    () => {
      if (fontFamilyList.length > 0) {
        const fontFamilies = fontFamilyList
          .map((font) => font.value.replace(/ /g, "+"))
          .join("&family=");
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;
        link.rel = "stylesheet";
        document.head.appendChild(link);

        return () => {
          document.head.removeChild(link);
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fontFamilyList]
  );
  return (
    <div className="text-12-500">
      <Promptalert />
      {isAuth ? (
        localData?.role === "admin" ? (
          <AdminRoute />
        ) : (
          // <UserRoute />
          <UserRoute />
        )
      ) : (
        <AuthRoute />
      )}
    </div>
  );
}

export default App;
