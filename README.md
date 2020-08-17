# 만다르트

<img width="1224" alt="만다라트1" src="https://user-images.githubusercontent.com/50289067/90371223-9741fb00-e0a9-11ea-8fe3-a16f68b87489.png">

0. 목적
인터넷 강의로 웹개발을 공부하다보면, 잘 짜여진 커리큘럼으로 배울 수 있다는 것은 좋지만 스스로 짠 코드가 얼마되지 않아 실력을 늘리기 어렵다. 내 생애 첫 토이프로젝트로 만다라트를 만들어보려고 한다.

1. 개발기간: 2020.01.03~

2. 만다라트란?

만다라트는 "Manda+La+Art"의 합성어이다.  ‘만다라(曼陀羅)’는 그림이나 도형이 끊임없이 반복되며 펼쳐져 나가는 모양으로 깨달음의 경지를 표현한 불교의 그림에서 착안한 것이라 한다. 이렇게 일정한 패턴을 가진 만다라는 심신을 안정시켜주고, 생각을 정리할 수 있도록 도와준다고 한다.

<img width="479" alt="만다라트예시" src="https://user-images.githubusercontent.com/50289067/90374469-82b43180-e0ae-11ea-9116-f92bd5982c5d.png">

3. 기능
- 모바일과 웹 지원(반응형)
- 유저정보와 내용이 데이터베이스에 저장되어야 함
- 페이지를 옮겨다녀도 작성한 내용은 사라지지 않아야 함(쿠키와 세션 이용)
- 사용자가 테마를 선택하거나, 직접 커스터마이징 할 수 있어야 함

4. 사용스택|

- 프론트엔드
  - html, bootstrap, css
  - javascript
  - ejs : 서버단과의 데이터 교환이 용이하게 함
  
  
- 프레임워크
  - node, express
  
- 데이터베이스
  - mongoDB : 저장할 데이터와 구조가 미리 정해져있어서 SQL 기반의 데이터베이스를 사용해도 되지만, Mongo DB를 막 배운 상태라 응용해보고 싶었다

- 보안
  -bcrypt: 사용자의 패스워드를 bcrypt 라이브러리로 암호화하여 안전하게 해싱하여 저장할 수 있다.
  -Google Oauth : 이미 잘 짜여진 로그인 API를 사용하여 더욱 안전하고 사용자에게 편리한 로그인을 구현할 수 있었다.
  

5. 계획
- adobe XD로 mockup design 구상
- 개발환경과 데이터베이스 셋팅
- 개발 진행

6. 진행 상황


<table style="border: none;">
  <tr>
    <td valign="top"><img width="1200" alt="만다라트1" src="https://user-images.githubusercontent.com/50289067/90371223-9741fb00-e0a9-11ea-8fe3-a16f68b87489.png">
      <h2>메인: 로그인하지 않았을 때</h2>
    </td>
    <td valign="top"><img width="1200" alt="만다라트로그인메인" src="https://user-images.githubusercontent.com/50289067/90374454-7b8d2380-e0ae-11ea-9785-b51152ce12c9.png">
      <h2>메인: 로그인했을 때</h2>
    </td>
  </tr>
  <tr>
    <td valign="top"><img width="1200" alt="만다라트2" src="https://user-images.githubusercontent.com/50289067/90371221-9610ce00-e0a9-11ea-88d1-6183c042abd9.png">
      <h2>로그인(좌)과 회원가입(우) 화면</h2>
      <h4>- 구글 로그인과 일반 로그인 중 선택</h4>
      <h4>- 가입한 회원은 데이터베이스에 저장되고 로그인 후 세션 유지</h4>
    </td>
    <td valign="top"><img width="1200" alt="만다라트가입" src="https://user-images.githubusercontent.com/50289067/90373028-48e22b80-e0ac-11ea-8495-15b2edf621fc.png"> 
    </td>
  </tr>
  <tr>
    <td valign="top"><img width="1200" alt="만다라트테마별" src="https://user-images.githubusercontent.com/50289067/90373021-467fd180-e0ac-11ea-96e3-b396abeba842.png"></td>
    <td valign="top"><h2 style="font-size:18px;">새로운 만다라트 생성</h2>
      <h4>원하는 주제 지정 ex)올해의 목표, 이번달 목표, 계정당 주제 여러개 가능</h4>
      <h4>원하는 테마를 골라서 생성 가능</h4>
      </td>
  </tr>
  <tr>
    <td valign="top"><img width="563" alt="만다라트리얼메인세로" src="https://user-images.githubusercontent.com/50289067/90377015-539fbf00-e0b2-11ea-9187-4bc55d3656b8.png"></td>
    <td valign="top"><h2 style="font-size:18px;">가장 큰 목표 박스</h2>
      <h4>가장 큰 목표를 가운데 적음 ex)공부, 건강, 부자되기 ... </h4>
      <h4>가운데 적힌 목표를 이루기 위한 세부 목표를 나머지 칸에 적어주기 ex)인강듣기, 토이프로젝트 등등</h4>
      <h4>세부목표(인강듣기)를 위한 세부 목표들을 적고 싶다면 화살표를 눌러 페이지 이동</h4>
      <h4>input 칸에 내용을 적고 바깥을 누르면 value가 div로 고정됨 </h4>
      <h4>div를 누르면 input으로 바뀌어 내용 수정 가능 </h4>
      </td>
  </tr>
</table>
- 프론트엔드
  - css 
    - 기본 마무리
    - 반응형 지원
      - 로그인 화면
      - 로그인 후 홈 화면

  - javascript 
    - 메인 계획 박스 
      - 글자 수 제한했음
      - input에서 내용을 작성하다가 밖을 누르면 div로 바뀌도록 함

- 백엔드
  - app의 get과 post 셋팅

- 데이터베이스
  - mongoose에 유저 정보 저장
  - 유저마다 계획표 저장
  
- 보안
  - google oauth 연동
  - 유저 이메일과 비밀번호 bcrypt로 

