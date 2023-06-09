import { Route, Routes } from "react-router-dom";
import Cluster from "./cluster-page/Cluster";

const ClusterRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Cluster />} />
    </Routes>
  );
};

export default ClusterRoutes;
