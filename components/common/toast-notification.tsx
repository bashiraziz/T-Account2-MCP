import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastNotification = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      // hideProgressBar={true}
      closeOnClick={true}
      pauseOnHover
      draggable
      theme="colored"
      icon={false}
    />
  );
};

// Utility functions for showing toasts
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    style: {
      width: "fit-content",
      minWidth: "220px",
      backgroundColor: "#00ac47",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "500",
      padding: "16px 28px 16px 16px",
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    style: {
      width: "fit-content",
      minWidth: "220px",
      backgroundColor: "#ef4444",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "500",
      padding: "16px 28px 16px 16px",
    },
  });
};
