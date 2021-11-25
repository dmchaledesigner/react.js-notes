

//setup tutorial
//===============
// https://www.youtube.com/watch?v=NKqogVcqDHA







// 1. initialise json
//===============

// npm init - y // creates json file






//2. install wordpress
//===============
// https://www.npmjs.com/package/@wordpress/scripts
// npm install @wordpress/scripts






// 3. create a folder called 'src' in the root and create a file called index.js
//===============
// root => src => index.js






// 4. inside the src folder we can create our components folder and a styles folder
//===============
// src => components => TestComponent.js
// src => styles => style.scss





//5. back to the index.js file we created we now import our styles, our component and Render method
//===============
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';


import Test from './components/Test';


ReactDOM.render(<Test />, document.querySelector('#app'));







//6. Now inside our .json file we add some scripts to make it work
//===============
{
    "name": "learnToCode-tutorial",
        "version": "1.0.0",
            "description": "",
                "main": "index.js",
                    "scripts": {
        "build": "wp-scripts build", // add this line 
            "start": "wp-scripts start", // add this line
                "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
        "author": "",
            "license": "ISC",
                "dependencies": {
        "@wordpress/scripts": "^19.1.0"
    }
}





// 7. Run the command to watch the project
//===============
// npm run start
// note the newly created 'build' folder that spits out our js and css





// 8. This whole root folder is now the 'THEME' we will use inside of a wordpress installation
// So, install wordpress and drop this folder inside the theme folder and rename it
//wp-content => themes => 'react-theme'

// can also use a boilerplate from the tutorial we got this from
// https://github.com/LearnWebCode/brads-boilerplate-wordpress




//9. Go into the dashbaord and select, appearance => themes => ...then activate that theme
// then view the page on the frontend by viewing the site itself












// WORDPRESS
//===============


// 1. Open up the Theme Folder in VSCODE and run NPM install to install all NODE modules into the theme (from the boilerplate)
// 2. in the terminal 'npm run start' to listen 'watch' this theme
// 3. finally we can go into the json file and change the url to make the sync browser/preview work
// "sync": "browser-sync start -p 'local.wordpress-react1' --files '**/*.php' 'build/*.js' 'build/*.css'", // the new url is the address from your localhost
//4. then in the terminal, => npm run preview


