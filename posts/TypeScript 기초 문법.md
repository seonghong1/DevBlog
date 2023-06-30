---
title: "TypeScript 기초 문법"
date: "2023-04-02"
image: typescript.png
excerpt: TypeScript 기초 문법 정리
isFeatured: true
---

# 1. 타입추론

- 변수에 타입이 선언이 되어있지 않는 경우에는 코드를 읽고 타입을 유추해낸다.(할당값을 바탕으로 타입추론)

```typescript
// ex)
let a = 5;
a = 10;
//변수 a 타입은 number

// error
// a = "text"
```

# 2. 타입명시

- 변수를 선언할 때 변수의 값의 타입을 명시(변수 값의 데이터 타입을 지정)

```typescript
// ex)
let text:string = "안녕"
//변수 text 타입은 string

function getStudentDetails(studentId:numeber):object{
	return {null}
}
// 매개변수에 타입지정
// 반환되는 return에 타입도 명시할 수 있음 매개면수 옆에 :타입명
function getStudentDetails(studentId:numeber):void{

}
// 반환되는 return값이 없는 경우 :viod 로 명시해준다.
// void와 any가 아닌 경우에는 반드시 return 값이 존재해야된다.
```

# 3. interface

```typescript
// 객체 타입을 반환한다
function getStudentDetails(studentId:numeber):object{
	return {null}
}

//반환되는 객체를 좀 더 자세히 명시할 수 있다.
function getStudentDetails(studentId:numeber):{
	id:number,
   	name:string,
  	age:number,
    checked: boolean
}{
	return {null}
}
```

interface는 위와 같은 문제를 해결해준다.

- 인터페이스의 이름은 대문자로 시작한다
- 인터페이스를 타입으로 가지는 값은 인터페이스의 구조를 그 값으로 가지도록 강제된다.
- 코드의 재사용성이 증가한다
- 인터페이스는 코드가 랜더링 될 때 아무런 영향을 끼치지 않기 때문에 컴파일하지 않는다.

인터페이스 선언

```typescript
interface Profile {
  id: number;
  name: string;
  age: number;
  checked: boolean;
}
```

함수의 리턴 값에 인터페이스 적용하기

```typescript
function getStudentDetails(studentId:numeber):Profile{
	return {null}
}
//getStudentDetails 함수의 반환값은 반드시 Profile에 정의된 프로퍼티를 모두 받아야된다
// 프로퍼티가 null이여도 상관 없는 값은 프로퍼티 옆에? 를 붙여준다.
interface Profile{
  	id:number,
   	name:string,
  	age?:number,
    checked: boolean
}
```

함수의 매개변수에 인터페이스 적용하기

```typescript
function saveStudentDetails(studentId: Profile): void {}
// 1. 매개변수에 직접 값 넣기
saveStudentDetails({
  id: 1,
  name: "김김김",
  age: 23,
  checked: true,
});
// 2. 변수에 할당하고 변수를 넣기
let student = {
  id: 1,
  name: "김김김",
  age: 23,
  checked: true,
};
saveStudentDetails(student);
```

함수를 인터페이스에서 정의하기

```typescript
interface Profile{
  	id:number,
   	name:string,
  	age?:number,
    checked: boolean
  	// 두가지 방법으로 표현 가능
  	addComment: (comment:string): string,
  	addComment:	(comment:string) => string
	// comment라는 매개변수를 갖고 있으며 type은 string이다. 반환되는 값의 type은 		   string이다.
}
```

Readonly 프로퍼티

- 읽기 전용 프로퍼티로 객체를 생성할때 할당된 프로퍼티의 값은 바꿀 수 없다.
- readonly 프로퍼티명 : type 형태이다.

```typescript
interface Profile{
  	readonly id:number,
   	name:string,
  	age?:number,
    checked: boolean
  	addComment: (comment:string): string,
  	addComment:	(comment:string) => string
}

function saveStudentDetails(studentId:Profile):void{
    // error 읽기전용임
	studentId.id = 3
}

saveStudentDetails({
  	id:1,
   	name:"김김김",
  	age:23,
    checked: true
})
```

# 열거형 (Enum)과 리터럴 타입

열거형(Enum)

