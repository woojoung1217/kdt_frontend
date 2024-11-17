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
