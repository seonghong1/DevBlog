---
title: "Typescript 고급타입"
date: "2023-04-19"
image: 고급타입.jpeg
excerpt: 타입스크립트 문법 조금 더 알아보기
isFeatured: true
---

### 인터섹션 타입

인터섹션을 활용해 타입을 결합할 수 있다 !!

```typescript
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmoloyee = Admin & Employee;

let somePerson: ElevatedEmoloyee;

somePerson = {
  name: "jone",
  privileges: ["a"],
  startDate: new Date(),
};
```

객체의 경우 위의 코드처럼 결합의 개념이고

```typescript
type numOrStr = number | string;
type strOrbol = string | boolean;

type add = numOrStr & strOrbol;

let a: add;

a = "2";
// a = 1;    : error
// a = true  : error
```

유니언 타입의 경우 교차의 개념이다

### 타입가드

런타임시 코드의 타입을 명확하게 구분짓기 위해 수행

```typescript
type numOrStr = number | string;
type strOrbol = string | boolean;

function Numadd(n1: numOrStr, n2: numOrStr) {
  return n1 + n2; //error발생 문자열일 가능성도 있기 때문
}

// typeof 키워드를 사용해주어 각 타입에 따른 조건문을 지정해주어 에러 해결
function Numadd(n1: numOrStr, n2: numOrStr) {
  if (typeof n1 === "string" || typeof n2 === "string") {
    return n1.toString() + n2.toString();
  }
  return n1 + n2;
}
```

```typescript
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};
type unKnownEmployee = Employee | Admin;
//에러발생 privilege는 Admin에만 존재
function UnKnownEmployee(emp: unKnownEmployee) {
  console.log(emp.name, emp.privilege);
}

//자바스크립트의 in 키워드를 사용해 해결 ㄱ가능
function UnKnownEmployee(emp: unKnownEmployee) {
  if ("privileges" in emp) {
    console.log(emp.name, emp.privileges);
  }
}
//privileges 속성이 emp내부에 존재하는지 여부 확인
```

### 구별된 유니언

타입가드를 쉽게 구현하게 해주는 유니언 타입

```typescript
interface Bird {
  flySpd: number;
}

interface Horse {
  runningSpd: number;
}

type Animal = Bird | Horse;

function moveAnimal(anumal: Animal) {
  console.log(anumal.runningSpd);
}
```

해당 코드에서는 두개의 인터페이스를 하나의 타입으로 구성해주고
함수내부 animal.runningSpd 로 입력시 에러를 반환한다.
Bird인터페이스에는 runningSpd 프로퍼티가 없기 때문이다.

```typescript
function moveAnimal(animal: Animal) {
  if ("runningSpd" in animal) {
    console.log(animal.runningSpd);
  }
}
moveAnimal({ type: "bird", flySpd: 4 });
```

위와 같이 작성할 수 있지만 비교해야될 대상이 많아지면 그때마다 if문으로 구별해야도ㅓㅣ기때문에 가독성에도 떨어지고 프로퍼티를 입력할 때 오타도 발생할 수 있어

```typescript
interface Bird {
  type: "bird";
  flySpd: number;
}

interface Horse {
  type: "horse";
  runningSpd: number;
}

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flySpd;
      break;
    case "horse":
      speed = animal.runningSpd;
      break;
  }
  console.log(speed);
  // if ("runningSpd" in animal) {
  //   console.log(animal.runningSpd);
  // }
}
moveAnimal({ type: "bird", flySpd: 4 });
```

각각의 interface 구별 가능한 식별자 프로퍼티를 추가해준다.(type 프로퍼티)
그 후 함수 구문에 switch를 사용해 type에 따른 인터페이스를 구별해주는 로직을 간편하게 작성할 수 있다.

### 형변환

타입스크립트가 직접 감지하지 못하는 특정 타입의 값을 타입스크립트에 알려주는 역할

```typescript
const inputElement = document.getElementById("output-input");

inputElement.value = "kokoa"; // error 발생
```

위의 코드에서 에러가 발생하는 이유는 inputElement타입이 HtmlElement | null 이기 때문이다. value 라는 프로퍼티는 input을 비롯한 특정 element에서만 사용이 가능한 속성이기 때문에
inputElement가 input이라는걸 정의해주어야된다.

1.

```typescript
const inputElement = <HTMLInputElement>document.getElementById("output-input")!;

<HTMLInputElement> 키워드를 앞에 붙여 타입을 정의해준다. react에서 컴포넌트의 type을 정의할때 사용되곤 한다.
```

2.

```typescript
const inputElement = document.getElementById(
  "output-input"
) as HTMLInputElement;
```

두가지 방법이 있다. 여기서 !는 HtmlElement | null처럼 null일수도 있다는 타입으로 정의되기 때문에 이 값은 null이 아니다라는 것을 명시적으로 표현해준다.

### 인덱스 속성

객체가 지닐 수 있는 유연한 객체를 생성할 수 있게 해줌.

```typescript
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "not found email",
  username: "noy found username",
};
```

[prop: string]: string; 를 사용해 key 값에는 어느 문자열이든 개수에 상관없이 올 수 있고 그에 따른 value도 문자열로 정의할 수 있다는 구문이다.

위의 코드의 장점은 interface를 선언 할 때 미리 내부 프로퍼티의 속성의 이름과 개수를 미리 정의하지 않고 유연하게 사용이 가능하다는 장점이 있다.

### 함수 오버로드

동일한 함수에 대해 여러가지 타입의 매개변수, return값을 정의할 수 있다.

```typescript
function Numadd(n1: numOrStr, n2: numOrStr) {
  if (typeof n1 === "string" || typeof n2 === "string") {
    return n1.toString() + n2.toString();
  }
  return n1 + n2;
}
const result = Numadd(1, 2);
//result 의 타입은 number | string
```

우리는 result의 타입이 당연히 number인걸 알지만 typescript에게 명시적으로 표현을 하지 못해 발생하게 된다.

이때 같은 함수이지만 인자의 타입, 리턴값의 타입을 유연하게 표현할 수 있다

```typescript
function Numadd(n1: number, n2: number): number;
function Numadd(n1: string, n2: string): string;
function Numadd(n1: string, n2: numOrStr): string;
function Numadd(n1: numOrStr, n2: string): string;
function Numadd(n1: numOrStr, n2: numOrStr) {
  if (typeof n1 === "string" || typeof n2 === "string") {
    return n1.toString() + n2.toString();
  }
  return n1 + n2;
}
const result = Numadd(1, 2);
// result : number
const result2 = Numadd("someText", 2);
// result : string
```

{}를 제외하고 작성이 가능하다. 함수 인자의 타입, 리턴값의 타입을 유연하게 작성이 가능하다.
오버로딩을 통해 간결한 코드로 함수를 재사용 할 수 있게 구현할 수 있다.

### 선택적 체이닝(옵셔널 체이닝)

자바스크립트에서도 존재하는 개념이다. 존재하지 않은 프로퍼티에 접근시 에러가 아닌 undefined를 호출한다.

```javascript
let users = null;

console.log(users?.user); //undefined
console.log(users?.user.name); //undefined
```

### null 병합

```typescript
const fetchingData = null;

const data = fetchingData ?? "default data";
console.log("data : ", data); //default data
//?? 은 앞의 요소가 null, undefined의 값일때 ?? 뒤의 값을 리턴함
// || 는 앞의 요소가 null, undefined에 "" empty string가 추가됨/  뒤의 값을 리턴함
```
