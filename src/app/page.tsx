import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <title>Rohit C</title>
      <div className="left">
        <div className="top">
          <div className="name">
            <h1>ROHIT C</h1>
          </div>
          <div className="image">
            <Image className="profile" priority={true} src={"/images/profile.png"} width={300} height={300} alt="Rohit C"/>
          </div>
        </div>
        <div className="bottom">
          <div className="description">
            <p>An enthusiastic and goal-driven Computer Science Engineering student with proficient team player abilities with adequate knowledge in mainstream programming languages seeking for an opportunity to put his potential to full use in the field of Software Development.</p>
          </div>
          <div className="social">
            <div className="link">
              <Link className="one" href={'https://github.com/RO21T'}>
                <Image className="github" priority={true} src={"/images/github.png"} width={45} height={45} alt="Github"/>
              </Link>
            </div>
            <div className="link">
              <Link className="two" href={'https://www.linkedin.com/in/rohit-c-6aa329255/'}>
                <Image className="linkedin" priority={true} src={"/images/linkedin.png"} width={50} height={45} alt="LinkedIn"/>
              </Link>
            </div>
            <div className="link">
              <Link className="three" href={'mailto:rohitc21official@email.com'}>
                <Image className="gmail" priority={true} src={"/images/gmail.png"} width={50} height={50} alt="Gmail"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </>
  );
}
