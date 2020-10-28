# 만다르트
> node js와 mongo db 이용해서 계획표 만들기


<img width="1200" alt="메인" src="https://user-images.githubusercontent.com/50289067/96835793-04458880-147f-11eb-9291-16689aba45b7.png">

# 인덱스
- [기능](#기능)
- [DEMO](#DEMO)
- [사용스택](#사용스택)
- [반응형](#반응형)

## 만다라트란?

### 일종의 계획표

|          <img width="1500" alt="만다라트예시" src="https://user-images.githubusercontent.com/50289067/96837096-d6f9da00-1480-11eb-8ca0-dac09335a80c.png">| 만다라트는 "Manda+La+Art"의 합성어이다.  ‘만다라(曼陀羅)’는 그림이나 도형이 끊임없이 반복되며 펼쳐져 나가는 모양으로 깨달음의 경지를 표현한 불교의 그림에서 착안한 것이라 한다. 이렇게 일정한 패턴을 가진 만다라는 심신을 안정시켜주고, 생각을 정리할 수 있도록 도와준다고 한다.| 
| ------------------------------------------------------- | :--------------|

---
## 기능
- [메인 화면](#메인 화면)
- [회원 가입 화면](#회원 가입 화면)

---

### 메인 화면

구성은 아래와 같으며 마우스를 가져다 댔을 때 버튼의 아이콘이 돌아감

![main](https://user-images.githubusercontent.com/50289067/97372276-9a9e0200-18f6-11eb-805b-c29e930f4dbf.gif)

---


### 회원 가입 화면

1. 비밀번호를 입력할 때 조건에 부합하는 지 체크해준다. (부합할 때는 초록색, 아닐때는 빨간색)

![signup01](https://user-images.githubusercontent.com/50289067/97374186-1dc15700-18fb-11eb-87f0-a146d6d6e8b6.gif)


2. 에러 메세지

| 이미 존재하는 이메일 | 두개의 패스워드가 매칭되지 않을 때 | 패스워드가 6자리 이하일 때 |
| -------------- | ----------------- | -------------|
| <img width="472" alt="signup01" src="https://user-images.githubusercontent.com/50289067/97392556-65f56f00-1925-11eb-8931-eba40d21aa45.png">| <img width="469" alt="signup02" src="https://user-images.githubusercontent.com/50289067/97392554-655cd880-1925-11eb-827d-82553dc04ebb.png"> | <img width="472" alt="signup03" src="https://user-images.githubusercontent.com/50289067/97392549-62fa7e80-1925-11eb-986b-7f56a970e4c9.png"> |


---


### 로그인 화면

1. 에러 메세지

| 패스워드가 맞지 않을 때 | 등록되지 않은 이메일 |
| -------------- | ----------------- | 
| <img width="445" alt="login01" src="https://user-images.githubusercontent.com/50289067/97394890-131cb700-1927-11eb-8668-587c713bba34.png"> | <img width="469" alt="login02" src="https://user-images.githubusercontent.com/50289067/97394887-10ba5d00-1927-11eb-801b-61f3287b94fa.png"> | 



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

