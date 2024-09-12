/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import genshowsImg from "../../../assets/image 14.png";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";

const Gemshows = ({ handleHomepage }) => {
  return (
    <Fragment>
      <section className="w-full md:h-full md:px-8 px-2 space-y-6">
        <div className="w-full h-full md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] h-full pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex items-center gap-4 sticky">
              <div className="w-[60%]">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>
                    To Edit the Product Carousel Details, Go to Gemshow
                    Collections.
                  </p>
                  <Button color="primary" className="mt-5">
                    Manage Gemshows
                  </Button>
                </div>
              </div>
              <div>
                <img src={'/images/image 14.png'} alt="content" />
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] overflow-y-auto no-scrollbar mt-5 md:mt-0">
            {/* Banner */}
            <div className="w-full flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="sec_title"
                  className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                >
                  Section Title
                  <RequiredSymbol />
                </label>
                <Input
                  type="text"
                  id="sec_title"
                  placeholder="Explore Gemshows"
                  variant="bordered"
                  size="lg"
                  radius="sm"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="explore_desc"
                  className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                >
                  Description
                  <RequiredSymbol />
                </label>
                <Textarea
                  type="text"
                  id="explore_desc"
                  placeholder="Join us at our Dazzling Gemshows across the USA, where each stone tells a unique story of Beauty and Rarity. From mesmerizing Sapphires to enchanting Emeralds, BestInGems invites you to explore a world of breathtaking Gemstones, Gemstone Jewelry & Semi-Mount Collections."
                  variant="bordered"
                  size="lg"
                  radius="sm"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="action_desc"
                  className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                >
                  Call to Action Title
                  <RequiredSymbol />
                </label>
                <Input
                  type="text"
                  id="action_desc"
                  placeholder="Explore All Gemshows"
                  variant="bordered"
                  size="lg"
                  radius="sm"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="action_link"
                  className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                >
                  Call to Action Link
                  <RequiredSymbol />
                </label>
                <Input
                  type="text"
                  id="action_link"
                  placeholder="https://www.figma.com/desig"
                  variant="bordered"
                  size="lg"
                  radius="sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save and cancel buttons */}
        <div className="w-full sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
          <Button
            onClick={handleHomepage}
            variant="bordered"
            className="font-semibold"
          >
            Back to list
          </Button>
          <Button
            color="primary"
            className="font-semibold text-white"
            startContent={<FiSave size={20} />}
          >
            Save
          </Button>
        </div>
      </section>
    </Fragment>
  );
};

export default Gemshows;