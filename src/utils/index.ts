const formatErrorMessage = (jsonString: string) =>
  jsonString?.startsWith('{"')
    ? JSON.parse(jsonString)?.response?.errors[0]?.message
    : jsonString;

const formatDateTime = (data: string) => data.replace(/[-:]/g, "");

export { formatErrorMessage, formatDateTime };
