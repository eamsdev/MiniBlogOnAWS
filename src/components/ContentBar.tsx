import { FC } from 'react';
import { Separator } from './Profile';
import { observer } from 'mobx-react';
import { rootStore } from '../stores/RootStore';
import { useNavigate } from 'react-router-dom';

export const ContentBar: FC = observer(() => {
  return (
    <aside className="aside-secondary p-0 text-white min-vh-100 d-none d-xl-block">
      <div className="vstack gap-0 p-3">
        <ByTags />
        <Separator />
        <ByMonths />
        <Separator />
        <ByArticles />
      </div>
    </aside>
  );
});

const ByTags: FC = observer(() => {
  const navigate = useNavigate();
  return (
    <>
      <h5>Tags</h5>
      <nav className="ps-3">
        {rootStore.blogPostStore.allTags.map((x) => (
          <a
            href="#"
            onClick={() => {
              rootStore.blogPostStore.onNavigate(`articles?tag=${x}`);
              navigate(`/articles?tag=${x}`);
            }}
            className="text-white fs-7 pe-auto me-1"
            key={x}
          >
            <i className="icon fa fa-tag" /> {x}
          </a>
        ))}
      </nav>
    </>
  );
});

const ByMonths: FC = observer(() => {
  const navigate = useNavigate();
  return (
    <>
      <h5>History</h5>

      <nav className="d-flex flex-column ps-3">
        {rootStore.blogPostStore.allMonths.map((x) => (
          <a
            href="#"
            onClick={() => {
              rootStore.blogPostStore.onNavigate(`/articles?date=${x.queryString}`);
              navigate(`/articles?date=${x.queryString}`);
            }}
            className="text-white fs-7 pe-auto me-1"
            key={x.queryString}
          >
            <i className="icon fa fa-calendar" /> {x.displayDate}
          </a>
        ))}
      </nav>
    </>
  );
});

const ByArticles: FC = observer(() => {
  const navigate = useNavigate();
  return (
    <>
      <h5>Articles</h5>
      <nav className="d-flex flex-column ps-3">
        {rootStore.blogPostStore.allTitles.map((x) => (
          <a
            href="#"
            onClick={() => {
              rootStore.blogPostStore.onNavigate(x.id);
              navigate(`/article/${x.id}`);
            }}
            className="text-white fs-7 mb-2"
            key={x.id}
          >
            <i className="icon fa fa-book" /> {x.title}
          </a>
        ))}
      </nav>
    </>
  );
});
