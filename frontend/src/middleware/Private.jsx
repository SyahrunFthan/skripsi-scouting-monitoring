import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getItem, removeItem, removeTokenApi } from "../utils";

const isAuthenticated = async () => {
  const user = getItem("profile");
  const token = user?.token;

  if (token) {
    const decode = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decode.exp && decode.exp < currentTime) {
      await removeTokenApi(user?.userId);
      removeItem("profile");
      return false;
    }

    return true;
  }

  return false;
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [isAuthenticatedStatus, setIsAuthenticatedStatus] = useState(null); // Status autentikasi

  useEffect(() => {
    const checkAuthentication = async () => {
      const status = await isAuthenticated();
      setIsAuthenticatedStatus(status); // Set status autentikasi setelah pemeriksaan
    };

    checkAuthentication();
  }, [location]); // Menambahkan location ke dalam dependensi untuk memeriksa autentikasi saat path berubah

  if (isAuthenticatedStatus === null) {
    return null; // Jangan render apa-apa sampai status autentikasi diketahui
  }

  if (!isAuthenticatedStatus) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children; // Jika sudah login, tampilkan komponen anak
};

export default PrivateRoute;
