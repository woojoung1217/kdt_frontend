/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import prevIcon from '/img/icon-page-prev.svg';
import { useNavigate } from 'react-router-dom';

interface TitleProps {
  titleText: string; // 페이지 타이틀 텍스트
  isFixed: boolean; //타이틀 고정 여부
  textAlign: string; // 타이틀 위치
  pageBack: boolean; // 페이지 뒤로가기 버튼 필요 여부
  backcolor?: string; // 배경 색상
  children?: React.ReactNode;
  customStyles?: ReturnType<typeof css>;
}

const PageTitle = ({
  titleText,
  isFixed = true,
  textAlign = 'center',
  pageBack = false,
  backcolor = `${variables.colors.white}`,
  children,
  customStyles,
}: TitleProps) => {
  const navigate = useNavigate();

  const Styles = css`
    ${
      isFixed &&
      ` position: fixed;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      max-width: 50rem;
      width: 100%;
      z-index:50;
      box-shadow: 0 0 1.25rem rgba(217, 217, 217, 0.5);`
    }

    background-color: ${backcolor};
    padding: .5rem 1.8rem 1rem;
    display: flex;
    align-items: center;


    & h2 {
      line-height: 4rem;
      font-size: ${variables.size.large};
      font-weight: 700;
      flex-grow: 1;
      text-align: ${textAlign};
      ${pageBack && ` margin-right: 5rem;`}
      ${children && `margin-left: 4.7rem;`}
    }

    ${
      pageBack &&
      `.prev {
      display: block;
      background-image: url(${prevIcon});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cotain;
      width: 5rem;
      height: 4rem;`
    }
    }
  `;

  return (
    <div css={[Styles, customStyles]}>
      {pageBack && (
        <button className="prev" type="button" onClick={() => navigate(-1)}>
          <span className="hidden">뒤로가기</span>
        </button>
      )}
      <h2>{titleText}</h2>
      <div>{children}</div>
    </div>
  );
};

export default PageTitle;
