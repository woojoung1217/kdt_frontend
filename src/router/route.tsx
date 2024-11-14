import { Navigate, createBrowserRouter } from 'react-router-dom';

import Layout from '@components/layout/Layout';
import Home from '@pages/Home/Home';
import LoginPage from '@pages/User/login/LoginPage';
import SignUpPage from '@pages/User/signup/SignUpPage';
import Counseling from '@pages/counseling/Counseling';
import CounselingList from '@pages/counseling/CounselingList';
import Testing from '@pages/scale/Testing';
import ScaleResult from '@pages/scale/ScaleResult';
import EmotionMessage from '@pages/emotion/message/EmotionMessage';
import EmotionRecordPage from '@pages/emotion/record/EmotionRecordPage';
import WelcomePage from '@pages/User/welcome/WelcomePage';
import ScaleList from '@pages/scale/ScaleList';
import EmotionMission from '@pages/emotion/mission/EmotionMission';
import EmotionResult from '@pages/emotion/result/EmotionResult';
import FollowPage from '@pages/User/follow/FollowPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'users/login',
        element: <LoginPage />,
      },
      {
        path: 'users/signup',
        element: <SignUpPage />,
      },
      {
        path: 'users/welcome',
        element: <WelcomePage />,
      },
      {
        path: 'users/follow',
        element: <FollowPage />,
      },
      {
        path: 'counseling',
        element: <Counseling />,
      },
      {
        path: '/scale/list',
        element: <ScaleList />,
      },
      {
        path: 'counseling/:id',
        element: <Counseling />,
      },
      {
        path: 'counseling/list',
        element: <CounselingList />,
      },
      {
        path: '/scale/testing',
        element: <Testing />,
      },
      {
        path: '/scale/result',
        element: <ScaleResult />,
      },
      {
        path: 'emotion/record',
        element: <EmotionRecordPage />,
      },
      {
        path: 'emotion/message',
        element: <EmotionMessage />,
      },
      {
        path: 'emotion/mission',
        element: <EmotionMission />,
      },
      {
        path: 'emotion/result',
        element: <EmotionResult />,
      },
    ],
  },
]);

export default router;
