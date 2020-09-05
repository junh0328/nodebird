/*
    방 제목, 최대 수용인원, 방장, 비밀번호를 설정한 Room 스키마 모델을 만들었다.
    password는 required 속성이 없으므로 꼭 넣지 않아도 되며, 비밀번호를 설정한다면 비밀방, 설정하지 않으면 공개방입니다.
*/
const mongoose = require('mongoose');

const { Schema } = mongoose;
const roomSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    max: {
        type: Number,
        required: true,
        default: 10,
        min: 2,
    },
    owner: {
        type: String,
        required: true,
    },
    password: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Room', roomSchema);
