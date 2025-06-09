/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

const apiErrorMessage = (error: any, defaultMessage: string) => {
  try {
    if ("message" in error) return error.message || defaultMessage;

    if ("data" in error) {
      if (
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data &&
        typeof error.data.message === "string"
      ) {
        return error.data.message;
      }

      return defaultMessage;
    }

    return defaultMessage;
  } catch {
    return defaultMessage;
  }
};

export default function useApiMessage() {
  const showSuccessMessage = (message: string) => {
    toast.success(message);
  };

  const showErrorMessage = (error: any, message: string) => {
    toast.error(apiErrorMessage(error, message));
  };

  return {
    showSuccessMessage,
    showErrorMessage,
  };
}
