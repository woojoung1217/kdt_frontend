import { useQuery } from '@tanstack/react-query';
// types/couple.ts
export interface Emotion {
  id: number;
  mission_content: string;
  is_complement: boolean;
  interest_keyword: string;
  self_message: string;
  export_message: string;
  joy: number;
  sadness: number;
  anger: number;
  fear: number;
  surprise: number;
  disgust: number;
  total: number;
  social: number;
  sexual: number;
  relational: number;
  refusing: number;
  essential: number;
  member_id: number;
}

export interface InfTest {
  id: number;
  total: number;
  social: number;
  sexual: number;
  relational: number;
  refusing: number;
  essential: number;
  belifs: string | null;
  created_at: string;
  member_id: number;
}

export interface CoupleDataResponse {
  success: boolean;
  result: {
    my_emotion: Emotion;
    my_inf_tests: InfTest[];
    spouse_emotion: Emotion | null;
    spouse_inf_tests: InfTest[];
  };
}

interface FetchCoupleDataError {
  message: string;
  status?: number;
}

const fetchCoupleData = async (): Promise<CoupleDataResponse> => {
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
  return useQuery<CoupleDataResponse, FetchCoupleDataError>({
    queryKey: ['coupleData', token],
    queryFn: () => fetchCoupleData(),
    enabled: !!token,
    staleTime: 1000 * 60 * 10, // 10분 동안 신선하게 유지
    refetchOnWindowFocus: false, // 창 포커스 시 새로고침 방지
    retry: 1, // 실패 시 재시도 횟수 제한
  });
};

// 컴포넌트에서 사용할 Props 타입들
export interface CoupleInformationProps {
  data: Emotion | null | undefined;
}

export interface OurReportProps {
  myEmotion: Emotion | null | undefined;
  spouseEmotion: Emotion | null | undefined;
}

export interface OurKeywordProps {
  data: Emotion | null | undefined;
}

export interface CoupleReportProps {
  myTests: InfTest[] | undefined;
  spouseTests: InfTest[] | undefined;
}
