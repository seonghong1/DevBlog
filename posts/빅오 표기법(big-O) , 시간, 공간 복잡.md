---
title: "빅오 표기법(big-O) , 시간, 공간 복잡"
date: "2023-05-20"
image: 빅오.jpeg
excerpt: 자료구조 알고리즘 딱기다리
isFeatured: true
---

### 빅오 표기법(big-O) : 알고리즘의 효율성을 나타내주는 표기법이다. / 최적의 알고리즘을 선택하기 위한 기준

## 시간복잡도

시간 복잡도는 알고리즘을 처리하는 데 얼마의 시간이 걸리는지 알려줍니다. 이런 알고리즘의 시간 복잡도는 주로 빅-오 표기법을 사용하여 나타냅니다.

### O(1) : 입력 데이터 크기와 상관없이 일정한 시간이 걸리는 알고리즘

```javascript
let total = 0;

function addNum(Numarr) {
  total += Numarr[0];
  total += Numarr[1];
}
addNum([1, 2, 3, 4, 5]);
```

### O(n) : 입력 데이터의 크기와 비례해서 처리 시간이 길어지는 알고리즘

```javascript
let total = 0;

function addNum() {
  for (let i = 0; Numarr.length > i; i++) {
    total += Numarr[i];
  }
}
addNum([1, 2, 3, 4, 5]);
```

### O(n^2) : 입력 데이터의 제곱만큼 처리시간이 길어지는 알고리즘

```javascript
let total = 0;

function addNum() {
  for (let i = 0; Numarr.length > i; i++) {
    total += Numarr[i];
    for (let j = 0; i >= j; j++) {
      total += j;
    }
  }
}
addNum([1, 2, 3, 4, 5]);
```

## 공간복잡도

공간복잡도는 작업 수행 시 공간을 얼마나 추가로 사용하는지를 판별. 즉, 알고리즘에 사용되는 메모리의 양을 공간 복잡도라고 합니다.
공간 복잡도에 영향을 미치는 요소는 변수, 자료구조(Data Structure), 함수 호출(Function Call), 할당(Allocation) 네 가지입니다.

### O(1)

```javascript
function booo(n) {
  for (let i = 0; i < n.length; i++) {
    console.log("booo!");
  }
}

booo([1, 2, 3, 4, 5]);
```

### O(n)

```javascript
function arrayOfHiNTimes(n) {
  let hiArray = [];
  for (let i = 0; i < n; i++) {
    hiArray[i] = "hi";
  }
  return hiArray;
}

arrayOfHiNTimes(6); // O(n)
```
