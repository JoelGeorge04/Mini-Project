/* eslint-disable no-useless-catch */
import { useState } from "react";

const useForgotPassword = () => {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send reset link");
            }
            return data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        username,
        setUsername,
        loading,
        handleSubmit,
    };
};

export default useForgotPassword;
