import { toast, Slide } from 'react-toastify';

const toastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  transition: Slide,
};

const errorOptions = {
  position: 'top-right',
  autoClose: false,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  transition: Slide,
};

// eslint-disable-next-line import/prefer-default-export
export const appToast = {
  error: (message) => {
    toast.error(message, errorOptions);
  },
  dark: (message) => {
    toast.dark(message, toastOptions);
  },
};