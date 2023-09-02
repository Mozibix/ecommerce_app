"use client";

import TopMenu from "./includes/TopMenu";

export default function MainLayout({ children }) {
  return (
    <>
      <div
        id="main_layout"
        className="min-w-[1050px] max-w-[1300px] mx-auto border"
      >
        <div>
          <TopMenu />
        </div>
      </div>
    </>
  );
}
