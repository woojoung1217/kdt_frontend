import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// API 호출 함수 분리
const fetchCoupleInfo = async (memberId: string) => {
  const response = await axios.get('/accounts/couple', {
    params: { memberId },
  });
  console.log(response.data.result);
  return response.data.result;
};

export const useCoupleInfo = () => {
  const myName = localStorage.getItem('userName');
  const gender = localStorage.getItem('Gender');
  const MemberId = localStorage.getItem('MemberId');
  const isConnected = localStorage.getItem('connect');

  const { data, isLoading, error } = useQuery({
    queryKey: ['coupleInfo', MemberId],
    queryFn: () => fetchCoupleInfo(MemberId as string),
    enabled: isConnected === 'false', // isConnected가 true일 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 fresh하게 유지
  });

  return {
    partnerName: data?.spouseInfo?.name,
    isLoading,
    error,
    myName,
    gender,
    isConnected,
  };
};
