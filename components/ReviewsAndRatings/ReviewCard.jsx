import { FormateImageURL } from "@/lib/FormateImageURL";
import { Switch } from "@nextui-org/react";
import { Fragment, useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { PiTrashBold } from "react-icons/pi";
import { toast } from "react-toastify";
import {  handleDeleteReviewAndRating, handleUpdateReviewStatus } from "@/API/api";
import AlertModel from "../AlertModal"

const ReviewCard = ({ handleSelectedReview, type, handleSetType, handleReviewPage, fetchData, initialData, activeTab }) => {
  const [data, setData] = useState(initialData);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  console.log("data",initialData);

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const response = await handleUpdateReviewStatus(id, { status: currentStatus });
      if (response.status >= 200 && response.status < 300) {
        toast.success("Review status updated successfully");
        fetchData();
      } else {
        toast.error("Failed to update review status");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedReviewId(id);
    setOpenAlertModal(true);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await handleDeleteReviewAndRating(selectedReviewId);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Review deleted successfully");
        fetchData();
      } else {
        toast.error("Failed to delete review");
      }
    } catch (error) {
      toast.error("Error deleting review");
    } finally {
      setLoading(false);
      setOpenAlertModal(false);
    }
  };
  
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
              {item.customerName.split(' ').map(name => name.slice(0, 1)).join('')}
              </div>
              <div className="space-y-2">
                <h2 className="font-semibold  text-[16px]">
                  {item.customerName}
                  <span className="font-normal ml-2 text-black/50 text-[12px]">
                    {item.isVerifiedCustomer ? "Verified Buyer" : ""}
                  </span>
                </h2>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-[14px] ${
                        star <= item.ratings ? 'text-[#FA0B4F]' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <h3 className="font-semibold text-[18px]">{item.reviewTitle}</h3>
                <p className="text-black/60 text-[16px]">{item.description}</p>
                <div className="w-[90px] h-[90px] border-2 border-black">
                  <img src={FormateImageURL(item.media)} alt="image" />
                </div>
              </div>
            </div>
            <div className="flex md:flex-col gap-3 items-start md:items-end justify-between">
              <p>{new Date(item.createdAt).toLocaleDateString()}</p>
              <div className="flex items-center gap-5">
                <Switch 
                  size="sm" 
                  aria-label="Review status" 
                  isSelected={item.status === "Active"}
                  onChange={() => handleStatusChange(item._id, item.status)}
                />
                {activeTab === "clientReviews" || (
                  <div className="flex items-center gap-5">
                    <button 
                      className="text-[20px] text-[#475467]"
                      onClick={() => handleDeleteClick(item._id)}
                    >
                      <PiTrashBold />
                    </button>
                    <button  className="text-[20px] text-[#475467]" onClick={() => {handleSetType("edit"); handleReviewPage();handleSelectedReview(item)}}>
                      <FiEdit2  />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
      <AlertModel
        loading={loading}
        isVisible={openAlertModal}
        modeltitle="Delete Review"
        message="Are you sure you want to delete this review?"
        onConfirm={handleDelete}
        onCancel={() => setOpenAlertModal(false)}
      />
    </Fragment>
  );
};
export default ReviewCard;
