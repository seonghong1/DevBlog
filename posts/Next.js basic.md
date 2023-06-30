---
title: "Next.js basic"
date: "2023-03-1"
image: next.png
excerpt: next.js에 대해서
isFeatured: true
---

> ## - 프로젝트 생성 및 기초

#### next js 는 프레임워크임

```javascript
//프로젝트 생성
npm create next-app
```

## pages폴더와 url에 대하여

nextjs는 자동적으로 pages폴더 안에 파일을 만들면 locallhost:3000/파일명
경로로 접속을 할때 해당 파일의 return값을 보여준다.
index.js파일명으로 생성할 경우 기본 locallhost:3000/ 루트경로가 된다.
pages 폴더 안의 file들의 이름이 url이름이됨(파일 내부의 컴포넌트 이름은 상관없음)

## next.js의 기본 구조 및 원리

- 확장자가 jsx가 아닌 js 여도 html, js 자유롭게 사용가능(react hook을 사용할경우만 react를 inport해야됨

- nextjs의 가장큰 장점 페이지가 미리 랜더링됨
- react는 csr : 브라우저가 ui를 생성함 소스코드가 없음(div id=root만 보임) 브라우저가 자바스크립트를 갖고오고 그 자바스크립트가 ui를 만듬
- nextjs의 소스코드에는 실제 html이 보임 스크립트를 갖고오기전에 html이 로드되기대문에 초기 화면이 html로 보여짐 앱의 초기상태를 미리 랜더링해서 보여줌 (초기상태란 순수 html)

## 컴포넌트 생성 방법

- react와 동일 컴포넌트의 첫글자는 대문자로

- router사용 방법
  spa형태로 페이지 이동시
  next.js의 내장 컴포넌트인

```
<Link href=""><Link>
```

를 사용

```javascript
  //현재 path 값을 갖고오는 방법
  import { useRouter } from next/router

  export default function (){
  	const router = useRouter()
  	console.log(router.pathname)
  }
```

> ## 스타일 넣기

## 1. module.css

얼추 기억상으로는 react와 동일한 방법
보통 컴포넌트와 동일한 이름의 css 파일로 생성하고 module.css를 붙여준다

적용 방법은 import styles(자유임) from 경로
그 후 className="클라스명" 이 아닌

className={ styles.클라스명 } 형식으로 적용해줘야됨

클라스 이름의 중복을 신경쓰지 않고 직관적이고 독립적이게 사용 가능
여러개의 className을 적용할때

- #### 여러개의 module.css의 className을 적용할때

```javascript
 className={`{styles.이름} ${styles.이름}`}
```

- #### 위의 상황에서 일반 globalcss를 적용할때

```javascript
className={`{styles.이름} ${styles.이름} link `}
//하나의 문자열로 만들어주기 위해 뱁틱으로 감싸며 일반 class이름은 뱁틱안 자유롭게 적어주면 된다.
```

```javascript
//아래와 같이 배열로 하고 join으로 문자열 형식으로도 만들 수 있다.
<Link
  href="/"
  className={[
    "globalLink",
    styles.link,
    router.pathname === "/" ? styles.active : "",
  ].join(" ")}
>
  home
</Link>
```

## 2. styled jsx

- next.js 의 고유한 방식
- 컴포넌트 return 안 하단에

** styled jsx의 스코프는 현재 컴포넌트로 한정되어있음 !!**

```
<style jsx>{`
    nav {
       	  background-color:tomato;
        }
 .active{
           color: white;
    	}
`}</style>
// html 태그인 style 안에 jsx프로퍼티를 추가해주고
//{``}으로 감싼뒤 일반 css를 작성해주면 된다
```

장점으로는 .module.css와 유사하지만 별도의 파일을 생성할 필요도 없으므로 import를 안해도 되고
한 화면에서 css와 html을 동시에 확인할 수 있다는 장점이 있다.

-- Link컴포넌트는 실제 화면에서 a태그로 보인다. styled jsx를 사용해 a태그에 css를 넣을 경우 적용이 되지 않는다

```javascript
// styled jsx 적용 안됨
<Link href=""></Link>

// 링크 컴포넌트 아래 a태그를 만들고 legacyBehavior 옵션을 추가해주면 css가 적용이 된다.
<Link href="" legacyBehavior>
  	<a></a>
</Link>
```

> ## \_app.js

- nextjs에서 글로벌하게 무언갈 하기 위해서 pages폴더 안에 \_app.js 파일을 만든다

- next.js는 컴포넌트를 읽기 전에 \_app.js를 먼저 읽고 그 다음에 해당되는 컴포넌트를 읽는다
  내부의 컴포넌트 이름은 자유

**예를들어 about페이지를 랜더링할때**

```javascript
// _app.js의 기본 형태는 아래와 같아
export default function App({Component, pageProps}){
    return <div>
        <Component {...pageProps}/>
    </div>
}

// 예를들어 pages폴더 안의 about.js를 랜더링 하게 되면
export default function App({About, pageProps}){
    return <div>
        <About {...pageProps}/>
    </div>
}
// 위와같이 컴포넌트 자리에 about.js폴더 안의 About컴포넌트가 들어가,
// pageProps는 해당 컴포넌트의 props로 전달되는 데이터인데 아래 다시 언급할게
```

이런식으로 된단 말이지
예를들어 공통으로 사용하고싶은 것이 있으면 App컴포넌트 안에 넣으면 된다.
Header, Footer, Nav, CommonCss.css 등등

**\_app.js 파일에서 styled jsx사용하기**

```
 <style jsx global>{`
    a{
       font-size:50px;
     }
`}</style>
// 기존의  styled jsx사용법과 동일하지만 global옵션을 추가로 넣어주면 된다.
```

위와같이 \_app.js에서 styled jsx global을 사용해 전역적으로 스타일을 넣거나
별도의 css파일을 만들어 import해주어도 된다.

### 참고로

nextjs에서는 일반 컴포넌트 안에 css파일을 import할 수 없다. \_app.js에서만 일반 css파일을 import할 수 있다.
컴포넌트 안에서 css 파일을 import하길 원한다면 반드시 module.css이어야지만 import가 가능하다.

**styled jsx작성시 유용한 익스텐션**
styled-jsx : styled jsx 하이라이팅
styled-jsx Language Server : 자동완성

> ## next.js에서의 title작성방법

![](https://velog.velcdn.com/images/javascccccccc/post/77f4bb2b-43f8-4795-a7d4-9301e22bad34/image.PNG)

**페이지를 title을 말하는 것이다.**

```javascript
// 그냥 html title태그를 입력하면 안되고 Head모듈을 가져와야된다
import Head from "next/head";

<Head>
  <title>Next basic</title>
</Head>;
// 위와 같은 형식으로 작성한다
```

> ## Layout.js

- 이전에 공통적으로 사용하는 컴포넌트는 \_app.js에 사용하라고 적어 놓았지만 좋지 않은 방법이다
  프로젝트의 복잡도가 올라가게되면 다양한 모듈을 import해되고 가독성을 위해서도
  title이나 UI를 구성하는 Layout.js라는 컴포넌트에 묶어 사용하는 것이 바람직하다.

```javascript
//_app.js
import Layout from "@/components/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

```javascript
// Layout.js
import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
// Layout({children}) 여기서 children은 _app.js 의
// <Component {...pageProps}/>를 의미한다
```

> ## nextjs 에서 퍼블릭 폴더 접근 방법

public > vercel.svg가 있는 경우
img src='/vercel.svg' 형식으로 접근 가능

nextjs를 이용해 api key숨기기
tmdb에서 api를 불러오기 위해

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)

````
를 해주었다. 이런 형태일 경우 key값이 노출이 되기 때문에 next.config.js파일로 이동해준다.
내부에
async rewrites(){} 함수를 만들어주고

const API_KEY = process.env.API_KEY
  async rewrites(){
  return [
    {
      //https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY} 를 대체할 가짜 url = source
      source: '/api/movies',
      destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    }
  ]
}


위의 형식으로 작성해준다.
설명을 하자면 destination은 실제 fetch를 할 url을 적어주며 source는 실제 url의 값이 들어있는 가짜 url이다 . source의 경로로 들어가보면 실제 데이터가 담겨있는 페이지를 볼 수 있다.
이제 저장을 하고 실제 fetch함수가 있는 index.js 파일에서
fetch('/api/movies')를 적어준다. 완료 ~~
그리고 나는 한번더 루트 경로에 .env 파일을 만들고 API_KEY=`API_KEY값` 을 만들어주어
next.config.js파일에서 process.env.API_KEY 형식으로 참조해 주었다.

그리고   next.config.js파일에서 redirects함수도 있다.

	  async redirects(){
  return [
    {
      source: '/contact',
      destination: '/form',
      permanent: false
    }
  ]
}

형식은 이렇게 되며 source경로로 url을 입력하면 /form경로로 url이 이동하게 된다.
어디에 사용하는지는 잘 모르겠다.

--디테일 페이지를 만들때
page
	about
	index
폴더들이 있으며 각각 /about, /경로로 들어갔을때 노출이 된다

여기서
page(폴더)
	about
	index
	movies(폴더)
		index.js
		all.js
를 만들어주면 movies폴더 안의 index.js는
/movies의 경로를 갖게되며 all.js는
/movies/all의 경로를 갖게된다.

-- next.js에서 url변수를 사용하는 방법
ex) movies/:id
  page(폴더)
	about
	index
	movies(폴더)
		index.js
		all.js
		[id].js
원하는 경로 안에 대괄호로 url변수명을 묶어주면
movies/:id 의 형태가 완성된다.
movies/1 의 경로로 들어가게 되면
해당 [id] 파일의 return 값이 보이게 되며
id 값은 라우터를 사용해
```javascript
  const router = useRouter()
  console.log(router.query.id) //1
query:
	id: "1"
````

아래 형식과 같이 사용할 수 있다. 여기서 쿼리 안의 id는 [id] 이기때문이다. 대괄호 안의 파일명과 동일

next.js에서 라우터하는 방법은 크게 두가지
링크 컴포넌트를 사용하거나

  <Link href=""></Link>

```javascript
import { useRouter } from "next/router";

const router = useRouter()

  const onClick = (id)=>{
  router.push(`/movies/${id}`)
	<div onClick={()=>onClick(movie.id)}>
	</div>
}
//이런식으로도 사용할 수 있다.
```

-- 라우터시 url이동과 함께 데이터도 같이 보내줄때

```javascript
router.push({
  pathname: `/movies/${id}`,
  query: {
    id,
    title: "potato",
  },
});
//movies/505642?id=505642&title=potato
```

위의 쿼리 부분은 사용자에게 불필요한 정보이며
마스킹 하고싶으면

```javascript
router.push(
  {
    pathname: `/movies/${id}`,
    query: {
      title: "potato",
    },
  },
  `/movies/${id}`
);
//push의 두번째 매개변수로 url을 넣어준다
```

받아온 쿼리값을 [id].js 파일에서 사용하는 방법은
위의 router.query.id
이 부분인 router.query에
{
id:1,
title:POTATO
}
title의 값이 추가된다 !!

next.js
catch all url
[id] 의경우 하나의 변수만 갖고있지만
여러개의 변수를 갖을땐 [...변수명]을 해주면 된다
/movies/아무/런/path/를 입력해도 detail컴포넌트가 보여진다
기존의 [id]는
/movies/12
형태의 path가 들어와야지 detail컴포넌트가 보여졌는데[...을 ]사용하면 movies/뒤에 아무런 경로가 와도 detail컴포넌트가 보여진다.
