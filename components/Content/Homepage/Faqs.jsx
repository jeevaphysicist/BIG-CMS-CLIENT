import { Fragment, useEffect, useState } from "react";
import { Button, Input, Link, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import RequiredSymbol from "../RequiredSymbol";
import AlertModel from "@/components/AlertModal";
import { handleHomepageCreateEditSection } from "@/API/api";

const Faqs = ({ handleHomepage, sectionData, fetchData, currentSection }) => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    sectionTitle: "",
    selectedCategory: "general",
    faqs: [{ question: "", answer: "", category: "" }],
    moduleId: null,
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [questionRemoved, setQuestionRemoved] = useState(false);

  const addNewQuestion = () => {
    if (filteredQuestions().length >= 5) {
      toast.error("You can only add up to 5 questions.");
      return;
    }
    const newQuestion = {
      id: Date.now(),
      type: "create",
      question: "",
      answer: "",
      category: formData.selectedCategory,
    };

    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions, newQuestion];
      handleVadilation(updatedQuestions);
      return updatedQuestions;
    });
  };

  const handleDeleteQuestion = async (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
    setFormData((prevData) => ({ ...prevData, faqs: updatedQuestions }));
    setQuestionRemoved(true);
  };

  useEffect(() => {
    if (questionRemoved) {
      handleSubmit();
      setQuestionRemoved(false);
      setOpenAlertModal(false);
    }
  }, [questionRemoved]);

  const openDeleteModal = (id) => {
    setOpenAlertModal(true);
    setQuestionToDelete(id);
  };

  const handleRemoveQuestion = (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
    setFormData((prevData) => ({ ...prevData, faqs: updatedQuestions }));
  };

  const handleQuestionChange = (id, field, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      );
      handleVadilation(updatedQuestions);
      return updatedQuestions;
    });
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // console.log("all datas", sectionData);

  useEffect(() => {
    if (sectionData) {
      setFormData((prev) => ({
        ...prev,
        sectionTitle: sectionData.sectionTitle || "",
        faqs: sectionData.faqs || [],
        moduleId: sectionData.moduleId || null,
      }));
      setQuestions(sectionData.faqs || []);
    }
  }, [sectionData]);

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;

    if (!formData.sectionTitle) {
      newerrors.sectionTitle = "Section Title is required";
      has = true;
    }

    if (!formData.selectedCategory) {
      newerrors.selectedCategory = "Category is required";
      has = true;
    }

    questions.forEach((questionObj, index) => {
      if (!questionObj.question) {
        newerrors[`question_${index}`] = "Question is required";
        has = true;
      }
      if (!questionObj.answer) {
        newerrors[`answer_${index}`] = "Answer is required";
        has = true;
      }
      if (!questionObj.category) {
        newerrors[`category_${index}`] = "Category is required";
        has = true;
      }
    });

    setError(newerrors);
    return has;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setFormData((prevData) => ({ ...prevData, faqs: questions }));
    let validateResponse = handleVadilation();
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    let updateType = questions.map((question) => ({
      ...question,
      type: "edit",
    }));

    let bodyData = {
      contents: { ...formData, faqs: updateType },
      moduleSlug: currentSection.moduleSlug,
      moduleName: currentSection.moduleName,
      sectionSlug: currentSection.sectionSlug,
      sectionName: currentSection.sectionName,
      pageName: currentSection.moduleName,
      pageSlug: currentSection.moduleSlug,
    };

    try {
      setLoading(true);
      const response = await handleHomepageCreateEditSection(bodyData, false);
      if (response.status >= 200 && response.status <= 209) {
        toast.success(response.data.message);
        fetchData();
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = () => {
    let filteredData = questions.filter(
      (q) => q.category === formData.selectedCategory
    );
    return filteredData;
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
                value={formData.sectionTitle}
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
                  <select
                    type="text"
                    id="banner_month"
                    placeholder="Select Category"
                    className="w-full h-[46px] rounded-[8px] border-1.5 border-[#D0D5DD] px-[10px] cursor-pointer"
                    name="selectedCategory"
                    value={formData.selectedCategory}
                    onChange={(e) => {
                      handleFormChange(e);
                      fetchData();
                    }}
                  >
                    <option value="general">General</option>
                    <option value="delivery">Delivery</option>
                    <option value="quality">Quality</option>
                    <option value="payment">Payment</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="timer" className="text-[18px] font-bold">
                    Questions
                  </label>
                  <div>
                    <Link
                      className="font-bold flex gap-1 items-center cursor-pointer "
                      onClick={addNewQuestion}
                    >
                      <FaPlus size={10} />
                      Add New Question
                    </Link>
                    <p className="text-[10px] text-[#667085] text-end">
                      Max 5 FAQs can be generated
                    </p>
                  </div>
                </div>

                {filteredQuestions()?.map((que, index) => (
                  <div className="flex flex-col space-y-6 mb-8" key={index}>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
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
                        {que.type === "edit" ? (
                          <button
                            className="font-bold flex gap-1 items-center cursor-pointer text-red-500"
                            type="button"
                            onClick={() => openDeleteModal(que.id)}
                          >
                            <FaMinus size={12} className="pt-1" /> Delete
                            Question
                          </button>
                        ) : (
                          <button
                            className="font-bold flex gap-1 items-center cursor-pointer text-gray-500"
                            type="button"
                            onClick={() => handleRemoveQuestion(que.id)}
                          >
                            <FaMinus size={12} className="pt-1" /> Remove
                            Question
                          </button>
                        )}
                      </div>

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
                            que.id,
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
                          handleQuestionChange(que.id, "answer", e.target.value)
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
            className="font-semibold text-white disabled:opacity-40 disabled:cursor-wait"
            startContent={loading ? null : <FiSave size={20} />}
            isLoading={loading}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </form>
      <AlertModel
        isVisible={openAlertModal}
        modeltitle="Delete Question"
        message="Are you sure you want to delete this question?"
        onConfirm={() => handleDeleteQuestion(questionToDelete)}
        onCancel={() => setOpenAlertModal(false)}
      />
    </Fragment>
  );
};

export default Faqs;