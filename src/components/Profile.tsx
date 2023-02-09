import { FC } from 'react';
import { rootStore } from '../stores/RootStore';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { ThemeToggle } from '../components-library/ThemeToggle';
import { useNavigate } from 'react-router-dom';

type StyledProfileContainerProps = {
  showNavbar: boolean;
};

const StyledProfileContainer = styled.div<StyledProfileContainerProps>`
  @media (max-width: 991.98px) {
    // this is bootstrap large (lg) breakpoint
    // cant reference boostrap media query here zzzz.
    max-height: ${(props) => (!props.showNavbar ? `0` : `650px`)};
`;

export const Profile: FC = observer(() => {
  return (
    <StyledProfileContainer
      showNavbar={rootStore.uiStore.showNavbar}
      className="container profile overflow-hidden d-flex flex-column justify-content-between h-100"
    >
      <div className="vstack gap-0 p-3">
        <Header />
        <Separator />
        <Nav />
        <Separator />
      </div>
    </StyledProfileContainer>
  );
});

const Nav: FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="d-flex flex-column fs-5 justify-content-center align-items-center">
      <a
        href="#"
        onClick={() => {
          rootStore.blogPostStore.onNavigate('0');
          navigate('/blogs/page/0');
        }}
        className="pe-auto text-decoration-none"
        title="Blogs"
      >
        <i className="icon fa fa-book" /> Blog
      </a>
      <a
        href="#"
        onClick={() => {
          rootStore.blogPostStore.onNavigate('about');
          navigate('/about');
        }}
        className="pe-auto text-decoration-none"
        title="Home"
      >
        <i className="icon fa fa-user" /> About me
      </a>
    </nav>
  );
};

export const Separator: FC = () => {
  return (
    <div className="d-flex flex-row justify-content-center">
      <hr className="rounded-pill" />
    </div>
  );
};

const Header: FC = () => {
  return (
    <header>
      <picture className="d-flex flex-row align-items-center justify-content-center mb-3">
        <img
          src="/profilePhoto.webp"
          alt="Pete Eamsuwan"
          className="rounded-circle mb-2"
          width="280px"
          height="280px"
        />
      </picture>
      <ThemeToggle />
      <h1 className="name fw-bold text-center fs-2 mt-2">
        <span>PETE </span>
        <span>EAMS</span>
        <span>UWAN</span>
      </h1>
      <p className="title fw-bolder text-center mb-0">Software Engineer</p>
      <p className="fst-italic text-center mb-0">React | Typescript | .Net | Sql</p>
      <p className="social-media text-center fs-5 mb-0">
        <span>
          <a
            href="https://github.com/eamsdev"
            className="icon fa fa-github-square link-unstyled"
            title="See some of my work"
          />
          <a
            href="https://www.linkedin.com/in/pete-e-339708117/"
            className="icon fa fa-linkedin-square link-unstyled"
            title="Lets connect"
          />
        </span>
      </p>
    </header>
  );
};
