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

export function convertToFormData(data) {
  let formData = new FormData();

  // Function to recursively append data
  function appendFormData(formData, key, value) {
      if (value instanceof File) {
          formData.append(key, value);  // For file input
      } else if (typeof value === 'object' && value !== null) {
          // If the value is an object, recursively append each field
          Object.keys(value).forEach(subKey => {
              appendFormData(formData, `${key}.${subKey}`, value[subKey]);
          });
      } else {
          formData.append(key, value);  // For regular fields
      }
  }

  // Loop through the main object and append each field
  Object.keys(data).forEach(key => {
      appendFormData(formData, key, data[key]);
  });

  return formData;
}
