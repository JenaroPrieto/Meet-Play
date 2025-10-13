import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      {/* wrapper para no quedar debajo del navbar fijo */}
      <div className="page-wrapper">
        <Outlet />
      </div>
    </>
  );
}