import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { PrivateRoutes } from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="logout" />
          <Route path="/*" element={<PrivateRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
