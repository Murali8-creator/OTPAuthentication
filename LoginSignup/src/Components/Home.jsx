import React, { useState, useEffect } from 'react';

export const Home = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/home');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {responseData ? (
        <pre>{JSON.stringify(responseData, null, 2)}</pre>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
