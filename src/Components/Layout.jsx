import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div>
      <Navigation />
      <main>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
