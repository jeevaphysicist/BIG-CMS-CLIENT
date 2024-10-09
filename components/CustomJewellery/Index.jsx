"use client";
import { Fragment, useEffect, useState } from "react";
import EditSections from "./EditSections";
import ResponsiveTable from "./ResponsiveTable";
import { handleGetCustomJewelryList } from "@/API/api";

const initialData = [
  {
    id: 1,
    name: "Custom Jewelry",
    status: "Active",
  },

  // ... more data
];

const Index = () => {
  const [customJewelry, setCustomJewelry] = useState([]);
  const [isTable, setIsTable] = useState(true);
  const [selectEditData, setSelectEditData] = useState({});

  const handleCustomJeweleryPage = () => {
    setIsTable(!isTable);
    let status = !isTable;
    if (status === false) {
      setSelectEditData({});
    }
  };

  useEffect(() => {
    fetchCustomJewelryList();
  }, []);

  useEffect(() => {
    setSelectEditData(
      customJewelry.find((item) => item._id === selectEditData?._id)
    );
  }, [customJewelry]);

  const fetchCustomJewelryList = async () => {
    try {
      const response = await handleGetCustomJewelryList();
      if (response.status >= 200 && response.status <= 209) {
        setCustomJewelry(response.data);
      } else {
        setCustomJewelry([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetEditData = (editdata) => {
    setSelectEditData(editdata);
  };

  return (
    <Fragment>
      {isTable ? (
        <div className=" p-5 no-scrollbar">
          <h2 className="font-semibold text-black text-[20px]">
            Customize Jewelry
          </h2>
          <p className="text-[#4A5367] font-regular text-[16px] mb-8">
            Edit Your Custom Jewelry page
          </p>

          <div className="w-[100%] overflow-x-auto rounded-[10px] border no-scrollbar ">
            <ResponsiveTable
              handleCustomJeweleryPage={handleCustomJeweleryPage}
              initialData={customJewelry}
              handleSetEditData={handleSetEditData}
              fetchData={fetchCustomJewelryList}
            />
          </div>
        </div>
      ) : (
        <EditSections
          fetchData={fetchCustomJewelryList}
          editData={selectEditData}
          handleCustomJeweleryPage={handleCustomJeweleryPage}
        />
      )}
    </Fragment>
  );
};

export default Index;
