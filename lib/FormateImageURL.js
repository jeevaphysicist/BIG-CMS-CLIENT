// import { OriginURL } from "./Constants";

export const FormateImageURL = (image) => {
  // console.log("image", image);
  if (image && image instanceof File) {
    const url = URL.createObjectURL(image);
    return url;
  }
  return image ? `${image.fileURL}` : null;
};
