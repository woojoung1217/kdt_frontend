import styled from '@emotion/styled';
import variables from '@styles/Variables';

interface EmotionData {
  interest_keyword: string;
}

interface CoupleData {
  result?: {
    my_emotion?: EmotionData;
    spouse_emotion?: EmotionData;
  };
}

interface OurKeywordProps {
  coupleData?: CoupleData | undefined;
}
const OurKeyword = ({ coupleData }: OurKeywordProps) => {
  const myKeyword = coupleData?.result?.my_emotion?.interest_keyword ?? '';
  const spouseKeyword = coupleData?.result?.spouse_emotion?.interest_keyword ?? '';

  const myKeywordArray = myKeyword.split('#').filter((keyword) => keyword.trim() !== '');
  const spouseKeywordArray = spouseKeyword.split('#').filter((keyword) => keyword.trim() !== '');

  return (
    <OurKeywordContainer>
      <OurKeywordTitle>우리의 관심사</OurKeywordTitle>
      <OurKeywordTitleDes>나의 통계와 배우자의 통계를 한눈에 확인할 수 있어요</OurKeywordTitleDes>
      <OurKeywordLineChartContainer>
        <OurKeywordDescription>우리의 관심사</OurKeywordDescription>
        <KeywordContainer>
          {[...myKeywordArray, ...spouseKeywordArray].map((keyword, index) => (
            <KeywordBox key={index}>#{keyword.trim()}</KeywordBox>
          ))}
        </KeywordContainer>
      </OurKeywordLineChartContainer>
    </OurKeywordContainer>
  );
};
export default OurKeyword;

const KeywordContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 3.5rem;
`;

const KeywordBox = styled.div`
  padding: 0.8rem 1.6rem;
  background-color: ${variables.colors.secondaryStrong};
  border-radius: 2rem;
  font-size: ${variables.size.small};
  color: ${variables.colors.gray10};
`;

const OurKeywordContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 7.6rem;
`;

const OurKeywordTitle = styled.h1`
  font-size: ${variables.size.large};
  font-weight: 600;
`;

const OurKeywordTitleDes = styled.p`
  margin-top: 1rem;
  color: ${variables.colors.gray70};
  font-size: ${variables.size.medium};
`;

const OurKeywordLineChartContainer = styled.div`
  width: 100%;
  height: 20rem;
  border: 1px solid ${variables.colors.gray50};
  border-radius: ${variables.borderRadius};
  margin-top: 4.2rem;
  padding: 0 1.3rem;
`;

const OurKeywordDescription = styled.p`
  margin-top: 1.8rem;
  font-weight: 600;
  font-size: ${variables.size.medium};
  color: ${variables.colors.gray70};
`;
