// hooks/useToast.js
import toast from 'react-hot-toast';

const useToast = () => {
  const showSuccess = (message) => {
    toast.success(message,{
        // icon: '⚠️',
        duration:2000
      });
  };

  const showError = (message) => {
    toast.error(message,{
        // icon: '⚠️',
        duration:2000
      });
  };

  const showWarning = (message) => {
    toast(message, {
      icon: '⚠️',
      duration:2000
    });
  };

  return { showSuccess, showError, showWarning };
};

export default useToast;
