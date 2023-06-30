---
title: "Database(Mysql)"
date: "2023-02-16"
image: 디비.png
excerpt: 데이터 베이스 도전
isFeatured: true
---

> ### MySQL 의 구조
>
> ### MySQL 스키마의 사용
>
> ### MySQL 테이블 생성
>
> ### MySQL에서의 CRUD
>
> ### 관계형 데이터베이스(JOIN, SELECT)

</br>
</br>

---

# MySQL 의 구조

![](https://velog.velcdn.com/images/javascccccccc/post/8c98a182-13f8-422d-8b69-bdbd1396ca20/image.png)

#### - MySQL의 구조는 데이터베이스 서버 > 데이터베이스(스키마) > 테이블 로 구성

#### - 명령을 구분은 ; 로 해준다.

</br>

---

# MySQL 스키마의 사용

#### 데이터 베이스 생성

```javascript
CREATE DATABASE 데이터베이스이름;
```

#### 데이터 베이스 삭제

```javascript
DROP DATABASE 데이터베이스이름;
```

#### 데이터 베이스 목록들 확인

```javascript
SHOW DATABASES;
```

#### 데이터베이스를 사용하겠다 (선택, 연결)

```javascript
USE 데이터베이스이름;
// USE로 연결을 해주어야 그 안에 테이블이나 컬럼을 생성 및 관리할 수 있다.
```

</br>

---

# MySQL 테이블 및 컬럼 생성

```javascript
CREATE TABLE 테이블명(
	-> 컬럼명 데이터타입 옵션,
    -> 컬럼명 데이터타입 옵션,
);
// ex)
CREATE TABLE topic(
// INT(12) : 정수 12자리 / AUTO_INCREMENT 행이 추가될때마다 자동으로 숫자 1증가
-> id INT(12) NOT NULL AUTO_INCREMENT,
// VARCHAR(100) : 문자열 100자까지
-> title VARCHAR(100) NOT NULL,
// NULL : 데이터가 없어도 됨
-> discription TEXT NULL,
// NOT NULL : 데이터기 필수로 있어야됨
-> created DATETIME NOT NULL,

-> author VARCHAR(16) NULL,

-> profile VARCHAR(200) NULL,
//PRIMARY KEY(id) 행을 구분하는 중복되지 않는 고유값을 id값으로 사용한다
-> PRIMARY KEY(id)

-> );
```

</br>

---

# MySQL에서의 CRUD

### C : CREATE

```javascript
INSERT INTO 테이블명 (column1, column2, ...) VALUES (value1, value2,...);
// 특정 컬럼만 데이터 값을 넣지 않고 모든 컬럼에 데이터를 넣을땐
INSERT INTO 테이블명 VALUES (value1, value2,...);
// 앞에 (column1, ....) 생략가능
```

### R : READ

```javascript
// SELECT이 가장 어려움
// * : 모든 컬럼 = 테이블의 모든 컬럼을 READ한다.
SELECT * FROM 테이블명;
//컬럼명을 넣을 경우 해당되는 컬럼명만 READ한다.
SELECT 컬럼1, 컬럼2 FROM 테이블명;
// 테이블내 입력한 컬럼내 일치하는 데이터 내용이 있는 행만 표시한다
SELECT * FROM 테이블명 WHERE 컬럼명='데이터내용'
// 테이블내 id컬럼을 DESC 내림차순으로 정렬하고 LIMIT 2 : 2개의 행만 표시한다
SELECT * FROM 테이블명 ORDER BY id DESC LIMIT 2;
```

### U : UPDATE

```javascript
// WHERE id=1 : id가 1인 행의 컬럼의 변경할 데이터로 바꾼다.
UPDATE 테이블명 SET 컬럼명='변경할데이터', 컬럼명='변경할데이터' WHERE id=1;
```

### D : DELECT

```javascript
// 테이블에서 컬럼값이 데이터인 행을 삭제한다
DELETE FROM 테이블명 WHRER 컬럼명 = 데이터;
// ex)
DELETE FROM topic WHRER id = 5;
```

</br>

---

# 관계형 데이터베이스 (JOIN, SELECT)

#### JOIN, SELECT문은 관계형 데이터베이스의 핵심이다.

![](https://velog.velcdn.com/images/javascccccccc/post/65eb4063-60af-4d9e-a0b6-56ac186c3809/image.PNG)
![](https://velog.velcdn.com/images/javascccccccc/post/d56a94d6-6076-4559-ae75-95dbf8c4c699/image.PNG)

### JOIN은 테이블과 테이블을 조건에 따라 합쳐준다.

```javascript
//ex)
SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id;
// 위의 토픽 테이블에 author 테이블을 추가한다.
// topic테이블의 author_id와 author테이블의 id가 서로 같은 행을.
```

![](https://velog.velcdn.com/images/javascccccccc/post/364f059e-91e6-464c-8f55-7ac52e7d82cc/image.PNG)
해당 이미지와 같은 결과로 출력된다.
author_id에 해당되는 author테이블의 id가 있는 행이 옆에 붙여 출력된다.
출력시 컬럼명을 변경해서 출력도 가능하다

```javascript
SELECT topic.id AS topic_id FROM topic LEFT JOIN author ON topic.author_id = author.id;
//topic.id 컬럼만 출력하고 컬럼명을 topic_id로 변경한다.
```

</br>

---

### 마치며

#### 강의에서는 가장 중요한건 SELECT와 JOIN을 활용해 원하는 데이터를 효과적으로 출력하고, 관계형 데이터 베이스의 특징을 살려 여러 테이블로 분리하여 중복을 제거하고 테이블을 합쳐 출력하는 기술이 중요하게 요구된다고 느꼈다.
