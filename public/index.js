$(function () {
    const socket = io();

    const messagesList = $('#messages');

    const chatMsgEventStr = 'chat message';
    const systemMsgEventStr = 'system message';

    const addMsgCallback = function (msg) {
        messagesList.append($('<li>').text(msg));
    };
    const addSysMsgCallback = function (msg) {
        messagesList.append($('<li>').text(msg).css('color', 'red'));
    };

    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading

        const msgInputField = $('#message-input');
        let formattedMsg;
        if (msgInputField.val()) {
            if (msgInputField.val().includes(' ')) {
                addMsgCallback('tonkata > ceko');
                return;
            }
            if ((formattedMsg = msgInputField.val().trim()) === '') {
                return;
            }
        }

        const nicknameField = $('#nickname-input');
        let formattedNickname;
        if (nicknameField.val()) {
            if (nicknameField.val().includes(' ')) {
                addMsgCallback('az sum ceko i qm pi6ki');
                return;
            }
            if ((formattedNickname = nicknameField.val().trim()) === '') {
                return;
            }
        }

        const finalMsg = formattedNickname + ': ' + formattedMsg;
        addMsgCallback(finalMsg);
        socket.emit(chatMsgEventStr, finalMsg);

        msgInputField.val('');

        return false;
    });

    socket.on(chatMsgEventStr, addMsgCallback);
    socket.on(systemMsgEventStr, addSysMsgCallback);
});