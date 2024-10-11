
"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { Fragment, useState, useEffect, useMemo } from "react";
import YourReviews from "./YourReviews";
import ClientReviews from "./ClientReviews";
import { CiCirclePlus } from "react-icons/ci";
import AddReviews from "./AddReviews";
import { handleGetAllCategories, handleGetAllProducts, handleGetAllSubCategories, handleGetReviewsAndRatingsByRole } from "@/API/api";
import { FiSearch } from "react-icons/fi";

const Index = ({ handleSitepage }) => {
  const [activeTab, setActiveTab] = useState("yourReviews");
  const [isList, setIsList] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [role, setRole] = useState("admin");
  const [reviews, setReviews] = useState([]);
  const [type, setType] = useState("create");
  const [selectedReview, setSelectedReview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    fetchGetAllCategories();  
  }, []);

  useEffect(() => {
    fetchGetAllReviews();
  }, [role]);

  const handleSelectedReview = (review) => {
    setSelectedReview(review);
  };

  const handleSelectedRole = (role) => {
    setRole(role);
  };

  const fetchGetAllReviews = async () => {
    try {
      setLoading(true);
      const response = await handleGetReviewsAndRatingsByRole(role);
      if (response.status === 200) {
        setReviews(response.data.data);
        setFilteredReviews(response.data.data); // Initialize filtered reviews with all reviews
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  } 

  // Fetch categories
  const fetchGetAllCategories = async () => {
    try {
      setLoading(true);
      const response = await handleGetAllCategories();
      if (response.status === 200) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(type === "edit"){
      setSelectedReview(reviews.find(review => review._id === selectedReview?._id));
    }
  }, [type, selectedReview, reviews]);

  const handleSetType = (type) => {
    setType(type);
  };

  // Fetch products
  const fetchGetAllProducts = async (category,sub_category) => {
    try {
      setLoading(true);
      const response = await handleGetAllProducts({category,sub_category});
      if (response.status === 200) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sub-categories
  const fetchGetAllSubCategories = async (id) => {
    try {
      setLoading(true);
      const response = await handleGetAllSubCategories({category: id});
      if (response.status === 200) {
        setSubCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching sub-categories:", error);
    } finally {
      setLoading(false);
    }
  };    

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleReviewPage = () => {
    setIsList(!isList);
    let status = !isList;
    if(status === false){
      setSelectedReview(null);
    }
  };

  const handleSearch = (event) => {
    console.log("event",event.target.value);
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = reviews.filter(review =>
      review.customerName.toLowerCase().includes(term)
    );
    setFilteredReviews(filtered);
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
              {activeTab === "clientReviews" || (
                <button
                  className="bg-[#2761E5] rounded-[10px] text-white px-5 py-2 flex items-center justify-center gap-1"
                  onClick={() => {handleSetType("create"); handleReviewPage()}}
                >
                  <CiCirclePlus />
                  Add New Review
                </button>
              )}
            </div>
            <div className="flex gap-[24px] h-10">
              <button
                className={`text-[16px] ${
                  activeTab === "yourReviews"
                    ? "border-b-3 border-[#434CE7] text-black"
                    : "text-black/50"
                }  font-semibold  `}
                onClick={() => {handleTabChange("yourReviews"); handleSelectedRole("admin")}}
              >
                Your Reviews
              </button>
              <button
                className={`text-[16px] ${
                  activeTab === "clientReviews"
                    ? "border-b-3 border-[#434CE7] text-black"
                    : "text-black/50"
                }  font-semibold`}
                onClick={() => {handleTabChange("clientReviews");handleSelectedRole('customer')}}
              >
                Client Reviews
              </button>
            </div>
           
          </div>

          <div className="w-full flex md:justify-end justify-center md:px-8 px-0 sticky z-30 top-28 bg-white ">
        <div className="flex mt-5 relative items-center justify-start">
          <FiSearch className="absolute top-3 left-5 text-[20px] text-[#667085]" />
          <input
            type="search"
            placeholder="Search by customer name"
            className=" border-2 pl-12 py-2 pr-5  border-[#D0D5DD] rounded-[10px]"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
          {activeTab === "yourReviews" && <YourReviews fetchData={fetchGetAllReviews} reviews={filteredReviews} handleSelectedReview={handleSelectedReview} handleReviewPage={handleReviewPage} type={type} handleSetType={handleSetType} activeTab={activeTab} />}
          {activeTab === "clientReviews" && (
            <ClientReviews fetchData={fetchGetAllReviews} reviews={filteredReviews} activeTab={activeTab} />
          )}
        </section>
      ) : (
        <AddReviews 
        type={type}
        selectedReview={selectedReview}
        categories={categories}
        products={products}
        fetchData={fetchGetAllReviews}
        subCategories={subCategories}
        fetchGetAllCategories={fetchGetAllCategories}
        fetchGetAllProducts={fetchGetAllProducts}
        fetchGetAllSubCategories={fetchGetAllSubCategories}
        handleReviewPage={handleReviewPage}
        />
      )}
    </Fragment>
  );
};
export default Index;
