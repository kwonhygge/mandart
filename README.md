# 만다르트
> node js와 mongo db 이용해서 계획표 만들기


<img width="1200" alt="메인" src="https://user-images.githubusercontent.com/50289067/96835793-04458880-147f-11eb-9291-16689aba45b7.png">

# 인덱스
- [기능](#기능)
- [DEMO](#DEMO)
- [사용스택](#사용스택)
- [반응형](#반응형)

## 만다라트란?

### 목표를 달성하기 위한 세부 목표를 정리하는 계획표이다. 아래는 이해를 돕기 위한 예시이다.

|          <img width="800" alt="만다라트예시" src="https://user-images.githubusercontent.com/50289067/96837096-d6f9da00-1480-11eb-8ca0-dac09335a80c.png">| 가장 큰 목표는 가운데에 적힌 '취미 가지기'이다. 그 주변의 8칸에 원하는 취미들(수영, 자전거 등)을 적는다. 왼쪽 위부터 세부목표인 '수영'을 위한 8가지 달성방안(수영장 등록, 발차기 30분 등)을 적어나간다. 
| ------------------------------------------------------- | :--------------|

---
## 기능
- [홈](#홈)
- [회원가입](#회원가입)
- [로그인](#로그인)
- [리스트](#리스트)
- [추가](#추가)
- [수정/삭제](#수정)

---

### 홈

구성은 아래와 같으며 마우스를 가져다 댔을 때 버튼의 아이콘이 돌아감

![main](https://user-images.githubusercontent.com/50289067/97372276-9a9e0200-18f6-11eb-805b-c29e930f4dbf.gif)

---


### 회원가입

1. 비밀번호를 입력할 때 조건에 부합하는 지 체크해준다. (부합할 때는 초록색, 아닐때는 빨간색)

![signup01](https://user-images.githubusercontent.com/50289067/97374186-1dc15700-18fb-11eb-87f0-a146d6d6e8b6.gif)


2. 에러 메세지

| 이미 존재하는 이메일 | 두개의 패스워드가 매칭되지 않을 때 | 패스워드가 6자리 이하일 때 |
| -------------- | ----------------- | -------------|
| <img width="472" alt="signup01" src="https://user-images.githubusercontent.com/50289067/97392556-65f56f00-1925-11eb-8931-eba40d21aa45.png">| <img width="469" alt="signup02" src="https://user-images.githubusercontent.com/50289067/97392554-655cd880-1925-11eb-827d-82553dc04ebb.png"> | <img width="472" alt="signup03" src="https://user-images.githubusercontent.com/50289067/97392549-62fa7e80-1925-11eb-986b-7f56a970e4c9.png"> |


---


### 로그인

1. 에러 메세지

| 패스워드가 맞지 않을 때 | 등록되지 않은 이메일 |
| -------------- | ----------------- | 
| <img width="300" alt="login01" src="https://user-images.githubusercontent.com/50289067/97394890-131cb700-1927-11eb-8668-587c713bba34.png"> | <img width="300" alt="login02" src="https://user-images.githubusercontent.com/50289067/97394887-10ba5d00-1927-11eb-801b-61f3287b94fa.png"> | 

### 리스트

1. 예시 계획표 - 회원가입 후 자동으로 생성됨
![list01](https://user-images.githubusercontent.com/50289067/97397180-02227480-192c-11eb-982e-133ef7717f52.gif)

2. 오른쪽 아래 플러스 버튼을 눌렀을 때 - 만다라트를 잘 몰라도 직관적으로 적어낼 수 있는 단계별 모달창들

| <img width="800" alt="list_modal01" src="https://user-images.githubusercontent.com/50289067/97399932-81667700-1931-11eb-96f7-38b346ae56f1.png"> | 1. 6가지 테마 중 하나를 고른다. |
| ---------- | ------- |
| <img width="800" alt="list_modal02" src="https://user-images.githubusercontent.com/50289067/97399929-80cde080-1931-11eb-8447-ea74592bdaff.png"> | 2. 계획표의 주제를 정한다. |
| <img width="800" alt="list_modal03" src="https://user-images.githubusercontent.com/50289067/97399928-80354a00-1931-11eb-8d2a-f5a40f142264.png"> | 3. 가장 큰 목표를 정한다. |
| <img width="800" alt="list_modal04" src="https://user-images.githubusercontent.com/50289067/97399925-7f9cb380-1931-11eb-9655-f50dfb8d7bd1.png"> | 4. 그것을 이루기 위한 세부 목표를 정한다. |
| <img width="800" alt="list_modal05" src="https://user-images.githubusercontent.com/50289067/97399922-7ca1c300-1931-11eb-8bbd-09fc05c5e33c.png"> | 5. 성공적으로 생성 |

---

### 추가



---

### 수정



# 반응형

## 모바일




---


## 사용스택

- 프론트엔드
  - 템플릿엔진(ejs) : 서버단에서 받은 데이터를 조작하기 용이함
  
- 프레임워크
  - node, express : 비동기 프로그래밍 기반의 좋은 성능과 JSON을 지원하는 Javascript의 생산성, 활발한 커뮤니티 등의 장점을 가졌기 때문에 사용하게 되었다.
  
- 데이터베이스
  - mongoDB : 지금은 데이터 구조가 정해져있지만 후에 다른 기능이 추가되면서 새롭게 구성해야 할 수도 있다. 따라서, 유연한 DB 스키마를 가지고 있는 No SQL을 이용할 필요성을 느꼈다. 

- 보안
  - passport : 검증된 미들웨어로 세션과 쿠키 등을 쉽게 처리할 수 있고, 후에 구글 로그인과 같은 다양한 OAuth 인증을 활용할 때 비교적 통일된 구조로 사용할 수 있다.
  - bcrypt: 사용자의 패스워드를 bcrypt 라이브러리로 암호화하여 안전하게 해싱하여 저장할 수 있다.
  - Google Oauth : 이미 잘 짜여진 로그인 API를 사용하여 더욱 안전하고 사용자에게 편리한 로그인을 구현할 수 있었다. (구현 중)

- 디자인
  - Figma로 [디자이너](https://kwonhygge.github.io/portfolio_sohee/)와 협업

---

## DEMO
https://mandart.herokuapp.com/

