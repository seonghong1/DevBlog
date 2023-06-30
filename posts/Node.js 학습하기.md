---
title: "Node.js 학습하기"
date: "2023-02-12"
image: 노드.png
excerpt: 풀스택 개발자로 한걸음
isFeatured: true
---

# 📰NEW Keyword📰

> - ## express

- ## body-Parser
- ## fs
- ## app.use, set, get, post, listen
- ## res.send, render
- ## query, params

</br>
</br>

---

</br>
</br>

## 📌express 란?

>

#### express란 NodeJS를 사용하여 쉽게 서버를 구성할 수 있게 만든 클래스와 라이브러리의 집합체

#### 💡 node만을 사용해서 서버를 구성할 때 보다 훨씬 간결하게 작성 가능

#### 설치

`npm install express`

#### 사용법

```javascript
const express = require("express");
const app = express();
```

</br>
</br>

---

</br>
</br>

## 📌body-parser 란?

>

#### post메서드로 전달된 request의 값을 추출하기 위해서 사용한다.

#### 설치

`npm install body-parser`

#### 사용법

```javascript
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/topic", (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  fs.writeFile(`data/${title}`, description, (err) => {
    if (err) {
      res.status(500).send("에러발생 !!!");
    }
    res.redirect(`/topic/${title}`);
  });
});
```

</br>
</br>

---

</br>
</br>

## 📌fs 란?

>

#### Node.js에서 파일 입출력 처리를 할 때 사용하는 fs 모듈이다.

#### 💡 node에 내장되어 있는 모듈임 -> 별도의 설치 x

#### 사용법

```javascript
const fs = require('fs')

fs.readdir('data', (err, files) => {
  if (err) {
    res.status(500).send('에러발생 !!!')
  }
  res.render('new', {topics:files})
})

fs모듈을 require을 통해 불러와준다.
.readdir() :
 디렉토리(폴더)를 읽어주는 매서드,
.readdir('dir명', (err, files)=>{
	res.render('new', {topics:files})
}
```

</br>
</br>

---

</br>
</br>

## 📌app.매서드()

>

#### expree에는 다양한 내부 매서드가 있다.

> >

### app.use( "경로", 실행구문 )

- app.use()는 미들웨어 기능을 마운트하거나 지정된 경로에 마운트하는 데 사용된다.
  기본 경로가 일치하면 미들웨어 기능이 실행된다.
- app.use()를 사용할 수 있으며 해당 경우에는 URL에 상관없이 매번 실행된다.

```javascript
// express.static: 정적인 파일을 불러올때 사용된다(이미지, html, css등등)
// public폴더 내부의 파일을을 가져온다.
app.use(express.static("./public"));
```

### app.set( "이름", "값" )

- app.set()은 설정을 할 때 사용된다고 한다.
- 설정 이름을 값에 할당하는 데 사용됩니다. 원하는 모든 값을 저장할 수 있지만 특정 이름을 사용하여 서버의 동작을 구성할 수 있습니다.

```javascript
// app.set(이름, 값)
// 템플릿 엔진을 pug로 한다.
app.set("view engine", "pug");
```

### app.get( "경로", (req, res)=>{} )

- app.set()은 해당 경로로 get요청시(브라우저에서 해당 url로 이동시) 콜백함수가 실행되는 혀형태이다
- res.send() 혹은 res.render()로 화면을 표시한다.
- query와 params로 url의 값을 갖고올 수 있다.

```javascript
// app.get( "경로", (req, res)=>{} )
app.get('/topic/new', (req, res) => {
  		res.send('index.html')
  		// or
        res.render('new', { topics: files })
    })
})
```

### app.post( "경로", (req, res)=>{} )

- app.post는 해당 경로로 post요청이 들어올때 실행된다.
- res.send() 혹은 res.render()로 화면을 표시한다.
- query와 params로 url의 값을 갖고올 수 있다.

```javascript
// app.post( "경로", (req, res)=>{} )
// post는 요청에 대한 갚을 갖고온다.(req)
// post로 전달된 값은 body에 담겨 전달된다. 여기서 body를 사용할려면  body-parser를
// 사용해야지만 값을 추출할 수 있다.
// body.input의name
app.post('/topic', (req, res) => {
    let title = req.body.title
    let description = req.body.description
    res.redirect(`/topic/${title}`)
    })
})
```

### app.listen("포트번호", ()=>{})

- 해당 포트번호에서 서버를 실행시켜주는 역할을 한다.

```javascript
// 서버가 정상적으로 작동되면 console.log()가 실행된다.
app.listen(port, () => {
  console.log(`${port}번 포트 정상 작동 !!!`);
});
```

</br>
</br>

---

</br>
</br>

## 📌res.send / res.render 란?

>

### res.render()

#### - view화면을 랜더링하고 랜더링된 html을 클라이언트에 보내주는 역할.

#### - 템플릿 엔진을 사용하여 html요소에 동적인 data를 전달할때 적합하다

#### ex) res.render(view, [, locals] [, callback])

### res.send

#### - send에 전해진 argument에 따라서 Content-type이 자동적으로 만들어짐

#### - 어떠한 파일을 그대로 보낼때 사용이 된다

#### ex) res.send('index.html')

</br>

---

</br>

## 📌query / params 란?

>

# query

#### locallhost:3000/page/detail?id=ABC&name=JSON

```javascript
app.get("page/detail", (req, res) => {
  let query = res.query.id;
  let name = res.query.name;
  res.send("file[query]");
});
// query = ABC
```