- 컴파일시 실제 enum코드가 보임, 런타임시 실존하는 코드

```typescript
// enum을 통해 선언하고 {} 내부에 선택지로 사용할 값들을 넣어준다.
enum GenderType {
  Mail,
  Femail,
}

interface Profile {
  readonly id: number;
  name: string;
  age?: number;
  // enum으로 선언한 GenderType을 type으로 넣어준다.
  gender: GenderType;
  checked: boolean;
}

function saveStudentDetails(studentId: Profile): void {}

saveStudentDetails({
  id: 1,
  name: "김김김",
  age: 23,
  // gender프로퍼티의 value는 enum으로 선언한 GenderType의 값들만 사용할 수 있음
  gender: GenderType.Mail,
  checked: true,
});
```

숫자형 enum과 문자형 enum

```typescript
// enum을 통해 선언하고 {} 내부에 선택지로 사용할 값들을 넣어준다.
enum GenderType {
  Mail,
  Femail,
}
// 컴파일시 숫자로 구분되어 코드가 나타난다.
GenderType[Mail] = 0;
GenderType[Femail] = 1;

//문자형 enum
enum GenderType {
  Mail = "mail",
  Femail = "femail",
}
GenderType[Mail] = "mail";
GenderType[Femail] = "femail";
```

리터럴 타입

- enum보다 읽기 쉽고 간편하다.

```typescript
// enum을 통해 선언하고 {} 내부에 선택지로 사용할 값들을 넣어준다.
interface Profile {
  readonly id: number;
  name: string;
  age?: number;
  // 리터럴 타입은 파이프라인(|)으로 구분해준다.
  gender: "mail" | "femail";
  checked: boolean;
}

function saveStudentDetails(studentId: Profile): void {}
saveStudentDetails({
  id: 1,
  name: "김김김",
  age: 23,
  //mail과 femail이외의 문자를 입력시 에러가 나타난다.
  gender: "mail",
  checked: true,
});
```

# 4. Any타입, Union 타입

Any type

- 어떠한 타입이든지 할당 가능하다. 타입체크 x
- any타입은 지양함

```typescript
let someValue: any;
```

Union type

- 타입이 한가지가 아닌 두가지 이상으로 명시할때 사용한다.

```typescript
// 리터럴 타입과 동일하게 |(파이프라인) 으로 구분한다.
let someValue: number | string;
somValue = 5;
somValue = "안녕";

//error
somValue = false;
```

Type Aliases

- union타입으로 으로 정의된 type 조합이 반복될경우
- number | string 코드가 계속 반복됨, 코드를 타입으로 지정하고 재활용이 필요

```typescript
// 반복되는 number | string 코드
let someValue: number | string;

function someText(num: number | string): number | string {
  return null;
}
function someText(num: number | string): void {}

// Type Aliases
// type키워드를 사용하여 타입을 선언 할 수 있다.
type SrtOrNum = number | string;

let someValue: SrtOrNum;

function someText(num: SrtOrNum): SrtOrNum {
  return null;
}
function someText(num: SrtOrNum): void {}
```

타입가드

```typescript
type SrtOrNum = number | string;

let first: number;

function anyNum(aanum: SrtOrNum) {
  // first 부분에 에러표시가 나온다.
  // aanum의 타입이 string인 경우 first에 할당될 수 없기때문에
  return (first = aanum);
}
anyNum(50);

// Typeof Operator Typeof연산자와 조건문을 같이 사용
// 변수의 데이터 타입을 반환 하는 연산자이다.

type SrtOrNum = number | string;

let first: number;

function anyNum(aanum: SrtOrNum) {
  // aanum의 타입이 string일 경우
  // typeof연산자를 사용해 코드를 한번 더 검증하면 에러가 발생하지 않는다.
  if (typeof aanum === string) {
    return (first = 0);
  } else {
    return (first = aanum);
  }
}
anyNum(50);
// Typeof말고도 다양한 타입가드 방법이 있다.
// typescript type guards라고 검색하면 나온다.
```

https://www.youtube.com/watch?v=lmjQh2LrH94&list=PLJf6aFJoJtbUXW6T4lPUk7C66yEneX7MN&index=7

