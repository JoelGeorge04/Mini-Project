// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ValidateResetToken = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`/api/auth/reset-password/${token}`, {
          method: 'GET',
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
          setError('');
        } else {
          setError(data.error);
          setMessage('');
        }
      } catch (err) {
        console.error("Token Validation Error:", err);
        setError("An error occurred, please try again.");
        setMessage('');
      }
    };

    validateToken();
  }, [token]);

  return (
    <div>
      <h1>Validate Reset Token</h1>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ValidateResetToken;
