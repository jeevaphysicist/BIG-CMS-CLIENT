import { Fragment, useState } from "react";
import {
  Button,
  Input,
  Link,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import RequiredSymbol from "../Content/RequiredSymbol";

const Faqs = ({ handleHomepage }) => {
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const [formData, setFormData] = useState({
    sectionTitle: "",
    selectedCategory: "",
    faqs: [{ question: "", answer: "" }],
    moduleId: null,
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const addNewQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
    setFormData((prevData) => ({ ...prevData, faqs: updatedQuestions }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageSelect = async (file, width, height, banner) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [banner]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;

    if (formData.sectionTitle === "" || formData.sectionTitle === null) {
      newerrors.sectionTitle = "Section Title is required";
      has = true;
    }
    if (
      formData.selectedCategory === "" ||
      formData.selectedCategory === null
    ) {
      newerrors.selectedCategory = "Category is required";
      has = true;
    }
    formData.faqs.forEach((questionObj, index) => {
      if (!questionObj.question) {
        newerrors[`question_${index}`] = "Question is required";
        has = true;
      }
      if (!questionObj.answer) {
        newerrors[`answer_${index}`] = "Answer is required";
        has = true;
      }
    });

    setError(newerrors);
    return has;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    // API Call Here

    console.log("Form submitted with data:", formData);
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        className="w-full md:h-full md:px-8 px-2 space-y-6"
      >
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="section_Title"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Section Title
                <RequiredSymbol />
                {errors.sectionTitle && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.sectionTitle}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="section_Title"
                placeholder="Frequently Asked Questions"
                variant="bordered"
                size="lg"
                radius="sm"
                name="sectionTitle"
                onChange={handleFormChange}
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
                    To Edit your FAQs, Select the selectedCategory and Edit your
                    Section Contents.
                  </p>
                </div>
              </div>
              <img src={"/images/image 17.png"} alt="faqs" />
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
                    {errors.selectedCategory && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.selectedCategory}
                      </span>
                    )}
                  </label>
                  <Select
                    type="text"
                    id="banner_month"
                    placeholder="Select selectedCategory"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="selectedCategory"
                    onChange={handleFormChange}
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
                        {errors[`question_${index}`] && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors[`question_${index}`]}
                          </span>
                        )}
                      </label>
                      <Input
                        type="text"
                        id={`question-${index}`}
                        placeholder="How long has BestinGems been in the Gemstone business?"
                        variant="bordered"
                        value={que.question}
                        size="lg"
                        radius="sm"
                        onChange={(e) =>
                          handleQuestionChange(
                            index,
                            "question",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor={`answer-${index}`}
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Answer {index + 1}
                        <RequiredSymbol />
                        {errors[`answer_${index}`] && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors[`answer_${index}`]}
                          </span>
                        )}
                      </label>
                      <Textarea
                        type="text"
                        id={`answer-${index}`}
                        value={que.answer}
                        placeholder="BestinGems takes pride in its 25 years of expertise in the Gemstone industry. With a rich legacy, we have been dedicated to providing exquisite Gemstones, Gemstone Jewelry, and Semi-Mounts to our valued customers across the USA."
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        onChange={(e) =>
                          handleQuestionChange(index, "answer", e.target.value)
                        }
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
            type="button"
            onClick={handleHomepage}
            variant="bordered"
            className="font-semibold"
          >
            Back to list
          </Button>
          <Button
            color="primary"
            type="submit"
            className="font-semibold text-white"
            startContent={<FiSave size={20} />}
          >
            Save
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default Faqs;
