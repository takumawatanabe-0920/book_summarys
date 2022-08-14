import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalProvider } from '../frontend/hooks/context/Global';
import '../assets/stylesheets/main.scss';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import {
  PrivateRoute,
  GuestRoute,
  Header,
  Footer,
  TopHeader,
  Alert,
} from '../frontend/components';
const HomePage = lazy(() => import('../frontend/components/App'));
const SummaryCreatePage = lazy(
  () => import('../frontend/components/summary/Create'),
);
const SummaryEditPage = lazy(
  () => import('../frontend/components/summary/Edit'),
);
const SummaryShowPage = lazy(
  () => import('../frontend/components/summary/Show'),
);
const SignUpPage = lazy(() => import('../frontend/components/sign_up'));
const SignInPage = lazy(() => import('../frontend/components/sign_in'));
const MypageFavorites = lazy(
  () => import('../frontend/components/user/mypage/MypageFavorites'),
);
const MypageSummaries = lazy(
  () => import('../frontend/components/user/mypage/MypageSummaries'),
);
const MypageHome = lazy(
  () => import('../frontend/components/user/mypage/MypageHome'),
);
const MypageEdit = lazy(
  () => import('../frontend/components/user/mypage/MypageEdit'),
);
const UserDetailPage = lazy(
  () => import('../frontend/components/user/UserDetail'),
);
const SummaryPage = lazy(() => import('../frontend/components/summary'));

const root = createRoot(document.getElementById('root'));
root.render(
  <div>
    <GlobalProvider>
      <Router>
        <TopHeader />
        <Header />
        <div className="wrapper pt0">
          <div className="main-contents">
            <div className="lg-container">
              <Alert />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<div />}>
                      <HomePage />
                    </Suspense>
                  }
                />
                <Route
                  path="/summary/create"
                  element={
                    <PrivateRoute>
                      <Suspense fallback={<div />}>
                        <SummaryCreatePage />
                      </Suspense>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/summary/:id/edit"
                  element={
                    <PrivateRoute>
                      <Suspense fallback={<div />}>
                        <SummaryEditPage />
                      </Suspense>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/mypage/:id/home"
                  element={
                    <Suspense fallback={<div />}>
                      <MypageHome />
                    </Suspense>
                  }
                />
                <Route
                  path="/mypage/:id/edit"
                  element={
                    <PrivateRoute>
                      <Suspense fallback={<div />}>
                        <MypageEdit />
                      </Suspense>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/mypage/:id/favorites"
                  element={
                    <Suspense fallback={<div />}>
                      <MypageFavorites />
                    </Suspense>
                  }
                />
                <Route
                  path="/mypage/:id/favorites"
                  element={
                    <Suspense fallback={<div />}>
                      <MypageFavorites />
                    </Suspense>
                  }
                />
                <Route
                  path="/mypage/:id/summaries"
                  element={
                    <Suspense fallback={<div />}>
                      <MypageSummaries />
                    </Suspense>
                  }
                />
                <Route
                  path="/user/:id"
                  element={
                    <Suspense fallback={<div />}>
                      <UserDetailPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/summary/:id"
                  element={
                    <Suspense fallback={<div />}>
                      <SummaryShowPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/summary"
                  element={
                    <Suspense fallback={<div />}>
                      <SummaryPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/sign_up"
                  element={
                    <GuestRoute>
                      <Suspense fallback={<div />}>
                        <SignUpPage />
                      </Suspense>
                    </GuestRoute>
                  }
                />
                <Route
                  path="/sign_in"
                  element={
                    <GuestRoute>
                      <Suspense fallback={<div />}>
                        <SignInPage />
                      </Suspense>
                    </GuestRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
        <div className="extendedFooter">
          <Footer />
        </div>
      </Router>
    </GlobalProvider>
  </div>,
);
