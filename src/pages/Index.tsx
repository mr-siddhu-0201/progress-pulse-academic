
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('syllabusSync_user');
    if (userData) {
      // User is logged in, redirect to dashboard
      navigate('/dashboard');
    } else {
      // User is not logged in, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default Index;
