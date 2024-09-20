import { Switch } from "@nextui-org/react";
import { Fragment, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { PiTrashBold } from "react-icons/pi";

const ReviewCard = ({ initialData, activeTab }) => {
  const [data, setData] = useState(initialData);
  return (
    <Fragment>
      <section className="p-4 w-full space-y-4">
        {data.map((item) => (
          <div
            className="flex md:flex-row flex-col gap-5 w-full justify-between border-b-2 py-4"
            key={item.id}
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 flex-shrink-0 rounded-full bg-black  text-white grid place-content-center font-bold">
                {item.profile}
              </div>
              <div className="space-y-2">
                <h2 className="font-semibold  text-[16px]">
                  {item.name}
                  <span className="font-normal ml-2 text-black/50 text-[12px]">
                    {item.verifiedBuyer ? "Verified Buyer" : ""}
                  </span>
                </h2>
                <div className="flex gap-1">
                  <FaStar className="text-[#FA0B4F] text-[14px]" />
                  <FaStar className="text-[#FA0B4F] text-[14px]" />
                  <FaStar className="text-[#FA0B4F] text-[14px]" />
                  <FaStar className="text-[#FA0B4F] text-[14px]" />
                  <FaStar className="text-[#FA0B4F] text-[14px]" />
                </div>
                <h3 className="font-semibold text-[18px]">{item.title}</h3>
                <p className="text-black/60 text-[16px]">{item.message}</p>
                <div className="w-[90px] h-[90px] border-2 border-black">
                  <img src={item.image} alt="image" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-start md:items-end justify-between">
              <p>{item.date}</p>
              <div className="flex items-center gap-5">
                <Switch size="sm" aria-label="Automatic updates" />
                {activeTab === "clientReviews" || (
                  <div className="flex items-center gap-5">
                    <button className="text-[20px] text-[#475467]">
                      <PiTrashBold />
                    </button>
                    <button className="text-[20px] text-[#475467]">
                      <FiEdit2 />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </Fragment>
  );
};
export default ReviewCard;
