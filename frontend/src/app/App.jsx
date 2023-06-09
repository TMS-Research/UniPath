import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};

export default App;
