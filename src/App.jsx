import "./App.css";
import AdminRoute from "./routes/AdminRoute";
import AuthRoute from "./routes/AuthRoute";
import { getDataFromLocalStorage } from "./utils/helpers";
function App() {
  // const reduxData = useSelector((state) => state.global);
  // const { themeColor } = reduxData;
  const localData = getDataFromLocalStorage();
  const isAuth = localData?.token ? true : false;
  return (
    <div className="text-12-500">
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
