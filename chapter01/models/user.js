/* 
사용자 정보를 저장하는 모델입니다. 
이메일, 닉네임, 비밀번호를 저장하고, SNS 로그인을 하였을 경우에는 provider와 snsId를 저장합니다.
provider가 local이면 로컬 로그인을 한 것이고, kakao면 카카오로 로그인한 것입니다.
기본적으로 로컬 로그인이라 가정해서 defaultValue를 local로 주었습니다.btn

테이블 옵션으로 timestamps와 paranoid가 true로 주어졌으므로 createdAt, updatedAt, delelteAt 컬럼도 생성됩니다.
*/
module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        email: {
            type: DataTypes.STRING(40),
            allowNull: true,
            unique: true,
        },
        nick: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'local',
        },
        snsId: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
);