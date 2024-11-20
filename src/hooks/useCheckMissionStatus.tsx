import axios from 'axios';

const fetchMissionStatusWeekly = async (member_id: string) => {
  try {
    const response = await axios.get('https://www.wishkr.site/emotions/missions/', {
      params: { member_id },
    });

    // response.data가 undefined인지 체크
    if (!response.data) {
      console.error('응답 데이터가 없습니다');
      return null;
    }

    if (!response.data) {
      console.error('result 필드가 없습니다', response.data);
      return null;
    }

    console.log('주간 미션 현황', response.data);
    return response.data;
  } catch (error) {
    console.error('미션 상태 조회 중 에러 발생:', error);
    return null;
  }
};

export default fetchMissionStatusWeekly;
