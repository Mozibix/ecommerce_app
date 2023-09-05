"use client";

import TextInputs from "../(components)/TextInputs";
import MainLayout from "../layout/MainLayout";

export default function Address() {
  return (
    <>
      <MainLayout>
        <div id="AddressPage" className="mt-4 max-w-[600px] mx-auto px-2">
          <div className="mx-auto bg-white rounded-lg p-3">
            <div className="text-xl text-bold mb-2">Address Details</div>

            <form>
              <div className="mb-4">
                <TextInputs
                  string={"Test"}
                  placeholder="Name"
                  error="This is an error"
                  onUpdate={""}
                  key={""}
                />
              </div>

              <button className="mt-6 w-full text-white text-lg font-semibold p-3 rounded bg-blue-600">
                Update Address
              </button>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
