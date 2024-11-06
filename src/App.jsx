import { useSelector } from "react-redux";
import "./App.css";
import { Promptalert } from "./components";
import AdminRoute from "./routes/AdminRoute";
import AuthRoute from "./routes/AuthRoute";
import { getDataFromLocalStorage } from "./utils/helpers";
function App() {
  // eslint-disable-next-line no-unused-vars
  const reduxData = useSelector((state) => state.global);
  const localData = getDataFromLocalStorage();
  const isAuth = localData?.token ? true : false;
  return (
    <div className="text-12-500">
      <Promptalert />
      {isAuth ? (
        localData?.role === "admin" ? (
          <AdminRoute />
        ) : (
          <div>user</div>
        )
      ) : (
        <AuthRoute />
      )}
    </div>
  );
}

export default App;
