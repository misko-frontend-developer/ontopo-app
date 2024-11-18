const formatErrorMessage = (jsonString: string) =>
  jsonString?.startsWith('{"')
    ? JSON.parse(jsonString)?.response?.errors[0]?.message
    : jsonString;

export default formatErrorMessage;
