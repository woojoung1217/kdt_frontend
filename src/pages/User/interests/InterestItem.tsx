import styled from '@emotion/styled';
import variables from '@styles/Variables';

const Item = styled.div`
  & > input {
    display: none;
  }

  & > label {
    height: 3rem;
    padding: 0.4rem 1.4rem;
    border: 0.1rem solid ${variables.colors.gray50};
    border-radius: 1.5rem;
    color: ${variables.colors.gray50};

    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: nowrap;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > input:checked + label {
    border: 0.1rem solid ${variables.colors.primaryStrong};
    color: ${variables.colors.primaryStrong};
  }
`;

const InterestItem = ({
  id,
  text,
  setKeyword,
}: {
  id: string;
  text: string;
  setKeyword: (func: (prevKeywords: string[]) => string[]) => void;
}) => {
  // setKeywords 추가하기
  // keyword가 이미 있으면 배열에서 제거, 없으면 추가

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword((prevKeywords) => {
      if (e.target.checked) {
        return [...prevKeywords, text];
      } else {
        return prevKeywords.filter((keyword) => keyword !== text);
      }
    });
  };

  return (
    <Item>
      <input type="checkbox" id={id} name={id} onChange={handleChange} />
      <label htmlFor={id}>{text}</label>
    </Item>
  );
};

export default InterestItem;
