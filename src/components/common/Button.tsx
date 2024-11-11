/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';

type ButtonVariant = 'primary' | 'secondary' | 'non' | 'success' | 'gray';

interface ButtonProps {
  text: string; // 버튼 이름
  variant?: ButtonVariant; // 버튼의 색상이나 추가 스타일
  disabled?: boolean; // 비활성화 상태를 위한 옵션
  onClick?: () => void; // 클릭 핸들러
  type?: 'button' | 'submit' | 'reset'; // 버튼의 타입
  size: 'small' | 'medium' | 'large'; // 버튼 크기
  fixed?: boolean; // 버튼을 화면 하단에 고정할지 여부
}

const Button = ({
  text,
  variant = 'primary',
  disabled = true,
  type = 'button',
  onClick,
  size = 'large',
  fixed = false,
}: ButtonProps) => {
  // 각 버튼 크기에 따른 스타일 정의
  const sizeStyles = {
    small: css`
      font-size: 1.4rem;
    `,
    medium: css`
      font-size: 1.6rem;
      height: 4.6rem;
    `,
    large: css`
      font-size: 1.8rem;
      height: 5.6rem;
    `,
  };

  const styles = css`
    border: none;
    border-radius: 0.8rem;
    color: white;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    ${sizeStyles[size]} // 선택한 크기 스타일 적용

    ${variant === 'primary' &&
    `
      background-color: #CCB2FF;
    `}
    ${variant === 'secondary' &&
    `
      background-color: #6c757d;
    `}
    ${variant === 'gray' &&
    `
      background-color: ${variables.colors.gray70};
    `}
    ${variant === 'non' &&
    `
      
    `}
    ${variant === 'success' &&
    `
      background-color: #28a745;
    `}

    ${disabled &&
    `
      background-color: #D9D9D9;
      cursor: not-allowed;
    `}

    ${fixed &&
    `
      position: fixed;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 2 * ${variables.layoutPadding}); /* 고정된 버튼이 전체 화면을 벗어나지 않도록 너비 자동 조정 */
      max-width: calc(500px - 2 * ${variables.layoutPadding});
      z-index: 1000;
    `}
  `;

  return (
    <button css={styles} disabled={disabled} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
