import { FC, Suspense } from 'react';
import { observer } from 'mobx-react';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Spinner } from '../components-library/Spinner';
import Blogs from './Blogs';
import Article from './Article';

const AboutMe = React.lazy(() => import('./AboutMe'));
const ArticlesSearch = React.lazy(() => import('./ArticlesSearch'));

export const Content: FC = observer(() => {
  return (
    <main className="min-vh-100 p-lg-4 p-2 pb-4 mt-lg-0 mt-4 d-flex flex-column align-items-center w-100">
      <Routes>
        <Route path="/blogs/page/:pageNumber" element={<Blogs />} />
        <Route
          path="/articles"
          element={
            <Suspense fallback={<Spinner />}>
              <ArticlesSearch />
            </Suspense>
          }
        />
        <Route path="/article/:articleId" element={<Article />} />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Spinner />}>
              <AboutMe />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/blogs/page/0" replace />} />
      </Routes>
    </main>
  );
});