##### - req 요청에 대한 값 .query.query명

##### - 복수의 값을 갖고올경우 &로 구분짓는다.

# params

#### locallhost:3000/topic/:topic_id

```javascript
app.get("/topic/:topic_id", (req, res) => {
  let topics = ["javascript", "node.js", "express"];
  let output = `
    <a href='/topic/0'>${topics[0]}</a>
    <a href='/topic/1'>${topics[1]}</a>
    <a href='/topic/2'>${topics[2]}</a>
    ${topics[req.params.topic_id]}
    `;
  res.send(output);
});
// query = ABC
```

#### -

#### [req.query.id] -> [req.params.id]

#### 쿼리방식의 topic?id=1 값을 topic/0 형식으로 변환 /뒤의 값을 갖고옴

## 최종 정리

![](https://velog.velcdn.com/images/javascccccccc/post/bcd37f11-98b0-4132-bd83-7f1e2f518947/image.png)

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

app.use("/", express.static("./public"));
app.locals.pretty = true;
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/topic/new", (req, res) => {
  fs.readdir("data", (err, files) => {
    if (err) {
      res.status(500).send("에러발생 !!!");
    }
    res.render("new", { topics: files });
  });
});

app.get(["/topic", "/topic/:id"], (req, res) => {
  fs.readdir("data", (err, files) => {
    if (err) {
      res.status(500).send("에러발생 !!!");
    }
    let id = req.params.id;
    if (id) {
      fs.readFile(`data/${id}`, "utf8", (err, data) => {
        if (err) {
          res.status(500).send("에러발생 !!!");
        }
        res.render("topic", { topics: files, title: id, description: data });
      });
    } else {
      res.render("topic", {
        topics: files,
        title: "welcome",
        description: "hello javascript for server",
      });
    }
  });
});

app.post("/topic", (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  fs.writeFile(`data/${title}`, description, (err) => {
    if (err) {
      res.status(500).send("에러발생 !!!");
    }
    res.redirect(`/topic/${title}`);
  });
});

app.listen(port, () => {
  console.log(`${port}번 포트 정상 작동 !!!`);
});
```

</br>
</br>

```javascript
//express, bodyparser, fs모듈을 갖고온다.
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;
```

```javascript
// 정적인 파일들을 갖고옴, locallhost:3000:파일명 으로 접속했을때 노출됨.
app.use("/", express.static("./public"));
// 브라우저의 소스코드 내부의 html을 보기 편하게 만들어준다.
app.locals.pretty = true;
// body-parser를 불러오고 사용한다고 정의해준다.
app.use(bodyParser.urlencoded({ extended: false }));
```

```javascript
//url의 경로가 '/topic/new'일때
app.get("/topic/new", (req, res) => {
  //data디렉토리를 읽어드리고,
  fs.readdir("data", (err, files) => {
    if (err) {
      res.status(500).send("에러발생 !!!");
    }
    // new.pug파일을 보여준다. 그리고 data폴더 내부의 파일들을 배열형태로 객체에 담아서 전달한다
    res.render("new", { topics: files });
  });
});
```

```javascript
//url의 경로가 '/topic' 또는 '/topic/:id' 일 경우
app.get(["/topic", "/topic/:id"], (req, res) => {
  //data디렉토리를 읽어드리고,
  fs.readdir("data", (err, files) => {
    if (err) {
      res.status(500).send("에러발생 !!!");
    }
    // 쿼리값을 변수 id에 담는다.
    let id = req.params.id;
    //url이 '/topic/:id' 일 경우
    if (id) {
      //data폴더 내부 쿼리값과 동일한 파일을 읽고,
      fs.readFile(`data/${id}`, "utf8", (err, data) => {
        if (err) {
          res.status(500).send("에러발생 !!!");
        }
        //화면에 topic.pug파일을 보여준다
        //title:id(url의 쿼리값 == 파일의 이름 == 제목)
        //description:data(readFile로 읽은 파일의 내부 데이터)
        //topics:files(data폴더의 파일들이 들어있는 배열)
        res.render("topic", { topics: files, title: id, description: data });
      });
    } else {
      //url의 경로가 '/topic'일 경우 topic.pug파일을 보여주고,
      // topics:files(data폴더의 파일들이 들어있는 배열)
      // title과 description을 전달해 화면에 보여준다.
      res.render("topic", {
        topics: files,
        title: "welcome",
        description: "hello javascript for server",
      });
    }
  });
});
```

```javascript
// /topic url로 post요청이 들어왔을때
app.post("/topic", (req, res) => {
  // req.body.input의name
  // 해당 value가 변수에 저장되고,
  let title = req.body.title;
  let description = req.body.description;
  // writeFile(`생성할 파일의 경로`,'파일 안의 데이터')
  // input의 vaule값이 파일의 이름, textarea의 값이 파일 내부의 데이터 값이 된다.
  fs.writeFile(`data/${title}`, description, (err) => {
    if (err) {
      res.status(500).send("에러발생 !!!");
    }
    // 파일이 생성된 뒤에 url의 경로는 `/topic/${title}` 이 된다.
    // 다시 상단의 get요청이 실행되고, id가 있는 if문 로직이 실행된다.
    res.redirect(`/topic/${title}`);
  });
});
```

```javascript
//서버를 열고싶은 포트번호를 입력한다, port = 3000
app.listen(port, () => {
  console.log(`${port}번 포트 정상 작동 !!!`);
});
```
