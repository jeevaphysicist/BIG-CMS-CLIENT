import { Fragment, useEffect, useState } from "react";
import { Button, Input, Link, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import AlertModel from "@/components/AlertModal";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";
import { handleUpdateTradeshowFaqs } from "@/API/api";
import RequiredSymbol from "../Content/RequiredSymbol";

const Faqs = ({ handleClose, sectionData, fetchData }) => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    questions: [],
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [questionRemoved, setQuestionRemoved] = useState(false);


  const addNewQuestion = () => {
    if (questions.length >= 5) {
      toast.error("You can only add up to 5 questions.");
      return;
    }
    setQuestions([...questions, { question: "", answer: "",type:"create" }]);
    setFormData((prevData) => ({ ...prevData, questions: [...formData.questions, { question: "", answer: "",type:"create" }] }));

  };

  const handleDeleteQuestion = async (id) => {
    const updatedQuestions = questions.filter((q) => q._id !== id);
    setQuestions(updatedQuestions);
    setFormData((prevData) => ({ ...prevData, faqs: updatedQuestions }));
    setQuestionRemoved(true);
  };

  const handleRemoveQuestion = (idx)=>{
    const updatedQuestions = questions.filter((q,index) => index !== idx);
    setQuestions(updatedQuestions);
    setFormData((prevData) => ({ ...prevData, faqs: updatedQuestions }));
  }

  console.log("questions",questions);

  useEffect(() => {
    if (questionRemoved) {
      handleSubmit();
      setQuestionRemoved(false);
    }
  }, [questionRemoved]);

 
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
    setFormData((prevData) => ({ ...prevData, questions: updatedQuestions }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleValidation = () => {
    let newErrors = {};
    let hasError = false;

    if (!formData.title) {
      newErrors.title = "Section Title is required";
      hasError = true;
    }

    formData.questions.forEach((questionObj, index) => {
      if (!questionObj.question) {
        newErrors[`question_${index}`] = "Question is required";
        hasError = true;
      }
      if (!questionObj.answer) {
        newErrors[`answer_${index}`] = "Answer is required";
        hasError = true;
      }
    });

    setError(newErrors);
    return hasError;
  };

  useEffect(() => {
    if (sectionData) {
      setFormData({
        ...formData,
        title: sectionData.faqs?.title || "",
        questions: sectionData.faqs?.questions || [],
      });
      setQuestions(sectionData.faqs?.questions || []);
    }
  }, [sectionData]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const isInvalid = handleValidation();

    if (isInvalid) {
      toast.error("Please fill required details correctly!");
      return;
    }

    const updatedQuestions = questions.map((question) => ({
      ...question,
      type:"edit" ,
    }));

    const bodyData =  { title: formData.title, questions: updatedQuestions }

    try {
      setLoading(true);
      // const formData = convertObjectToFormData(bodyData);
      let response;     
        response = await handleUpdateTradeshowFaqs(bodyData, sectionData._id, false);

      if (response.status >= 200 && response.status <= 209) {
        toast.success(response.data.message);
        fetchData();
        // handleClose();
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setOpenAlertModal(false);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="w-full md:h-full md:px-8 px-2 space-y-6">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label htmlFor="section_Title" className="md:text-[18px] text-[16px] gilroy-medium flex gap-1">
                Section Title
                <RequiredSymbol />
                {errors.title && <span className="text-red-600 text-[12px]">{errors.title}</span>}
              </label>
              <Input
                type="text"
                id="section_Title"
                placeholder="Frequently Asked Questions"
                variant="bordered"
                size="lg"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-full md:flex md:flex-row-reverse gap-6">
          <div className="md:w-[40%] h-full pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex flex-col items-center gap-6 sticky">
              <h2 className="lg:text-[22px] text-[18px] font-semibold">Guidelines</h2>
              <p className="text-[#4A5367] lg:text-[16px] text-[12px]">
                To edit your FAQs, select the category and edit your section contents.
              </p>
              <img src="/images/guidefaqs.png" alt="faqs" />
            </div>
          </div>

          <div className="md:w-[60%] overflow-y-auto no-scrollbar mt-5 md:mt-0">
            <div className="flex items-center justify-between">
              <label htmlFor="timer" className="text-[18px] font-bold">Questions</label>
              <div className="flex flex-col gap-2">
              <Link className="font-bold flex gap-1 items-center cursor-pointer" onClick={addNewQuestion}>
                <FaPlus size={10} /> Add New Question
              </Link>
              <p className="text-[10px] text-[#667085]">Max 5 FAQs can be generated</p>
              </div>
            </div>

            {questions?.map((que, index) => (
              <div key={index} className="flex flex-col space-y-6 mb-8">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <label htmlFor={`question-${index}`} className="md:text-[18px] text-[16px] gilroy-medium flex gap-1">
                      Question {index + 1}
                      <RequiredSymbol />
                      {errors[`question_${index}`] && <span className="text-red-600 text-[12px]">{errors[`question_${index}`]}</span>}
                    </label>
                    {
                      que.type === "create" ?
                      <Button
                      color="transparent"
                      className="font-bold flex gap-1 items-center cursor-pointer text-gray-500"
                      onClick={() => {
                        handleRemoveQuestion(index)
                      }}
                    >
                      <FaMinus size={12} className="pt-1" /> Remove Question
                    </Button>
                    :
                    <Button
                      color="transparent"
                      className="font-bold flex gap-1 items-center cursor-pointer text-red-500"
                      onClick={() => {
                        setQuestionToDelete(que._id);
                        setOpenAlertModal(true);
                      }}
                    >
                      <FaMinus size={12} className="pt-1" /> Delete Question
                    </Button>
                     }
                  </div>
                  <Input
                    type="text"
                    id={`question-${index}`}
                    placeholder="Enter your question here"
                    variant="bordered"
                    value={que?.question}
                    onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor={`answer-${index}`} className="md:text-[18px] text-[16px] gilroy-medium flex gap-1">
                    Answer {index + 1}
                    <RequiredSymbol />
                    {errors[`answer_${index}`] && <span className="text-red-600 text-[12px]">{errors[`answer_${index}`]}</span>}
                  </label>
                  <Textarea
                    id={`answer-${index}`}
                    placeholder="Enter your answer here"
                    variant="bordered"
                    value={que?.answer}
                    onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save and cancel buttons */}
        <div className="w-full  sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4 pr-5">
          <Button
            type="button"
            onClick={handleClose}
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
        loading={loading}
        isVisible={openAlertModal}
        onCancel={() => setOpenAlertModal(false)}
        onConfirm={()=>handleDeleteQuestion(questionToDelete)}
        modeltitle="Delete FAQS"
        message="Are you sure you want to delete this question?"
      />
    </Fragment>
  );
};

export default Faqs;
