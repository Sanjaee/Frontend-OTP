import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // atau localStorage tergantung tempat penyimpanan token

export const useLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt");
     console.log(`Token: ${token}`);
    if (!token) {
      // Jika token tidak ada, redirect ke halaman login
      navigate("/");
    }
  }, [navigate]);
};


