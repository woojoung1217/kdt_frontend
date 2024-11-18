import styled from '@emotion/styled';
import variables from '@styles/Variables';

export const MissionSection = styled.section`
  height: 100vh;
  margin: calc(-1 * ${variables.layoutPadding});
  padding: ${variables.layoutPadding};
  margin-bottom: -4rem;
  padding-bottom: 4rem;
  background-color: ${variables.colors.gray5};
  display: flex;
  flex-direction: column;

  & > .resultButton {
    flex-shrink: 0;
  }
`;

export const MissionTitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
  margin-top: 10rem;
`;

export const MissionTextBox = styled.div`
  margin-left: 2rem;
`;

export const MissonTitle = styled.div`
  font-size: ${variables.size.big};
  font-weight: 600;
`;

export const MissonTitleSub = styled.div`
  font-size: ${variables.size.medium};
  color: ${variables.colors.gray100};
  margin-top: 0.5rem;
  font-weight: 400;
`;

export const ImageContainer = styled.div`
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  width: 4.8rem;
  height: 4.8rem;
  background-color: ${variables.colors.secondarySoft};
  position: relative;
`;

export const WishImage = styled.img`
  position: absolute;
  width: 5rem;
  height: 5rem;
`;

export const ButtonContainer = styled.div`
  min-width: 100%;
  max-width: 100%;

  & > button {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    border: 0.1rem solid ${variables.colors.gray10};
    box-shadow: 0px 0px 6px rgba(217, 203, 245, 0.5);
    padding: 2rem 3rem;
    border-radius: 2rem;
    font-size: ${variables.size.big};
    color: ${variables.colors.gray100};
    font-weight: 500;
    transition: all ${variables.TransitionDuration};
    margin-bottom: 2rem;

    &:hover,
    &:focus {
      border: 0.1rem solid ${variables.colors.primaryStrong};
      color: ${variables.colors.black};
      box-shadow: 0px 0px 6px rgba(217, 203, 245, 1);
    }
  }
`;

export const MissionExplanation = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  height: calc(100vh - 5.6rem);
  margin-bottom: 3rem;
  color: ${variables.colors.gray100};
  font-weight: 400;
`;
