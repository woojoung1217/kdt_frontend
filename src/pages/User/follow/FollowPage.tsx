/** @jsxImportSource @emotion/react */
import AuthError from '@components/Auth/AuthError';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { handleValidation } from '@utils/validation/handleValidation';
import { useEffect, useState } from 'react';

const FOLLOW_URL = '/accounts/couple/';

const FollowSection = styled.section`
  height: calc(100svh - 2 * ${variables.layoutPadding});
  padding-top: 14rem;
  padding-bottom: 4rem;
  margin-bottom: -4rem;
  display: flex;
  flex-direction: column;
`;

const FollowPage = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>('');
  const [memberId, setMemberId] = useState<number | null>();
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    setMemberId(Number(localStorage.getItem('MemberId')));
    // setMemberId(12);

    setToken(localStorage.getItem('authToken'));
  }, []);

  const emailStatus = handleValidation('email', email);
  const isValid = emailStatus === 'valid';

  useEffect(() => {
    if (emailStatus === 'invalid') {
      setError('유효한 이메일을 입력해주세요.');
    } else {
      setError(null);
    }
  }, [emailStatus]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(token);
    console.log(memberId);

    const formData = {
      spouseEmail: email,
      memberId: memberId,
    };

    console.log(formData);

    try {
      const response = await fetch(FOLLOW_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };

  return (
    <FollowSection>
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin-bottom: 4.5rem;
          flex-shrink: 0;
        `}
      >
        <img src="/img/img-wish-follow.svg" alt="부부 연동" />
      </div>
      <div
        css={css`
          margin-bottom: 5rem;
          flex-shrink: 0;
        `}
      >
        <h2
          css={css`
            font-size: ${variables.size.max};
            font-weight: 600;
            margin-bottom: 1.4rem;
          `}
        >
          배우자를 등록해주세요.
        </h2>
        <p
          css={css`
            font-size: ${variables.size.big};
          `}
        >
          서로의 스트레스 지수를 파악하며 함께 노력해봐요!
        </p>
      </div>
      <form
        css={css`
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        `}
        onSubmit={handleSubmit}
      >
        <div
          css={css`
            flex-grow: 1;
          `}
        >
          <Input
            type="email"
            name="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="배우자의 가입/가입예정 이메일을 입력해주세요"
            status={emailStatus}
          />
          {error && <AuthError message={error} />}
        </div>
        <div>
          <Button type="submit" text="연동하기" size="large" disabled={!isValid} />
        </div>
      </form>
    </FollowSection>
  );
};

export default FollowPage;
