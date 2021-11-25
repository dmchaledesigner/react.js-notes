

// Wordpress Rest Api documentation
//===============================
// https://developer.wordpress.org/rest-api/key-concepts/






// USE POSTMAN APP TO TEST THE DATA
//===================================


//1. As an example, if we make a GET request to the URI http://oursite.com/wp-json/ we are returned a JSON response showing what routes are available, and what endpoints are available within each route. /wp-json/ is a route, and when that route receives a GET request then that request is handled by the endpoint which displays what is known as the index for the WordPress REST API. The route wp-json/wp/v2/posts by contrast has a GET endpoint which returns a list of posts, but also a POST endpoint which accepts authenticated requests to create new posts.


http://local.wordpressreact-trav/wp-json => all json data
http://local.wordpressreact-trav/wp-json/wp/v2/posts => all generic post data











// MAKING POSTS => AUTHENTIFICATION
//===================================

// 1. Go into postman, select => POST and inout this url http://local.wordpressreact-trav/wp-json/wp/v2/posts
// 2. in the header, select => Content-type => Application JSON
// 3. for 'body', select 'raw' and inout an object as below
{
    "code": "rest_cannot_create",
        "message": "Sorry, you are not allowed to create posts as this user.",
            "data": { "status": 401 }
}


// FIXING AUTHENTIFICATION => GETTING JWT WEB TOKENS 
//===================================

// 1. download the 'JWT Authentication for WP REST API', activate and access the docs for instructions
// => add the code to both htaccess and wp-config files as instructed

// 2. in the docs it gives us an endpoint => wp-json/jwt-auth/v1/token
// 3. go into postman => open a new window, select => 'post => the url 'http://local.wordpressreact-trav/wp-json/jwt-auth/v1/token'
// 4. in headers => Content-type - application/json
// 5. in the body, go to 'raw' and use our username and password as an object

{
    "username": "wordpressreact1",
        "password": "wordpressreact1"
}

//click 'send' and we get our web token
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbC53b3JkcHJlc3NyZWFjdC10cmF2IiwiaWF0IjoxNjM2NDk0MTQ5LCJuYmYiOjE2MzY0OTQxNDksImV4cCI6MTYzNzA5ODk0OSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.7xsVCxfCcx6eUKb5v0A_idcF_y1V-EdaT9xWM9s0h2g",
        "user_email": "dmchaledesigner@gmail.com",
            "user_nicename": "wordpressreact1",
                "user_display_name": "wordpressreact1"
}



// back in postman...
// 1. in headers => select the first request were we made our post request and failed
// 2. in the header => make sure we have selected Content-type => application/json
// 3. in the authorization block, select Bearer token and paste in the token we got from the second request - the JWT web token (from the above object) 
// 4. click, send and our post should turn up in the wordpress dashboard of posts to now use in react















// CUSTOM POST TYPES, ACF CUSTOM FIELDS AND MAKING REQUESTS FROM REST API
//===================================


// 1. install 'Custom Post Type UI' or create your own CPT using register post type with PHP in functions.php
// 2. create a cpt called books
// 3. make sure we have this part set as below
// => show_in_rest: true
// => rest_base: books
// 4. click fields to be active, ie title, content, excerpt, custom fields etc...
// 5. Create multiple 'book' posts, with title, content, excerpt and image
// testing => go back to postman and make a new request on the books like so
// => http://local.wordpressreact-trav/wp-json/wp/v2/books       => gives us all books
// =>  http://local.wordpressreact-trav/wp-json/wp/v2/books?per_page=1      => returns one book
// => http://local.wordpressreact-trav/wp-json/wp/v2/books/9      => gives us book with ID of 9


// USING ACF CUSTOM FIELDS ON REQUESTS
// 1. install ACF Custom Fields
// 2. install 'ACF to rest api' plugin so that custom fields are accessable to the rest api
// 3. create a cutom field for the books CPT that gives a text input for a publisher
// 4. make another request in postman => http://local.wordpressreact-trav/wp-json/wp/v2/books/9 and we should see the value of the ACF field like so
"acf": {
    "publisher": "john doe" // the publisher field we created that holds the valuen of john doe from the book of a value of 9 (the url - books/9)
},











// REACT AND WORDPRESS
//=======================



// 1. using create react app
// => inside the wordpress installation, create a folder called 'frontend' and install react there using 'npx create-react-aap frontend.'
// note the frontend folder can be where we want but for this tut, its in the root of the wordpress installation.
// if we have a custom theme, we can add it there too!

// 2. clear out unwanted files
// 3. in the package.json file add a proxy to the url we we can just use the relative paths of the fetch requests
{
    "name": "frontend",
        "version": "0.1.0",
            "private": true,
                "dependencies": {
        "@testing-library/jest-dom": "^5.15.0",
            "@testing-library/react": "^11.2.7",
                "@testing-library/user-event": "^12.8.3",
                    "axios": "^0.24.0",
                        "react": "^17.0.2",
                            "react-dom": "^17.0.2",
                                "react-router-dom": "^6.0.2",
                                    "react-scripts": "4.0.3",
                                        "web-vitals": "^1.1.2"
    },
    "scripts": {
        "start": "react-scripts start",
            "build": "react-scripts build",
                "test": "react-scripts test",
                    "eject": "react-scripts eject"
    },
    "eslintConfig": {
        "extends": [
            "react-app",
            "react-app/jest"
        ]
    },
    "browserslist": {
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ],
            "development": [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
            ],
                "proxy": "http://local.wordpressreact-trav" // proxy url here
    }
}



// 4. now we can use npm start and create a Books.js component with state and use fetch request to pull down the data.
// 5. after we have done this. import the Books.js into the App component and structure as needed
// 6. create a book component and pass the data through
// 7. NOTE: when we get text content data from wordpress it return the text INSIDE of html <p> tags
// => so we need to remove that by using an html attritute called 'dangerouslySetInnerHTML'

// create a function
function createMarkup(content) {
    return { __html: content };
}


// and use it like so => the content will be input inside the tags / the excerpt has been taken from the below and passed as the function value
const { title, id, excerpt } = props.book;
<p dangerouslySetInnerHTML={createMarkup(excerpt.rendered)}></p>

// again, see the tutorial I made up in localhost for both components









// RENDERING IMAGES