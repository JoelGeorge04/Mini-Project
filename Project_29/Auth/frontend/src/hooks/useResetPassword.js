/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { useState } from "react";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (resetToken, password) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/auth/reset-password/${resetToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: resetToken, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleResetPassword,
  };
};

export default useResetPassword;
