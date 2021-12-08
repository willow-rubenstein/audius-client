const fs = require('fs');
var path = require("os").homedir() + '/Documents/Audius/';

module.exports = {
    readData: function readData() {return JSON.parse(fs.readFileSync(path+"config.json")).options}
};