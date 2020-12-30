const crypto = require('crypto');
const ssid = crypto.randomBytes(20).toString('hex');

console.log(ssid);