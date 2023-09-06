function objectToFormData(obj) {
  const formData = new FormData();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        // Convert the array to a JSON string
        formData.append(key, JSON.stringify(obj[key]));
      } else {
        formData.append(key, obj[key]);
      }
    }
  }

  return formData;
}
export default objectToFormData