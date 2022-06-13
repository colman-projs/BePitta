const { getIo } = require('./globals');
const { groupDAL } = require('./controllers/group');
const { updateUsersNotReadyByGroup } = require('./controllers/client');

const io = getIo();

const participantsUpdated = (groupId, users) => {
    if (!users) return;

    const waitingUsers = users.filter(u => u.isReady);
    console.debug(`users: ${users.length}, ready: ${waitingUsers.length}`);
    io.to(groupId).emit(
        'participants-updated',
        users.length,
        waitingUsers.length,
    );

    if (users.length == waitingUsers.length) {
        // Update all users to isReady false
        updateUsersNotReadyByGroup(groupId);

        io.to(groupId).emit('reasults-ready');
    }
};

const connectToGroup = async (socket, groupId, clientId) => {
    // save user to group in DB
    await groupDAL.addUserToGroup(groupId, clientId);
    const grp = await groupDAL.getGroupById(groupId);

    socket.join(groupId); // Connect client to group room

    participantsUpdated(groupId, grp?.users);

    return grp;
};

const userLeaveGroup = async (socket, groupId, clientId) => {
    // save user left group in DB
    groupDAL.removeUserFromGroup(groupId, clientId);
    const grp = await groupDAL.getGroupById(groupId);

    socket.leave(groupId);
    participantsUpdated(groupId, grp?.users);
};

const setIoForUser = () => {
    io.on('connect', function (socket) {
        console.debug(`new user (socket: ${socket.id})`);

        let _groupId = null;
        let _clientId = null;

        socket.on('group-connect', async function (groupId, clientId) {
            console.debug(`user ${clientId} connect to group ${groupId}`);

            _groupId = groupId;
            _clientId = clientId;
            connectToGroup(socket, _groupId, _clientId);
        });

        socket.on('user-waiting', async function (groupId, clientId) {
            console.debug(
                `user ${clientId} is waiting for group ${groupId} to finish`,
            );
            let grp;
            if (_clientId !== clientId || _groupId !== groupId) {
                if (_clientId && _groupId)
                    userLeaveGroup(socket, _groupId, _clientId);

                _groupId = groupId;
                _clientId = clientId;

                if (_clientId && _groupId) {
                    grp = connectToGroup(socket, _groupId, _clientId);
                }
            } else {
                grp = await groupDAL.getGroupById(_groupId);
            }

            participantsUpdated(groupId, grp?.users);
        });

        socket.on('user-leave-group', function () {
            if (_clientId && _groupId) {
                console.debug(`user ${_clientId} left group ${_groupId}`);
                userLeaveGroup(socket, _groupId, _clientId);
            }
        });

        socket.on('disconnect', function () {
            if (_clientId && _groupId) {
                console.debug(
                    `disconnecting ${_clientId} from group ${_groupId}`,
                );
                userLeaveGroup(socket, _groupId, _clientId);
            }
        });
    });
};

module.exports = {
    setIoForUser,
};
