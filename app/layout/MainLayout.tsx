"use client";

import Footer from "./includes/Footer";
import MainHeader from "./includes/MainHeader";
import SubMenu from "./includes/SubMenu";
import TopMenu from "./includes/TopMenu";

interface IProps {
  children: any;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <div
        id="main_layout"
        className="min-w-[1050px] max-w-[1300px] mx-auto border"
      >
        <div>
          {/* TOPMENU */}
          <TopMenu />
          {/* MAINHEADER */}
          <MainHeader />
          {/* SUBMENU */}
          <SubMenu />

          {children}

          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
