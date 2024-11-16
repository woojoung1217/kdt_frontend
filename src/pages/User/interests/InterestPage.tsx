/** @jsxImportSource @emotion/react */
import Button from '@components/common/Button';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { css } from '@emotion/react';
import InterestItem from './InterestItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INTERESTS_URL = '/emotions/interests/';

const InterestSection = styled.section`
  height: calc(100svh - 2 * ${variables.layoutPadding});
  padding-top: 7.2rem;
  padding-bottom: 4rem;
  margin-bottom: -4rem;
  display: flex;
  flex-direction: column;
`;

const InterestPage = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [memberId, setMemberId] = useState<number | null>();
  const navigate = useNavigate();

  useEffect(() => {
    setMemberId(Number(localStorage.getItem('MemberId')));
  }, []);

  useEffect(() => {
    if (keywords.length > 0) setDisabled(false);
    else setDisabled(true);
  }, [keywords]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const interests = keywords.map((keyword) => `#${keyword}`).join(' ');

    const formData = {
      interests,
      member_id: memberId,
    };

    console.log(formData);

    try {
      const response = await fetch(INTERESTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response);
      const data = await response.json();
      console.log(data);

      if (response.status === 201) {
        alert('관심사가 등록되었습니다!');
        navigate('/');
      } else {
        throw new Error(data.error);
      }
    } catch (e) {
      if (e instanceof Error) alert(e.message);
    }
  };

  return (
    <InterestSection>
      <div
        css={css`
          margin-bottom: 6rem;
          flex-shrink: 0;
        `}
      >
        <h2
          css={css`
            font-size: ${variables.size.max};
            font-weight: 600;
            margin-bottom: 3rem;
          `}
        >
          관심사를 3개 이상 선택해주세요.
        </h2>
        <p
          css={css`
            font-size: ${variables.size.big};
          `}
        >
          선택하신 관심사 기반으로 스트레스 관리를 도와드려요.
        </p>
      </div>
      <div
        css={css`
          width: 48.2rem;
          height: 26rem;
          margin-left: -7.3rem;
          margin-right: 4rem;
          margin-bottom: 4rem;
          flex-shrink: 0;
        `}
      >
        <img src="/img/img-wish-interest.svg" alt="관심사 등록" />
      </div>
      <form
        onSubmit={handleSubmit}
        css={css`
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(5, minmax(6rem, auto));
            grid-template-rows: repeat(4, 3rem);
            align-items: center;
            column-gap: 1rem;
            row-gap: 1rem;
          `}
        >
          <InterestItem id="gym" text="헬스" setKeyword={setKeywords} />
          <InterestItem id="yoga" text="요가" setKeyword={setKeywords} />
          <InterestItem id="running" text="러닝" setKeyword={setKeywords} />
          <InterestItem id="swimming" text="수영" setKeyword={setKeywords} />
          <InterestItem id="hiking" text="등산" setKeyword={setKeywords} />
          <InterestItem id="home-training" text="홈트" setKeyword={setKeywords} />
          <InterestItem id="domestic-trip" text="국내 여행" setKeyword={setKeywords} />
          <InterestItem id="overseas-trip" text="해외 여행" setKeyword={setKeywords} />
          <InterestItem id="healing" text="힐링" setKeyword={setKeywords} />
          <InterestItem id="camping" text="캠핑" setKeyword={setKeywords} />
          <InterestItem id="rest" text="휴양" setKeyword={setKeywords} />
          <InterestItem id="restaurant" text="레스토랑" setKeyword={setKeywords} />
          <InterestItem id="cafe" text="카페" setKeyword={setKeywords} />
          <InterestItem id="walk" text="산책" setKeyword={setKeywords} />
          <InterestItem id="cinema" text="영화" setKeyword={setKeywords} />
          <InterestItem id="park" text="공원" setKeyword={setKeywords} />
          <InterestItem id="amusement" text="놀이공원" setKeyword={setKeywords} />
          <InterestItem id="shopping" text="쇼핑" setKeyword={setKeywords} />
          <InterestItem id="ott" text="OTT 시청" setKeyword={setKeywords} />
        </div>
        <div
          css={css`
            margin-top: auto;
          `}
        >
          <Button type="submit" text="선택완료" size="large" disabled={isDisabled} />
        </div>
      </form>
    </InterestSection>
  );
};

export default InterestPage;
