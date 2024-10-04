import { validateImageDimensions } from "@/lib/imageValidator";
import { useEffect, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { FormateImageURL } from "@/lib/FormateImageURL";
import { Button } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { handleCreateSitepage, handleUpdateSitepage } from "@/API/api";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";

const Media = ({
  handleSitepage,
  sectionData,
  fetchData,
  currentSection,
  handler,
  type
}) => {
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    banner: "",
  });

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

    if (formData.banner === "" || formData.banner === null) {
      newerrors.banner = "Image is required";
      has = true;
    }

    setError(newerrors);
    return has;
  };
  // console.log("Section Data",sectionData);

  useEffect(() => {
    if (sectionData) {
      setFormData({
        ...formData,
        banner: sectionData?.media?.banner || ""
      });
    }
  }, [sectionData]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    // console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    let bodyData = {
      media: formData,
    };

  let response ; 
  
  try {
    setLoading(true);
    bodyData = convertObjectToFormData(bodyData);

    if(type === 'create'){
    response = await handleCreateSitepage(bodyData,true);      
    }
    else if(type === 'edit'){
    response = await handleUpdateSitepage(bodyData,sectionData._id,true); 
    }
  // console.log("response",response);
  if (response.status >= 200 && response.status <= 209) {
    let data = response.data;
    toast.success(response.data.message);
    fetchData();
    handleSitepage();
    handler();
  }
  else{
    toast.error(response.response.data.message);
  }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
  };

  // console.log("form data",formData);
  // console.log("section data",sectionData);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full md:px-8 px-4 py-8  space-y-6"
      >
        <div className="w-full min-h-[60vh] flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <DragAndDropImage
              id="banner"
              label="banner"
              accept={`images/*`}
              width={487}
              height={410}
              onImageSelect={handleImageSelect}
            />
           
            <div className="flex flex-col gap-3">
              <label
                htmlFor="file"
                className="md:text-[18px] text-[14px] gilroy-medium flex gap-1"
              >
                Uploaded File
              </label>
            </div>
            {formData.banner && (
              <img
                className=" mx-auto w-[150px]"
                src={FormateImageURL(formData.banner)}
                alt="Image Preview"
              />
            )}
          </div>
        </div>

        {/* Save and cancel buttons */}
        <div className="w-full sticky bottom-0 py-3 bg-white z-20 flex justify-end gap-4">
          <Button
            onClick={handleSitepage}
            variant="bordered"
            className="font-semibold"
          >
            Back to list
          </Button>
          <Button
            type="submit"
            color="primary"
            className="font-semibold text-white"
            isLoading={loading}
            startContent={loading ?null:<FiSave size={20} />}
            // onClick={handler}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Media;
