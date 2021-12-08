import fs from 'fs';

function createSaveDir(path:string) {
    console.log("Creating Parent Directory")
    fs.mkdirSync(path);
    console.log("Creating CSS Folder")
    fs.mkdirSync(path+'css');
    console.log("Writing css file using model.css as a template")
    let css = fs.readFileSync("./model.css")
    fs.writeFileSync(path+'css/theme.css', css)
    console.log("Creating Plugins Folder")
    fs.mkdirSync(path+'plugins');
}

function createCssTheme(path:string) {
    fs.mkdirSync(path+'css');
    console.log("Writing css file using model.css as a template")
    let css = fs.readFileSync("./model.css")
    fs.writeFileSync(path+'css/theme.css', css)
}

export function saveDoesExist() {
    var path = require("os").homedir() + '/Documents/Audius/'
    return fs.existsSync(path + 'config.json');
}

export function createSaveData() {
    var path = require("os").homedir() + '/Documents/Audius/'
    if (!fs.existsSync(path)){
        createSaveDir(path);
    } else if (!fs.existsSync(path+'css/theme.css')) {
        createCssTheme(path)
    }
    if (!fs.existsSync(path + 'config.json')) {
        var jsonContent = fs.readFileSync(__dirname+'\\model.json'); // Read Model Json for default savedata type
        fs.writeFile(`${path}config.json`, jsonContent, 'utf8', () => {
            console.log("Config file has been saved.");
        });
    } else {
        console.log("Config file already exists.");
        console.log("Skipping creation of config file.");
    }
}