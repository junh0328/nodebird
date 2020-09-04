const SocketIO = require('socket.io');

module.exports = (server) => {
    const io = SocketIO(server, { path: '/socket.io' });   //웹 소켓 서버

    io.on('connection', (socket) => {
        const req = socket.request;
        //req.headers['x-forwarded-for'] || req.connection.remoteAddress는 클라이언트의 IP를 알아내는 방법 중 하나이다. 
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속', ip, socket.id, req.ip);
        socket.on('disconnect', () => {
            console.log('클라이언트 접속 해제', ip, socket.id);
            clearInterval(socket.interval);
        });
        socket.on('error', (error) => {         // 웹 소켓 연결 중 문제가 생겼을 때 발생하는 이벤트 리스너
            console.error(error);
        });
        socket.on('reply', (data) => {
            console.log(data);
        });
        socket.interval = setInterval(() => {    // 3초마다 연결된 모든 클아이언트에게 메시지를 보내는 메소드 interval
            socket.emit('news', 'Hello Socket.IO');
        }, 3000);
    });
};