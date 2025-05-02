import { Outlet } from "react-router";
import Navbar from "../base/Navbar";
import { useSelector } from "react-redux";

export default function Layout() {
  const categories = useSelector((state) => state.products.list.data);
  return (
    <>
      <Navbar categories={categories} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
