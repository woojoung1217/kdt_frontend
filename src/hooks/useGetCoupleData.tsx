import { useQuery } from '@tanstack/react-query';
import { FetchCoupleDataError } from 'types/types';

const fetchCoupleData = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('/accounts/couple/data/', {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error: FetchCoupleDataError = new Error('HTTP Error');
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export const useGetCoupleData = (token: string) => {
  return useQuery({
    queryKey: ['coupleData', token],
    queryFn: () => fetchCoupleData(),
    enabled: !!token,
    staleTime: 1000 * 60 * 10, // 10분 동안 신선하게 유지
    refetchOnWindowFocus: false, // 창 포커스 시 새로고침 방지
    retry: 1, // 실패 시 재시도 횟수 제한
  });
};
