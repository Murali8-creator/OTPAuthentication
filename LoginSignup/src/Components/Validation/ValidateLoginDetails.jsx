export const ValidateLoginDetails = async (email, password, setError, navigate) => {
  const data = { email, password };
  try {
    const response = await fetch('http://localhost:8080/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      setError('Invalid Credentials or network error');
      throw new Error('Network response was not ok');
    }

    
    const responseData = await response.json();
    navigate('/home');
  } catch (error) {
    setError('An error occurred during login')
  }
};
