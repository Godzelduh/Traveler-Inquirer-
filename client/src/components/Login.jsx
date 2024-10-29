
const handleLogin = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('amadeusToken', data.token);
        localStorage.setItem('userId', data.userId);
        navigate('/account');
      }
    } catch (error) {
      // Handle error
    }
  };