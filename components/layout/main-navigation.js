import Logo from "./logo";
import Link from "next/link";
import classes from "./main-navigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">내 블로그</Link>
          </li>
          <li>
            <Link href="/contact">연락하기</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default MainNavigation;
