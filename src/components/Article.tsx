import { FC, useEffect } from 'react';
import { BlogPost } from './BlogPost';
import { StylisedMarkdown } from './StylisedMarkdown';
import { rootStore } from '../stores/RootStore';
import { observer } from 'mobx-react';
import { ContentType, ContentWrapper } from './ContentWrapper';
import { Helmet } from 'react-helmet';
import { BlogPostModel } from 'stores/BlogPostStore';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../components-library/Spinner';

const Article: FC = observer(() => {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const navigableBlogPostModel = rootStore.blogPostStore.getBlogPostById(articleId);
  if (navigableBlogPostModel == undefined) {
    return (
      <div className="container p-0 m-0 d-flex flex-row align-items-center justify-content-center">
        <h1>Content Not Found</h1>
      </div>
    );
  }
  const styles = { display: rootStore.blogPostStore.isLoading ? 'none' : 'block' };
  return (
    <ContentWrapper
      onPageSelected={(pageNumber) => {
        rootStore.blogPostStore.onNavigate(pageNumber.toString());
        navigate('/blogs/page/' + pageNumber);
        rootStore.blogPostStore.selectPage(pageNumber);
      }}
      isLoading={rootStore.blogPostStore.isLoading}
      pageCount={rootStore.blogPostStore.pageCount}
      currentPage={rootStore.blogPostStore.currentPage}
      onNewerBlogPost={() => {
        rootStore.blogPostStore.onNavigate(navigableBlogPostModel.newerPostId);
        navigate('/article/' + navigableBlogPostModel.newerPostId);
      }}
      hasNewerBlogPost={!!navigableBlogPostModel.newerPostId}
      onOlderBlogPost={() => {
        rootStore.blogPostStore.onNavigate(navigableBlogPostModel.olderPostId);
        navigate('/article/' + navigableBlogPostModel.olderPostId);
      }}
      hasOlderBlogPost={!!navigableBlogPostModel.olderPostId}
      blogPostDate={navigableBlogPostModel.currentPost.attributes.date}
      type={ContentType.NAVIGATION}
      transitionKey={
        ContentType.NAVIGATION + '-' + navigableBlogPostModel.currentPost.attributes.id
      }
    >
      <>
        <IndividualBlogView
          styles={styles}
          blogPost={navigableBlogPostModel.currentPost}
          onFinishLoading={() => rootStore.blogPostStore.onLoadFinish()}
        />
        {rootStore.blogPostStore.isLoading && (
          <div className="container p-0 m-0">
            <Spinner />
          </div>
        )}
      </>
    </ContentWrapper>
  );
});

type IndividualBlogViewProps = {
  styles: React.CSSProperties;
  blogPost: BlogPostModel;
  onFinishLoading: () => void;
};

const IndividualBlogView = ({ blogPost, onFinishLoading, styles }: IndividualBlogViewProps) => {
  const [body, setBody] = React.useState('');
  useEffect(() => {
    blogPost
      .lazyLoadBody()
      .then((x) => {
        setBody(x.body);
        onFinishLoading();
      })
      .catch((e) => console.error(e));
  }, [blogPost]);

  return (
    <div style={styles} className="container p-0 m-0">
      <Helmet>
        <title>{blogPost.attributes.title}</title>
        <meta name="description" content={blogPost.attributes.meta} />
      </Helmet>
      <BlogPost key={blogPost.attributes.title as string} frontMatter={blogPost.attributes}>
        <StylisedMarkdown markdown={body} />
      </BlogPost>
    </div>
  );
};

export default Article;
