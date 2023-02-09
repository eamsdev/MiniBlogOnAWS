import { FC } from 'react';
import { BlogPostModel } from 'stores/BlogPostStore';
import { rootStore } from '../stores/RootStore';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { observer } from 'mobx-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
dayjs.extend(customParseFormat);

const ArticlesSearch: FC = observer(() => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tag = searchParams.get('tag');
  const date = searchParams.get('date');

  let blogPosts: BlogPostModel[] = [];
  let headerComponent = undefined;

  if (!!date) {
    const monthAndYear = date.split('-');
    headerComponent = (
      <h1 className="fs-3">
        <i className="icon fa fa-calendar" />
        {` Month: ${dayjs()
          .month(parseInt(monthAndYear[0]) - 1)
          .format('MMMM')} ${monthAndYear[1]}`}
      </h1>
    );
    blogPosts = rootStore.blogPostStore.getByDate(+monthAndYear[0], +monthAndYear[1]);
  } else if (!!tag) {
    headerComponent = (
      <h1 className="fs-3">
        <i className="icon fa fa-tag" />
        {` Tag: ${tag}`}
      </h1>
    );
    blogPosts = rootStore.blogPostStore.getByTag(tag);
  }

  return (
    <>
      <header>{headerComponent}</header>
      <ul style={{ maxWidth: '1300px' }} className="mt-4 p-0 w-100">
        {blogPosts.length > 0 ? (
          blogPosts.map((x) => (
            <li
              className="search-result list-unstyled p-3 mb-2 rounded h-auto"
              key={x.attributes.id}
            >
              <a
                className="link-unstyled d-flex flex-row align-items-center justify-content-start"
                href="#"
                onClick={() => {
                  rootStore.blogPostStore.onNavigate(x.attributes.id);
                  navigate(`/article/${x.attributes.id}`);
                }}
              >
                <i className="icon fa fa-file-o d-md-flex d-none align-items-center fs-3 me-3" />
                <div className="border-0">
                  <p className="fw-bold fs-6 m-0">{x.attributes.title}</p>
                  <p className="fs-7 fst-italic m-0">{x.attributes.description}</p>
                  <p className="fs-7 m-0 mt-1">
                    {x.attributes.tags.map((x) => (
                      <span key={x} className="me-2">
                        <i className="icon fa fa-tag" /> {x}
                      </span>
                    ))}
                  </p>
                </div>
              </a>
            </li>
          ))
        ) : (
          <>
            <span className="fs-4">💩 No results found.</span>
          </>
        )}
      </ul>
    </>
  );
});

export default ArticlesSearch;
