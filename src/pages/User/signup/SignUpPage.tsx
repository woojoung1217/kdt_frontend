import React, { useState, useCallback } from 'react';
import ProfileSetup from '@components/Auth/ProfileSetup';
import GenericForm from '@components/common/GenericForm';
import { useFunnel } from '@hooks/useFunnel';
import PageTitleHeader from '@components/Auth/PageTitleHeader';
import SignupProgressBar from '@components/common/GenericProgressBar';
import { useNavigate } from 'react-router-dom';
import { determineGenderFromKoreanId } from '@utils/validation/handleValidation';
import axios from 'axios';

const steps = ['이름 입력', '주민등록번호 입력', '이메일 입력', '비밀번호 입력', '난임여부', '약관동의'];

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    identification: '',
    email: '',
    password: '',
    gender: '',
    subfertility: '',
    keywords: '',
  });

  const navigate = useNavigate();
  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);

  // 프로그레스바에 필요한 로직
  const totalSteps = steps.length;
  const currentStepIndex = steps.indexOf(currentStep);
  const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;

  const updateFormData = useCallback((field: string, value: string) => {
    setFormData((prevData) => {
      const newData = { ...prevData, [field]: value };

      if (field === 'identification') {
        const gender = determineGenderFromKoreanId(value);

        if (gender) {
          newData['gender'] = gender;
        } else {
          return prevData;
        }
      }

      console.log('Updated form data:', newData);
      return newData;
    });
  }, []);

  const submitSignup = useCallback(async () => {
    try {
      const response = await axios.post('/accounts/signup/', formData);

      if (response.status === 201) {
        // 성공적으로 생성되었을 때
        console.log('Signup successful:', response.data);
        navigate('/users/welcome'); // 성공 시 웰컴 페이지로 이동
      }
    } catch (error) {
      console.error('Signup failed:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  }, [formData, navigate]);

  const nextClickHandler = useCallback(
    (nextStep: string | null) => {
      if (nextStep) {
        setStep(nextStep);
      }
    },
    [setStep]
  );

  return (
    <>
      <GenericForm formOptions={{ mode: 'onChange' }} onSubmit={submitSignup}>
        <SignupProgressBar progress={progressPercentage} />
        <PageTitleHeader currentStep={currentStep} />
        <ProfileSetup
          steps={steps}
          nextClickHandler={nextClickHandler}
          Funnel={Funnel}
          Step={Step}
          formData={formData}
          updateFormData={updateFormData}
          submitSignup={submitSignup}
        />
      </GenericForm>
    </>
  );
};

export default SignUpPage;
