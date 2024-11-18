/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@components/common/Button';
import React, { useState, useEffect } from 'react';
import variables from '@styles/Variables';
import styled from '@emotion/styled';
import AuthError from './AuthError';

interface SetupKoreanIDInputProps {
  onNext: () => void;
  value: string; // 주민등록번호 전체를 받을 prop
  onChange: (value: string) => void; // 상위 컴포넌트에 전달할 콜백
}

interface IdNumber {
  firstPart: string;
  secondPart: string;
}

const SetupKoreanIDInput = ({ onNext, value, onChange }: SetupKoreanIDInputProps) => {
  const [idNumber, setIdNumber] = useState<IdNumber>({ firstPart: '', secondPart: '' });
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parts = value.split('-');
    setIdNumber({
      firstPart: parts[0] || '',
      secondPart: parts[1] || '',
    });
  }, [value]);

  useEffect(() => {
    validateIdNumber();
  }, [idNumber]);

  /** 생년월일 유효성 검사 */
  const isDateValid = (dateString: string): boolean => {
    if (dateString.length !== 6) return false;

    const year = parseInt(dateString.substring(0, 2), 10);
    const month = parseInt(dateString.substring(2, 4), 10);
    const day = parseInt(dateString.substring(4, 6), 10);

    // 임시로 1900~2099년 범위 적용
    const fullYear = year >= 0 && year <= 99 ? (year < 30 ? 2000 + year : 1900 + year) : year;
    const date = new Date(fullYear, month - 1, day);

    // 날짜 유효성 확인
    return date.getFullYear() === fullYear && date.getMonth() === month - 1 && date.getDate() === day;
  };

  /** 주민등록번호 검증 */
  const validateIdNumber = () => {
    const isFirstPartValid =
      idNumber.firstPart.length === 6 && /^\d+$/.test(idNumber.firstPart) && isDateValid(idNumber.firstPart);
    const isSecondPartValid = ['1', '2', '3', '4'].includes(idNumber.secondPart);

    setIsValid(isFirstPartValid && isSecondPartValid);

    // 오류 메시지 설정
    if (!isFirstPartValid && idNumber.firstPart !== '') {
      setError('유효한 생년월일을 입력해주세요 (YYMMDD 형식)');
    } else if (!isSecondPartValid && idNumber.secondPart !== '') {
      setError('주민등록번호 뒷자리를 확인 해 주세요');
    } else {
      setError(null); // 오류 없으면 메시지 초기화
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIdNumber((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (isValid) {
      const newIdNumber = `${idNumber.firstPart}-${idNumber.secondPart}`;
      onChange(newIdNumber); // 상위 컴포넌트로 주민등록번호 전달
      onNext(); // 다음 단계로 진행
    }
  };

  return (
    <div css={containerStyle}>
      <div css={inputSeperater}>
        <input
          css={inputStyle}
          type="text"
          name="firstPart"
          value={idNumber.firstPart}
          onChange={handleInputChange}
          maxLength={6}
          placeholder="000616"
        />
        <Divider />
        <input
          css={inputStyleSmall}
          type="text"
          name="secondPart"
          value={idNumber.secondPart}
          onChange={handleInputChange}
          maxLength={1}
          placeholder="4"
        />
        <div css={circlesContainerStyle}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} css={circleStyle}></div>
          ))}
        </div>
      </div>
      {error && <AuthError message={error} />} {/* 에러 메시지 표시 */}
      <Button onClick={handleNext} text="다음" type="submit" size="large" disabled={!isValid} fixed={true} />
    </div>
  );
};

const Divider = styled.div`
  font-size: ${variables.size.max};
  width: 1.6rem;
  height: 0.1rem;
  margin-top: 3rem;
  background-color: ${variables.colors.gray50};
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
`;

const inputSeperater = css`
  display: flex;
  gap: 1rem;
`;

const inputStyle = css`
  border: 1px solid #ccc;
  border-radius: ${variables.borderRadius};
  width: 17rem !important;
  font-size: ${variables.size.large} !important;

  &:focus {
    border-color: ${variables.colors.primary};
    outline: none;
  }

  &::placeholder {
    color: #aaa;
    font-size: ${variables.size.large};
  }
`;

const inputStyleSmall = css`
  border: 1px solid #ccc;
  border-radius: ${variables.borderRadius};
  width: 4.8rem !important;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${variables.size.large} !important;

  &:focus {
    border-color: ${variables.colors.primary};
    outline: none;
  }

  &::placeholder {
    color: #aaa;
    font-size: ${variables.size.large};
  }
`;

const circlesContainerStyle = css`
  display: flex;
  gap: 0.3rem;
  align-items: center;
`;

const circleStyle = css`
  width: 1.6rem;
  height: 1.6rem;
  background-color: ${variables.colors.gray50};
  border-radius: 50%;
`;

export default SetupKoreanIDInput;
