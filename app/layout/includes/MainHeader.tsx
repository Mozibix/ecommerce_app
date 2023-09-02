"use client";

import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";

export default function MainHeader() {
  return (
    <>
      <div id="main_header" className="border-b">
        <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
          <div className="flex items-center w-full bg-white">
            <div className="flex lg:justify-start justify-between gap-10 px-3 max-w-[1150px] w-full">
              <Link href="/">
                <img width={120} src="/images/logo.svg" alt="logo" />
              </Link>

              <div className="w-full">
                <div className="relative">
                  <div className="flex items-center">
                    <div className="relative flex items-center border-2 border-gray-900 w-full p-2">
                      <button className="flex items-center">
                        <AiOutlineSearch size={22} />
                      </button>

                      <input
                        type="text"
                        placeholder="search for anything"
                        className="w-full placeholder-gray-400 texy-sm pl-3 focus:outline-none"
                      />
                    </div>

                    <button className="flex items-center bg-blue-600 text-sm font-semibold text-white p-[11px] ml-2 px-14">
                      search
                    </button>

                    <div className="text-xs px-2 hover:text-blue-500 cursor-pointer">
                      Advanced
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
