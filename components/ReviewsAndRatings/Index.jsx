/* eslint-disable react/prop-types */
"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { Fragment, useState } from "react";
import YourReviews from "./YourReviews";
import ClientReviews from "./ClientReviews";
import { CiCirclePlus } from "react-icons/ci";
import AddReviews from "./AddReviews";

const Index = ({ handleSitepage }) => {
  const [activeTab, setActiveTab] = useState("yourReviews");
  const [isList, setIsList] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleReviewPage = () => {
    setIsList(!isList);
  };

  return (
    <Fragment>
      {isList ? (
        <section>
          <div className="w-full md:h-28  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 border-b-1.5 sticky top-0 z-30 bg-white justify-between">
            <div className="flex md:flex-row flex-col gap-4 justify-between">
              <div>
                <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
                  Reviews and Ratings
                </h2>
                <p className="text-[#4A5367] md:text-[14px] text-[12px]">
                  Add and view Your Reviews
                </p>
              </div>
              <button
                className="bg-[#2761E5] rounded-[10px] text-white px-5 py-2 flex items-center justify-center gap-1"
                onClick={handleReviewPage}
              >
                <CiCirclePlus />
                Add New Review
              </button>
            </div>
            <div className="flex gap-[24px] h-10">
              <button
                className={`text-[16px] ${
                  activeTab === "yourReviews"
                    ? "border-b-3 border-[#434CE7] text-black"
                    : "text-black/50"
                }  font-semibold  `}
                onClick={() => handleTabChange("yourReviews")}
              >
                Your Reviews
              </button>
              <button
                className={`text-[16px] ${
                  activeTab === "clientReviews"
                    ? "border-b-3 border-[#434CE7] text-black"
                    : "text-black/50"
                }  font-semibold`}
                onClick={() => handleTabChange("clientReviews")}
              >
                Client Reviews
              </button>
            </div>
          </div>
          {activeTab === "yourReviews" && <YourReviews activeTab={activeTab} />}
          {activeTab === "clientReviews" && (
            <ClientReviews activeTab={activeTab} />
          )}
        </section>
      ) : (
        <AddReviews handleReviewPage={handleReviewPage} />
      )}
    </Fragment>
  );
};
export default Index;