챕터 7까지 들음
8부터 들으면됨

# 5.함수의 타이핑

- 함수의 타입 명시을 명시할 수 있다.

1. 함수의 반환(return)타입

```typescript
// 매개변수 ()뒤에 : 로 명시해준다.

// console.log 처럼 return값이 없는 경우 :void
function sendMsg (user, msg):void  {
	console.log(${user},${msg})
}

sendMsg("아무개", "안녕하세야")

// return값이 string인경우
function sendMsg (user, msg):striong  {
	return `${user} ${meg}`
}
sendMsg("아무개", "안녕하세야")

// return 값이 배열이고 요소들이 string인 경우
function sendMsg (user, msg):sting[]  {
	return [user, msg]
}
sendMsg("아무개", "안녕하세야")

```

2. 함수의 매개변수의 타입

```typescript
// 매개변수 옆에 : 로 타입을 명시해준다.
function sendMsg (user:string, msg:string):void  {
	console.log(${user},${msg})
}

sendMsg("아무개", "안녕하세야")
// error, msg:string msg는 스트링 값만 받을 수 있다.
sendMsg("아무개", 1)
```

- 선택적 매개 변수
  ts 함수의 매개변수는 모두 필요하다는 전재 조건이 있음
  컴파일시 함수의 매개변수와 호출할때의 매개변수를 검사함(개수가 일치하지 않으면 에러)

```typescript
// 선택적 매개변수를 적용하기
// msg매개변수 옆에 ? 를 붙여주면 됨
function sendMsg (user:string, msg?:string):void  {
	console.log(${user},${msg})
}

sendMsg("아무개")
// 앞선 interface에서 선택적 프로퍼티와 동일한 방법

-------------------------------------------------------------------------------
// 변수가 여러개이고 선택적 매개변수가 있는 경우

// 반드시 필수 매개변수 뒤에 선택적 매개변수를 넣어주어야 한다.
// 중간에 선택적 매개변수가 있는 경우 뒤에 모든 매개변수는 선택적 매개변수가 된다.
function sendMsg (id:string, user:string, age?:number, msg:string):void  {
	console.log(${user},${msg})
}
```

- 매개변수의 default값

```typescript
function sendMsg (user:string, msg?:string):void  {
	console.log(`${user}, ${msg}`)
}

// 아무런 값이 전달되지 않을때 undefined가 출력된다.
sendMsg("아무개")
// 아무개, undefined



// 매개변수의 default값 적용
// 매개변수 뒤에 =defaultValue 형식으로 넣어주면 된다
// msg:sting="안녕하세요!" 에서 ts의 타입추론으로 :sting를 생략시켜줘도 된다.
function sendMsg (user:string, msg="안녕하세요!"):void  {
	console.log(`${user}, ${msg}`)
}

sendMsg("아무개")
-------------------------------------------------------------------------------------
// 화살표함수
const sendMsg = (user:string, msg="안녕하세요!"):void => console.log(`${user}, ${msg}`)

sendMsg("아무개")
// 1:아무개, 안녕하세요!
```

# 6. Class

- 객체치향이란?
  : 연관된 변수와 함수들을 한 덩어리로 묶어서 구조화하여 표현하는 프로그래밍 스타일
  : 어플리케이션을 실제 세상에 존재하는 객체와 같은 단위로 쪼개고 객체들이 서로 상호 작용함으로써 시스템이 동작

object는 Class를 통해 생성이 가능하고, Class는 객체를 만들어 내기 위한 정보, 틀이다.

```typescript
class Person{
  name:string,
  age:number,
  job:string,

  //class의 프로퍼티에 접근은 this.프로퍼티 형식으로 할 수 있다.
  printPerson = ()=>{
  	console.log(`이름은 ${this.name}이고 나이는 ${this.age}세, 직업은 ${this.job}이다.`)
  }
}
// class를 사용해 객체 생성은 new 키워드를 통해 생성이 가능하다 (생성자 함수)
// const 객체명 = new class명()
const person1 = new Person()
person1.printPerson()
// 이름은 undefined이고 나이는 NaN세, 직업은 undefined이다.
// 객체를 생성하고 프로퍼티의 값이 할당되어지지 않았기 때문.

----------------------------------------------------------------------
const person1 = new Person()

person1.name = "멋쟁이"
person1.age = 23
person1.job = "개발자"
// 함수를 호출하기 전, 프로퍼티의 값을 할당해준다.
person1.printPerson()
// 이름은 멋쟁이이고 나이는 23세, 직업은 개발자이다.
```

