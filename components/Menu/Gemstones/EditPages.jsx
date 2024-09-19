// /* eslint-disable react/prop-types */
// import { Button, Input, Tab, Tabs } from "@nextui-org/react";
// import { Fragment, useState } from "react";
// import RequiredSymbol from "@/components/Content/RequiredSymbol";

// import { toast } from "react-toastify";
// import { validateImageDimensions } from "@/lib/imageValidator";
// import { FiSave } from "react-icons/fi";
// import DragAndDropImage from "@/components/Content/DragDropImage";

// const EditPages = ({ handleGemstonePage }) => {
//   const [formData, setFormData] = useState({
//     media: "",
//   });
//   const [selectedCategory, setSelectedCategory] = useState("byBirthstone");

//   const [loading, setLoading] = useState(false);

//   const handleImageSelect = async (file, width, height, media) => {
//     try {
//       await validateImageDimensions(file, width, height);
//       if (file) {
//         setFormData((prevData) => ({ ...prevData, [media]: file }));
//       }
//     } catch (error) {
//       toast.error(error);
//     }
//   };

//   const handleVadilation = () => {
//     let newerrors = {};
//     let has = false;
//     if (formData.media === "" || formData.media === null) {
//       newerrors.media = "Image is required";
//       has = true;
//     }

//     setError(newerrors);
//     return has;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let validateResponse = handleVadilation();
//     console.log("validationresponse", validateResponse);
//     if (validateResponse) {
//       toast.error("Please fill required details correctly !");
//       return null;
//     }

//     // API Call Here

//     console.log("Form submitted with data:", formData);
//   };

