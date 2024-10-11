import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@nextui-org/react';
import { FiSave } from 'react-icons/fi';
import DragAndDropImage from '../Content/DragDropImage';
import { validateImageDimensions } from '../../lib/imageValidator';
import { FormateImageURL } from '../../lib/FormateImageURL';
import { handleCreateReviewAndRating, handleUpdateReviewAndRating } from '@/API/api';

const Media = ({ sectionData, handleReviewPage, fetchData, type }) => {
  const [formData, setFormData] = useState({media: null});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sectionData && sectionData.media) {
      setFormData({ media: sectionData.media });
    }
  }, [sectionData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.media) {
      toast.error("Please select an image.");
      return;
    }
    setLoading(true);
    try {
        let reponse ;
        if(type === "create" ){
             reponse = await handleCreateReviewAndRating(formData,true);
        }
        else if(type === "edit"){
            reponse = await handleUpdateReviewAndRating(sectionData._id,formData,true);
        }
        if(reponse.status >= 200 && reponse.status < 300    ){
            toast.success('Media updated successfully');
            handleReviewPage();
            fetchData();
            // handleSelectedReview(null);
        }
    } catch (error) {
      toast.error(error.message || "Error updating media");
    } finally {
      setLoading(false);
    }
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



  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:px-8 px-4 py-8 space-y-6"
    >
      <div className="w-full min-h-[60vh] flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <DragAndDropImage
            id="media"
            label="media"
            accept={`images/*`}
            width={487}
            height={410}
            onImageSelect={(file) => handleImageSelect(file, 487, 410, 'media')}
          />
          <div className="flex flex-col gap-3">
            <label
              htmlFor="file"
              className="md:text-[18px] text-[14px] gilroy-medium flex gap-1"
            >
              Uploaded File
            </label>
            {formData.media && (
              <img
                className="h-[150px] mx-auto object-cover w-[100%]"
                src={FormateImageURL(formData.media)}
                alt="Image Preview"
              />
            )}
          </div>
        </div>
      </div>

      {/* Save and cancel buttons */}
      <div className="w-full sticky bottom-0 py-3 bg-white z-20 flex justify-end gap-4">
        <Button
          onClick={handleReviewPage}
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
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default Media;