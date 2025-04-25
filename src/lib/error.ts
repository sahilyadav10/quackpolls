export const formatError = (error: any) => {
  const errorMessage = error?.response?.data?.message;

  if (errorMessage) return errorMessage;
  return error?.message || "Something went wrong!";
};
