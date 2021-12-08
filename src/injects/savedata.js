const fs = require('fs');

function createSaveDir(path) {
    console.log("Creating Parent Directory")
    fs.mkdirSync(path);
    console.log("Creating CSS Folder")
    fs.mkdirSync(path+'css');
    console.log("Creating Plugins Folder")
    fs.mkdirSync(path+'plugins');
}

function createSaveData() {
    var path = require("os").homedir() + '/Documents/Audius/'
    if (!fs.existsSync(path)){
        createSaveDir(path);
    }
    if (!fs.existsSync(path + 'config.json')) {
        var obj = {
            "name": "Audius Config",
            "version": "1",
            "config": {}
        }
        var jsonContent = fs.readFileSync('model.json'); // Read Model Json for default savedata type
        fs.writeFile(`${path}config.json`, jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("Config file has been saved.");
        });
    } else {
        console.log("Config file already exists.");
        console.log("Skipping creation of config file.");
    }
}

createSaveData()