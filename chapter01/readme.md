# 폴더 소개

- npm i sequelize mysql2 >> 실행 시, node_moduls와 package-lock.json 생성
- sequelize inti >> 호출 시, ●config, ●migrations, ●models, ●seeders 폴더 생성
- npm i dotenv : 비밀키를 하드코딩하면 소스 코드가 유출되었을 때 키도 같이 유출되므로 별도로 관리해야 합니다. 이를 위한 패키지가 dotenv입니다. 
비밀키는 .env라는 파일에 모아두고, dotenv가 .env 파일을 읽어 process.env 객체에 넣습니다.
- npm i multer : 이미지 업로드를 구현하기 위한 모듈을 추가

● views : 템플릿 파일을 넣을 폴더
● passport : 패스포트 패키지를 위한 폴더
● routes : 라우터를 넣을 폴더
● public : 정적 파일을 넣을 폴더

● models
- user.js : 사용자 정보를 저장하는 모델
- post.js : 게시글 내용과 이미지 경로를 저장하는 모델
- hashtag.js : 태그 이름을 저장합니다. 나중에 태그로 검색하기 위해서 따로 저장하는 것

★ 꿀 팁
- require(./passport')는 require('./passport/index.js')와 같습니다. 폴더 내의 index.js파일은 require시 이름을 생략할 수 있습니다.
- passport.initialize() 미들웨어는 요청(req 객체)에 passport 설정을 삼고, 
- passport.session() 미들웨어는 req.session 객체에 passport 정보를 저장합니다.
- req.session 객체는 express-session에서 생성하는 것이므로 passport 미들웨어는 express-session 미들웨어보다 뒤에 연결해야 합니다.

★ 로그인 과정
- 로그인 요청이 들어옴
- passport.authenticate 메서드 호출
- 로그인 전략 수행
- 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
- req.login 메서드가 passport.serializeUser 호출
- req.session에 사용자 아이디만 저장
- 로그인 완료

★ 로그인 이후 과정
- 모든 요청에 passport.session() 미들웨어가 passport.deserializeUser 메서드 호출
- req.session에 저장된 아이디로 데이터베이스에서 사용자 조회
- 조회된 사용자 정보를 req.user에 저장
- 라우터에서 req.user 객체 사용 가능

★ 카카오 로그인 api 사용하기
https://velog.io/@devmin/kakao-login-basic

★  sequelize 오류
- sequelize : 'sequelize' 용어가 cmdlet, 함수, 스크립트 파일 또는 실행할 수 있는 프로그램 이름으로 인식되지 않습니다. 이름이 정확한지 확인하고 경로가 포함된 경우 경로가 올바른지 검증한 다음 다시 시도하십시오.

- npm i -g sequelize-cli 로 sequelize-cli를 사용하겠다고 명령
- sequelize init 실행

- 후에 sequelize db:create 로 config.json에 연결하고싶은 디비와 연결