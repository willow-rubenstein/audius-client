const fs = require('fs');
var path = require("os").homedir() + '/Documents/Audius/';


function readData() {
    var AUDIUS_CONFIG = JSON.parse(fs.readFileSync(path+"config.json"));
    var CONFIG_OUT = {}
    if (AUDIUS_CONFIG.isCustomCssEnabled) {
        CONFIG_OUT['customCSS'] = true;
    } else {
        CONFIG_OUT['customCSS'] = false;
    }
}


