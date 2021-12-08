import React from 'react'

import ReactDOM from 'react-dom'

import { useIsMobile, isElectron } from 'utils/clientUtil';

// Customization Injection Block
function startInject() {
    if (fs.existsSync('./plugins')) {
      console.log("AMULLER DEBUG: SINJECT: Found plugins folder. Scanning for changes...")
      
    }
}

function createSaveData() {
    var path = require("os").homedir() + '/Documents/Audius/'
}
  
if (isElectron() && isCustomCss()) {
    import './'
    startInject()
}

// Import CSS first so it's resolved in the right order.
// Unsure why importing this component first would change that, but it appears to
// when running in dev mode.
import Root from './root'

ReactDOM.render(<Root />, document.getElementById('root'))
