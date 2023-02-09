import { Helmet } from 'react-helmet';
import { Content } from './Content';
import { ContentBar } from './ContentBar';
import { Sidebar } from './Sidebar';

export const App = () => {
  return (
    <>
      <Helmet>
        <title>Pete Eamsuwan&apos;s Dev Blog</title>
        <meta
          name="description"
          content="Welcome to Pete Eamsuwan's developer blog! Based in Melbourne, Pete is a .NET developer with expertise in TypeScript, React, SQL Server, and AWS. On this blog, Pete shares his knowledge and experiences with these technologies, as well as insights into software development best practices."
        />
      </Helmet>
      <div className="d-lg-flex flex-row justify-content-between position-relative">
        <Sidebar />
        <Content />
        <ContentBar />
      </div>
      <footer
        className="navbar fixed-bottom w-100 d-flex flex-row align-items-center justify-content-center position-relative"
        style={{ height: '40px' }}
      >
        <a href="https://github.com/eamsdev" className="fs-6 text-center m-0 link-unstyled">
          👉 Like what you see? check out my github <i className="icon fa fa-github" /> 👈
        </a>
      </footer>
    </>
  );
};

export default App;
