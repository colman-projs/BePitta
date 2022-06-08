const auth = require('../config/auth.config.js');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(auth.web.client_id);

async function verifyToken(req, res, next) {
    // const token = req.cookies['userCradentials']

    //  if (!token) {
    //     return res.status(403).send({ message: 'No token provided!' });
    // }
    // const ticket = await client.verifyIdToken({
    //     idToken: token,
    //     requiredAudience: auth.web.client_id,
    // })

    // const payload = ticket.getPayload();
    // const userid = payload['sub'];

    // if(userid){
    //     req.userId = userid;
    //     next();
    // }else{
    //     return res.status(401).send({ message: 'Unauthorized!' });
    // }
    next();
}

module.exports = {
    verifyToken,
};
