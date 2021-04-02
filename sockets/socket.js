const { io } = require('../index');

const { verificarJWT } = require('../helpers/jwt');
const { userOnline, userOffline } = require('../controllers/user.status');
const { saveMessage } = require('../controllers/chat');

// Socket
io.on('connection', client => {
    console.log("Cliente conectado");

    const token = client.handshake.headers['x-token'];
    const [valido, uid] = verificarJWT(token);

    if (!valido) return client.disconnect();

    userOnline(uid);

    client.join(uid);

    client.on('private-chat', async (payload) => {
        await saveMessage(payload);
        io.to(payload.to).emit('private-chat', payload);
    });

    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => {
        userOffline(uid);
        console.log("Cliente desconectado");
    });

    client.on('message', (payload) => {
        console.log(`Recibiendo mensaje`, payload);
        io.emit('message', { status: 200 })
    });
});