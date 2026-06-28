import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useFadeTransition() {
  const [exiting, setExiting] = useState(false);
  const navigate = useNavigate();

  const navigateWithFade = useCallback((to) => {
    setExiting(true);
    setTimeout(() => {
      navigate(to);
    }, 350); // match the fade-out duration
  }, [navigate]);

  return { exiting, navigateWithFade };
}