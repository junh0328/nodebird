/*
게시글 모델은 게시글 내용과 이미지 경로를 저장합니다. 
게시글 등록자의 아이디를 담은 컬럼은 나중에 관계를 설정할 때 시퀄라이즈가 알아서 생성해줍니다.
*/

module.exports = (sequelize, DataTypes) => (
    sequelize.define('post', {
        content: {
            type: DataTypes.STRING(140),
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
);

/*
paranoid: true 옵션은 timestamps: true일 때 사용할 수 있는 기능입니다.
createdAt, updatedAt, deletedAt이라는 컬럼을 post 테이블에 추가하게 됩니다.
후에 로우를 삭제하는 시퀄라이즈 명령을 내렸을 때 로우를 제거하는 대신, deletedAt에 제거된 날짜를 입력합니다.
로우를 조회하는 명령어를 내렸을 때는 deletedAt값이 null인 로우를 조회합니다. (삭제되지 않았다는 것을 의미)
*/