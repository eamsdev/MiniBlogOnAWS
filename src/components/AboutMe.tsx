import { observer } from 'mobx-react';
import { FC } from 'react';

const AboutMe: FC = observer(() => {
  return (
    <div id="about" className="w-100 p-3 rounded" style={{ maxWidth: '900px' }}>
      <header className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="fs-3">Welcome ✋!</h1>
        <hr className="w-100" />
      </header>
      <section className="fs-6">
        <p>
          Welcome to my software development blog! My name is Pete and I am a Software Engineer
          based in Melbourne. I have a strong background in .NET, C#, React, AWS, and SQL Server,
          and have experience working on a variety of projects ranging from web applications to
          backend systems that power medical devices.
        </p>
        <p>
          I am drawn to the field of software development because of its constantly evolving nature
          and the endless opportunities for learning and growth. As a lifelong learner, I am always
          seeking out new challenges and technologies to explore.
        </p>
        <p>
          In this blog, I detail the challenges I have faced in my software development journey and
          how I have approached and solved them. While I am not currently looking for new job
          opportunities, I am always open to connecting with others in the industry and sharing my
          experiences and insights. If you have any questions or would like to connect, please
          don&#39;t hesitate to reach out.
        </p>
        <p>Thanks for visiting my blog, and I hope you find my content helpful and informative.</p>
      </section>
    </div>
  );
});

export default AboutMe;