//   return (
//     <Fragment>
//       <section className="h-full w-full">
//         <div className="w-full md:h-20  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 sticky top-0 z-30 bg-white justify-between">
//           <div className="flex md:flex-row flex-col gap-4 justify-between">
//             <div>
//               <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
//                 Edit Gemstone Submenu
//               </h2>
//               <p className="text-[#4A5367] md:text-[14px] text-[12px]">
//                 View and Edit the submenu details
//               </p>
//             </div>
//             <Tabs aria-label="Options">
//               <Tab key="published" title="Published"></Tab>
//               <Tab key="draft" title="Draft"></Tab>
//             </Tabs>
//           </div>
//         </div>
//         <div className="pt-2 no-scrollbar md:min-h-[75vh]">
//           <div className="flex items-start lg:pr-5  my-5 justify-between w-[100%] lg:flex-row flex-col">
//             <div className="w-[100%] md:px-8 px-4 space-y-6">
//               <div className="w-[100%] flex flex-col md:flex-row items-center gap-8">
//                 <div className="md:w-[50%] w-full flex flex-col gap-3">
//                   <label
//                     htmlFor="title"
//                     className=" text-[16px] font-medium flex gap-1"
//                   >
//                     Submenu Title
//                     <RequiredSymbol />{" "}
//                     {/* {errors.banner2 && (
//                   <span className="font-regular text-[12px] text-red-600">
//                     {errors.banner2}
//                   </span>
//                 )} */}
//                   </label>
//                   <Input
//                     type="text"
//                     minRows={4}
//                     id="title"
//                     variant="bordered"
//                     placeholder="Jan-Garnet"
//                     size="lg"
//                     radius="sm"
//                     name="title"
//                     // onChange={handleFormChange}
//                   />
//                   {/* {formData.banner2 && <img className="h-[150px] mx-auto w-[150px]" src={FormateImageURL(formData.banner2 )} alt="Image Preview" />} */}
//                 </div>
//                 <div className="md:w-[50%] w-full flex flex-col gap-3">
//                   <label
//                     htmlFor="category"
//                     className=" text-[16px] font-medium flex gap-1"
//                   >
//                     By Category
//                     <RequiredSymbol />{" "}
//                     {/* {errors.banner2 && (
//                   <span className="font-regular text-[12px] text-red-600">
//                     {errors.banner2}
//                   </span>
//                 )} */}
//                   </label>
//                   <select
//                     className=" h-[46px] rounded-[8px] border-2 border-[#D0D5DD] px-[10px] cursor-pointer"
//                     aria-label="Select section to edit"
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                   >
//                     <option value="byBirthstone">By Birthstone</option>
//                     <option value="byShape">By Shape</option>
//                     <option value="allGemstones">All Gemstones</option>
//                   </select>
//                   {/* {formData.banner2 && <img className="h-[150px] mx-auto w-[150px]" src={FormateImageURL(formData.banner2 )} alt="Image Preview" />} */}
//                 </div>
//               </div>
//               {selectedCategory === "allGemstones" || (
//                 <div className="w-full h-full md:flex md:flex-row-reverse gap-6">
//                   {/* Guideleines */}
//                   <div className="md:w-[50%] h-full pt-5 md:pt-10">
//                     <div className="rounded-[12px] border-2 p-2 md:p-3 flex items-center gap-4 sticky">
//                       <div className="w-[70%]">
//                         <h2 className="lg:text-[22px] text-[18px] font-semibold">
//                           Guidelines
//                         </h2>
//                         <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
//                           <p>
//                             Upload Square image with resolution of 264 x 264.
//                             make sure Gemstone touching all the corners
//                           </p>
//                         </div>
//                       </div>
//                       <div className="relative">
//                         <img
//                           src={"/images/gemstoneIcon.svg"}
//                           alt="icon"
//                           className="w-28"
//                         />
//                         <img
//                           src={"/images/image 25.png"}
//                           alt="icon"
//                           className="w-8 absolute top-[1.30rem] left-6 "
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="md:w-[50%] overflow-y-auto no-scrollbar mt-5 md:mt-0">
//                     <div className=" flex flex-col gap-4">
//                       <div className="flex flex-col gap-3">
//                         <label
//                           htmlFor="icon"
//                           className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
//                         >
//                           Icon
//                           <RequiredSymbol />
//                           {/* {errors.banner && (
//                           <span className="font-regular text-[12px] text-red-600">
//                             {errors.banner}
//                           </span>
//                         )} */}
//                         </label>
//                         <DragAndDropImage
//                           id="banner"
//                           label="banner"
//                           accept={`images/*`}
//                           width={264}
//                           height={264}
//                           // onImageSelect={handleImageSelect}
//                         />
//                         {/* {formData.banner && (
//                         <img
//                           className="h-[150px] mx-auto w-[150px]"
//                           src={FormateImageURL(formData.banner)}
//                           alt="Image Preview"
//                         />
//                       )} */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               <div className=" flex flex-col gap-3">
//                 <label
//                   htmlFor="link"
//                   className=" text-[16px] font-medium flex gap-1"
//                 >
//                   Page Link
//                   <RequiredSymbol />{" "}
//                   {/* {errors.banner2 && (
//                   <span className="font-regular text-[12px] text-red-600">
//                     {errors.banner2}
//                   </span>
//                 )} */}
//                 </label>
//                 <Input
//                   type="text"
//                   minRows={4}
//                   id="link"
//                   variant="bordered"
//                   placeholder="https://www.figma.com/design/Bi3Cq4"
//                   size="lg"
//                   radius="sm"
//                   name="link"
//                   // onChange={handleFormChange}
//                 />
//                 {/* {formData.banner2 && <img className="h-[150px] mx-auto w-[150px]" src={FormateImageURL(formData.banner2 )} alt="Image Preview" />} */}
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Save and cancel buttons */}
//         <div className="w-full  sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4 pr-5">
//           <Button
//             type="button"
//             onClick={handleGemstonePage}
//             variant="bordered"
//             className="font-semibold"
//           >
//             Back to list
//           </Button>
//           <Button
//             color="primary"
//             type="submit"
//             className="font-semibold text-white"
//             startContent={<FiSave size={20} />}
//           >
//             Save
//           </Button>
//         </div>
//       </section>
//     </Fragment>
//   );
// };
// export default EditPages;
