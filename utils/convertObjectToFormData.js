export function convertObjectToFormData(
  data,
  formData = new FormData(),
  parentKey = ""
) {
  for (const key in data) {
    // Check if the data has the key (to avoid inherited properties)
    if (data.hasOwnProperty(key)) {
      // Create a key for nested objects (e.g., contents[bannerOneTitle])
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;

      // Check if the value is an object and not a File
      if (typeof data[key] === "object" && !(data[key] instanceof File)) {
        // If the value is another nested object, call the function recursively
        convertObjectToFormData(data[key], formData, fullKey);
      } else {
        // Append other types of data (File, String, Boolean, etc.) directly
        formData.append(fullKey, data[key] !== null ? data[key] : "");
      }
    }
  }
  return formData;
}
