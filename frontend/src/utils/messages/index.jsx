import Swal from "sweetalert2";

export const showSuccess = (text, duration, action) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: text,
    showConfirmButton: false,
    timer: duration || 1500,
  });

  setTimeout(() => {
    if (typeof action === "function") {
      action();
    }
  }, duration || 1500);
};

export const showError = (text, duration) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "error",
    title: text,
    showConfirmButton: false,
    timer: duration || 1500,
  });
};

export const showConfirm = (title, text, textButton, action) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: textButton ? textButton : "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      if (typeof action === "function") {
        action();
      }
    }
  });
};
