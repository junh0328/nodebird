# 폴더 소개

- npm i sequelize mysql2 >> 실행 시, node_moduls와 package-lock.json 생성
- sequelize inti >> 호출 시, config, migrations, models, seeders 폴더 생성
- npm i dotenv : 비밀키를 하드코딩하면 소스 코드가 유출되었을 때 키도 같이 유출되므로 별도로 관리해야 합니다. 이를 위한 패키지가 dotenv입니다. 
비밀키는 .env라는 파일에 모아두고, dotenv가 .env 파일을 읽어 process.env 객체에 넣습니다.

- views : 템플릿 파일을 넣을 폴더
- passport : 패스포트 패키지를 위한 폴더
- routes : 라우터를 넣을 폴더
- public : 정적 파일을 넣을 폴더