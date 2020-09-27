/*
    'Chat' 라는 스키마 모델을 생성하였다.
    채팅방 아이디(room)는 'Room' 스키마와 연결하여 Room 컬렉션의 ObjectId가 들어있다.
    chat 또는 gif를 몽고디비에 Chat 스키마에 저장한다
*/

const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const chatSchema = new Schema({
    room: {
        type: ObjectId,
        required: true,
        ref: 'Room',
    },
    user: {
        type: String,
        required: true,
    },
    chat: String,
    gif: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Chat', chatSchema);
