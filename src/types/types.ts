interface ICommonResponse {
  success: boolean;
}

export interface IFailure extends ICommonResponse {
  message: string;
  result: unknown[];
}

// 난임척도검사결과 response 타입
export interface ITest {
  id: number;
  total: number;
  social: number;
  sexual: number;
  relational: number;
  refusing: number;
  essential: number;
  belifs: string;
  created_at: string;
  member_id: number;
}

export interface ITestRecordSuccess extends ICommonResponse {
  result: {
    totalTests: ITest[];
  };
}

// 관심사 response 타입
export interface IInterests {
  id: number;
  interests: string;
  created_at: string;
  member_id: number;
}

export interface IInterestSuccess extends ICommonResponse {
  result: IInterests[];
}
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
  result?: {
    my_emotion: Emotion;
    my_inf_tests: InfTest[];
    spouse_emotion: Emotion | null;
    spouse_inf_tests: InfTest[];
  };
}

export interface FetchCoupleDataError {
  message: string;
  status?: number;
}
