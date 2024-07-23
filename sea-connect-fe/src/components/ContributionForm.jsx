import React, { useState } from "react";
import Dropdown from "../adminComponents/Dropdown";

const ContributionForm = ({
  showForm,
  contributionType,
  options,
  setContributionType,
  amount,
  setAmount,
}) => {
  return (
    <section className="antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Make a Contribution</h1>
      <p className="text-lg mb-8">
        We appreciate your support! Whether it's a donation or volunteering your
        time, every contribution makes a difference. Please select your
        contribution type and amount below.
      </p>
      <div className="h-full">
        <div>
          <div
            className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto"
            x-data="{ card: true }"
          >
            <div className="bg-white px-8 pb-6 rounded-b shadow-lg">
              <div className="text-center mb-6">
                <h1 className="text-xl pt-4 leading-snug text-gray-800 font-semibold mb-2">
                  Contribute
                </h1>
                {/* <div className="text-sm">Contribute Now</div> */}
              </div>
              <div x-show="card">
                <div className="space-y-4">
                  {/* <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="card-nr"
                    >
                      Card Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="card-nr"
                      className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                      type="text"
                      placeholder="1234 1234 1234 1234"
                    />
                  </div> */}
                  {/* <div className="flex space-x-4">
                    <div className="flex-1">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="card-expiry"
                      >
                        Expiry Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="card-expiry"
                        className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="text"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="card-cvc"
                      >
                        CVC <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="card-cvc"
                        className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="text"
                        placeholder="CVC"
                      />
                    </div>
                  </div> */}
                  <Dropdown
                    label={"Select Type"}
                    options={options}
                    value={contributionType}
                    setValue={setContributionType}
                  />
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="amount"
                    >
                      Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="amount"
                      value={amount}
                      className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                      type="number"
                      placeholder="0"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="mb-4">
                    <button
                      onClick={showForm}
                      className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                    >
                      Pay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributionForm;
