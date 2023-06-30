import classes from "./hero.module.css";
import Image from "next/image";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/시고르자브종.jpg"
          alt="프로필 이미지"
          width={300}
          height={300}
        />
      </div>
      <h1>조성홍의 개발 블로그</h1>
      <p>개발 블로그 프로젝트 입니다.</p>
    </section>
  );
}

export default Hero;
