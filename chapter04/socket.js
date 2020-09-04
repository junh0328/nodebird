const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });   //웹 소켓 서버

    wss.on('connection', (ws, req) => {
        //req.headers['x-forwarded-for'] || req.connection.remoteAddress는 클라이언트의 IP를 알아내는 방법 중 하나이다. 
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속', ip);
        ws.on('message', (message) => {     // 클라이언트로 부터 메세지가 왔을 때 발생하는 이벤트 리스너
            console.log(message);
        });
        ws.on('error', (error) => {         // 웹 소켓 연결 중 문제가 생겼을 때 발생하는 이벤트 리스너
            console.error(error);
        });
        ws.on('close', () => {              // 클라이언트와 연결이 끊겼을 때 발생하는 이벤트 리스너, interval 메소드를 clearInterval로 종료시킴
            console.log('클라이언트 접속 해제', ip);
            clearInterval(ws.interval);
        });
        const interval = setInterval(() => {    // 3초마다 연결된 모든 클아이언트에게 메시지를 보내는 메소드 interval
            if (ws.readyState === ws.OPEN) {
                ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
            }
        }, 3000);
        ws.interval = interval;
    });
}