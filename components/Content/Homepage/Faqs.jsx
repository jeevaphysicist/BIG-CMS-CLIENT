/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import {
  Button,
  Input,
  Link,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import faqImg from "../../../assets/image 17.png";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { FaPlus } from "react-icons/fa";

const Faqs = ({ handleHomepage }) => {
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);

  const addNewQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  return (
    <Fragment>
      <section className="w-full md:h-full md:px-8 px-2 space-y-6">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="section_title"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Section Title
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                id="section_title"
                placeholder="Frequently Asked Questions"
                variant="bordered"
                size="lg"
                radius="sm"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] h-full pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex flex-col items-center gap-6 sticky">
              <div className="">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>
                    To Edit your FAQs, Select the category and Edit your Section
                    Contents.
                  </p>
                </div>
              </div>
              <img src={'/images/image 17.png'} alt="faqs" />
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] overflow-y-auto no-scrollbar mt-5 md:mt-0">
            {/* Banner */}
            <div className="w-full flex flex-col gap-8">
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="banner_month"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Select the Category
                    <RequiredSymbol />
                  </label>
                  <Select
                    type="text"
                    id="banner_month"
                    placeholder="Select Category"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                  >
                    <SelectItem>Genaral</SelectItem>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="timer" className="text-[18px] font-bold">
                    Questions
                  </label>
                  <Link
                    className="font-bold flex gap-1 items-center cursor-pointer "
                    onClick={addNewQuestion}
                  >
                    <FaPlus size={10} />
                    Add New Question
                  </Link>
                </div>

                {questions.map((que, index) => (
                  <div className="flex flex-col space-y-6 mb-8" key={index}>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor={`question-${index}`}
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Question {index + 1}
                        <RequiredSymbol />
                      </label>
                      <Input
                        type="text"
                        id={`question-${index}`}
                        placeholder="How long has BestinGems been in the Gemstone business?"
                        variant="bordered"
                        value={que.question}
                        size="lg"
                        radius="sm"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor={`answer-${index}`}
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Answer {index + 1}
                        <RequiredSymbol />
                      </label>
                      <Textarea
                        type="text"
                        id={`answer-${index}`}
                        value={que.answer}
                        placeholder="BestinGems takes pride in its 25 years of expertise in the Gemstone industry. With a rich legacy, we have been dedicated to providing exquisite Gemstones, Gemstone Jewelry, and Semi-Mounts to our valued customers across the USA."
                        variant="bordered"
                        size="lg"
                        radius="sm"
                      />
                    </div>
                  </div>
                ))}
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

export default Faqs;
