import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const useAuthRedirect = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(Boolean(token));
  }, []);

  if (isAuthenticated === null) {
    return null; // 인증 상태를 확인 중일 때 아무것도 렌더링하지 않음
  }

  if (!isAuthenticated) {
    return <Navigate to="/users/login" />;
  }

  return null; // 인증된 경우는 아무것도 반환하지 않음
};

export default useAuthRedirect;