# 6. Class( constructor, 접근 제한자, getter, setter )

- constructor
- class를 사용해 객체를(new class명) 생성할때 호출되며 객체의 초기화를 담당한다.

```typescript
class Person{
  name:string,
  age:number,
  job:string,

  printPerson = ()=>{
  	console.log(`이름은 ${this.name}이고 나이는 ${this.age}세, 직업은 ${this.job}이다.`)
  }
}
const person1 = new Person()
person1.name = "멋쟁이"
person1.age = 23
person1.job = "개발자"
person1.printPerson()
// 이름은 멋쟁이이고 나이는 23세, 직업은 개발자이다.

// 위의 코드를 constructor를 사용하면
class Person{
  name:string,
  age:number,
  job:string,
  constructor(name:string, age:number, job:string){
    this.name = name;
    this.age = age;
    this.job = job
  }
  printPerson = ()=>{
  	console.log(`이름은 ${this.name}이고 나이는 ${this.age}세, 직업은 ${this.job}이다.`)}}
const person1 = new Person("멋쟁이", 23, "개발자")
person1.printPerson()
// 이름은 멋쟁이이고 나이는 23세, 직업은 개발자이다.
```

- class를 사용해 객체를 생성할때 new class명() 의 매개변수는 constructo의 매개변수로 전달된다
- constructor의 매개변수를 선택적 매개변수로 하고싶을땐 ? 를 사용해 가능하다.

- 접근제한자
  public, private, protected
  default값은 public임.

- public
- class 외부에서 접근 가능

```typesctipt


```

- private
- class 내에서만 접근가능, 외부에서 접근 불가

```typesctipt


```

- protected
- class 내, 상속받은 자식 클라스에서 접근 가능

```typescript
class Person{
  private _name:string,
  age:number,
  job:string,
  constructor(name:string, age:number, job:string){
    this.name = name;
    this.age = age;
    this.job = job
  }
  printPerson = ()=>{
  	console.log(`이름은 ${this.name}이고 나이는 ${this.age}세, 직업은 ${this.job}이다.`)}}
const person1 = new Person("멋쟁이", 23, "개발자")
person1.printPerson()

//error
person1.name = "바보"
//error
console.log(person1.name)
```

private된 값은 재선언은 물론 읽기 쓰기 조차 제한이 된다.

- 비공개 프로퍼티는 암묵적으로 프로퍼티 앞에 \_를 붙여준다.

- getter과 setter을 사용해 읽기 쓰기(재할당)를 할 수 있다.

```typescript
class Person{
  private _name:string,
  age:number,
  job:string,
  constructor(name:string, age:number, job:string){
    this.name = name;
    this.age = age;
    this.job = job
  }
  printPerson = ()=>{
  	console.log(`이름은 ${this.name}이고 나이는 ${this.age}세, 직업은 ${this.job}이다.`)}}
const person1 = new Person("멋쟁이", 23, "개발자")
person1.printPerson()

get name(){
	return this._name;
}
set name(value: string){
	return this._name = value;
}
// person 객체의 _name을 부를게 아니라
// get 객체의 name에 접근하는것 이다.
console.log(person1.name)
// set name에 접근 매개변수에 값을 통해 재할당 가능
person1.name("아무개")
```

- constructor에 접근 제한자를 넣고 코드를 간결하게 작성하기

```typescript
class Person {
  //객체가 생성될때 컨스트럭터의 매개변수로 전달된 값은 객체의 프로퍼티로 자동으로 할당됨
  constructor(private _name: string, private age: number, public job: string) {}
  printPerson = () => {
    console.log(
      `이름은 ${this.name}이고 나이는 ${this.age}세, 직업은 ${this.job}이다.`
    );
  };
}
const person1 = new Person("멋쟁이", 23, "개발자");

/*
person.name - 멋쟁이
person.age - 23
person.job - 개발자
*/
```
