


// Default Props = default value to a prop if a value is not passed
//==================


// component
import React from 'react'

const Header = ({ heading }) => { // add the prop here
    return (
        <header>
            <h1>{heading}</h1>     {/* pass in the prop here*/}
        </header>
    )
}






// some default prop settings for the props heading
Header.defaultProps = {
    heading: 'This a default Heading'
}

export default Header
// end component



// inside another component, we add the <Header /> component ...
// with a prop value  <Header heading={This is the title}/>
//without a prop, the value from the defaultProps title key will take place, just using <Header />











// Proptypes - this allows us to make sure prop values are a string, number or boolean
//shortcut 'impt'
import PropTypes from 'prop-types';


const Header = ({ heading, color }) => { // add the prop here
    return (
        <header style={{ backgroundColor: color }}>
            <h1>{heading}</h1>     {/* pass in the prop here*/}
        </header>
    )
}


// some default prop settings for the props heading
Header.defaultProps = {
    heading: 'This a default Heading',
    color: 'blue',
}


Header.PropTypes = {
    heading: PropTypes.string.isRequired, // make sure the prop passed is a string AND is required - useful for forms!
    color: PropTypes.oneOf(['red', 'blue', 'green']), // means the color should one of the 3 colors on the array
}


export default Header
// end component








// PROPS
//////////
// with props we use them INSIDE the original component
// THEN set the value in where they are called by using the prop name

//eg 

// component of button

import React from 'react';


const Button = ({ text, color, onClick }) => { // pass props as an object
    // we could also do this
    // const Button = (props) => {
    // const {text, color, onClick} = props  //// this way is destructuring
}
return (
    <>
        <button
            // use the props and assign them 
            type={type}
            onClick={onClick}
            className="btn"
            style={{ backgroundColor: color }} >{text}</button>
    </>
)
}




// or using 'props' as the param we can do this

function RoundedImg(props) {
    return (
        <img
            src={props.src}
            style={{ borderRadius: props.borderRadius }}
            className="round-img"
        />
    )
}

RoundedImg.propTypes = {
    src: PropTypes.string.isRequired,
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default RoundedImg



// then we can call the componetnt and use the props keywords as instances to add values


// default props and propType
//===============================

Button.defaultProps = {
    text: 'Add',
    color: 'red',
    type: 'text'
}


Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button


// then import it into another component
import Button from './Button';


// then when we call it, give set values according to the prop name
// so, we bring over color, text and onClick as props
<Button color='green' text="Add" onClick={someclickhandlerFunction} type='submit' />

// again, if no values are set, we are using default props in the button component
// Then we can use PropTypes to set as a string if need be










// Controlled Components
// => A parent component that controls the logic of a child component by use of props to pass down logic that controls its initial value
// See Academinds 1st react project that works with the ExpenseFilter Select year component which is controlled by the parent NewExpense.js component





// Stying with CSS
//=====================

// 1. INLINE
// <h1 style={{backgroundColor: 'red', color: 'blue',}}>Some heading</h1>
// remember to use double curly braces
// First set indicates JS and the second set indicates an object



// 2.VARIABLES
// Same as above except we place the properties inside a variable and pass it in
const styles = {
    backgroundColor: 'red',
    color: 'blue',
}

// <h1 style={styles}>Some text</h1>



//3. USING SASS
// npm install node - sass;
// then create a folder with main.scss file with _partials.scss
// add css file as normal using import
// import './cssFolder/main.scss' // remember .scss not css!



// 4. Styled components
// npm i styled-components
// create the variable for the styled component at the bottom of the component and use the css as usual.
// Whatever the variable is named, replace the html tag with this named variable




// 5. CSS modules
// create a file called Button.js
//create a a file called button.module.css;
// import the css file as import style from './button.module.css
// in the component file we say <Component className={styles.wrapper}> => which will puick up .wrapper{width: 100%...} from the module.css file




// ICONS - full list of icon libraries
// https://react-icons.github.io/react-icons

//npm install react - icons--save


// use this snippet
import { FaTimes } from "react-icons/fa";
// replace the faTimes with the icon we need from the url above


// or we could use Font awesome
// https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react













// React Router DOM
//////////////////////////

// npm install react-router-dom


// Inside the index.js file
// import react router Dom and pass, BrowserRouter
// then wrap the the main App component around it

import { BrowserRouter } from 'react-router-dom';




ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>, document.getElementById('root')
);



// then in our App.js file we have to add in our Switch and Route from react-router-dom for our page routes

import { Route, Switch, useHistory } from 'react-router-dom';


function App() {


    return (
        <Layout>

            <Switch>
                {/* exact means it will notify the main route and set it as that */}
                <Route path="/" component={AboutUsPage} exact />
                {/* exact makes sure the /work url is confirmed*/}
                <Route path="/work" component={OurWorkPage} exact />
                {/* // here we use exact for the next route, the /work/:id  === this is the template for each post with the url */}
                <Route path="/work/:id" component={OurWorkPage} exact />
                {/* // here we again pass our components */}
                <Route path="/contact" component={ContactUsPage} />
            </Switch>

        </Layout>
    );
}

export default App;



{/* Note: remember to add LINK from react-router-dom on page links in page navigation same as the paths above */ }






// Router Links and NavLink activeClassName from React Router DOM
// a special class that enables the Link tag to show an active class built into react

import classes from './MainHeader.module.css';

const MainHeader = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <NavLink activeClassName={classes.active} to='/welcome'>
                            Welcome
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} to='/products'>
                            Products
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;

// the CSS
// .header a:hover,
// .header a:active,
// .header a.active {
//   color: #95bcf0;
//   padding-bottom: 0.25rem;
//   border-bottom: 4px solid #95bcf0;
// }





// redirects
import { Route, Switch, Redirect } from 'react-router-dom';


const App = () => {
    return (
        <div>
            <MainHeader />
            <main>
                <Switch>
                    {/* create a new route, set it to the url we want and pass in the redirect function. remember to import Redirect from react-router-dom */}
                    <Route path='/' exact>
                        <Redirect to='/welcome' />
                    </Route>
                    <Route path='/welcome'>
                        <Welcome />
                    </Route>
                    <Route path='/products' exact>
                        <Products />
                    </Route>
                    <Route path='/products/:productId'>
                        <ProductDetail />
                    </Route>
                </Switch>
            </main>
        </div>
    );
}

export default App;








// NESTED Routing
// a page created where if the user is directed to welcome/new-user then anything inside the route containing the path will be conditionally rendered

import { Route } from 'react-router-dom';

const Welcome = () => {
    return (
        <section>
            <h1>The Welcome Page</h1>
            <Route path="/welcome/new-user">
                <p>Welcome, new user!</p>
            </Route>
        </section>
    );
};

export default Welcome;






\

{/* // PAGE SWITCHING USING ABORT CONTROLLER

when using fetch and page rendering, if we switch pages mutlple times, the fetch request still runs on the previous page and causes an error
We need to use abort controller for this

 current useFetch file */}

import { useState, useEffect } from 'react'


const useFetch = (url) => { // always call the function starting with 'use' as its recognised as a hook

    // const url = 'http://localhost:8000/blogs';
    // Note the url will be passed as an endpoint inside useState when we call it inside another component

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true); // for the loading conditional render

    useEffect(() => {

        setTimeout(() => {
            fetch(url)
                .then((res) => {
                    return res.json();

                })
                .then((data) => {
                    setData(data);
                    setIsPending(false);
                })
                .catch((error) => {
                    console.log(error.message)
                    setIsPending(true)
                })
            // eslint-disable-next-line react-hooks/exhaustive-deps

        }, 1000);

    }, [url]);

    return { data, isPending } // this is the sate being returned for using  custom hook

}

export default useFetch








{/*  now we use abort controller like so… */ }


import { useState, useEffect } from 'react';

const useFetch = (url) => { // always call the function starting with 'use' as its recognised as a hook

    // const url = 'http://localhost:8000/blogs';
    // Note the url will be passed as an endpoint inside useState when we call it inside another component

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true); // for the loading conditional render

    useEffect(() => {

        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then((res) => {
                    return res.json();

                })
                .then((data) => {
                    setData(data);
                    setIsPending(false);
                })
                .catch((error) => {
                    if (error.name === 'AbortError') {
                        console.log('fetch aborted')
                    } else {
                        console.log(error.message)
                        setIsPending(true)
                    }
                })
            // eslint-disable-next-line react-hooks/exhaustive-deps

        }, 1000);

        return (() => abortCont.abort())

    }, [url]);

    return { data, isPending } // this is the sate being returned for using  custom hook

}

export default useFetch









{/* ROUTE PARAMETERS USING ID */ }
// =========================
// Create a component that is a template for the post
// Create a route that specifies the id eg 

// disnable ESLint
<Route path=” /posts /: id” component = { postTemplate } />

    {/* using the useParams() hook from ‘react-router-dom */ }










{/* USE HISTORY
=============

this state enables us to move about routes and go back and forward */}

// import {useHistory} from ‘react-router-dom

{/* then we can say something like….
const history = useHistory();   // assign the useHistory() to a variable

..then we can use this var to access methods
simply console.log(history) to see its capabilities

so for moving back and forth on a click, we can say
history.go(-1) …which when the button is clicked the router will bring up one step back
history.go(1) …will bring the router forward


…when a form is submitted, we can add this into our onSubmit function
..say to bring us onto a homepage we can say */}

const onSubmit = (e) => {
    e.preventDefault();

    {/* which is the route to the homepage (see router points in the swith statement) */ }
    history.push(‘/‘) 
}









{/* /* 404 */ }
{/* ============ */ }


{/* create a component
in the routing add in the route and use * as a path  */}

<Route path=“*” component = { NotFound } />









// useRef hook
// the ability to target a html Node

import { useRef } from 'react'

const inputRef = useRef();
console.log(inputRef) // returns object

// then on the html for an input

// <input type= "text" ref={inputRef} />
// to get the value we can say
console.log(inputRef.current.value)
















// use Effect hook
//===================

useEffect(() => {
    // this is the code that runs on page load and this reloads then its dependances / or state changes in the array below
    return () => {
        // this is the code that runs AFTER the effect has been executed for the first time
        // it will run every time from the effect above is first loaded
    }
}, [input]) // this where our dependancies are placed which is either an empty array for oage load or ehrn state will change//











//OPTIMIZATION IN REACT
//--------------------------



// React.memo()
//===============
// Compares the previous props with the new props that a component wrapped in React.memo receives and then decide whether to re-render the component or not. 
//So if a component that is wrapped in React.memo(), in that case React renders the component and it memoizes it results which means it does keeps it in the memory or some cache. It means that the result of the function wrapped in React.memo is saved in memory and returns the cached result if it's being called with the same input again. Before the next render, React checks if the new props are same compared to the previous props and if that is the case then React uses the memoized result and skips the next rendering that it would have done if there was a change in props.


// ONLY IF STATE, PROPS, OR CONTEXT CHANGES THEN REACT WILL RE-RENDER COMPONENTS
// WITH MEMO, THE CHILD WILL ONLY BE RERENDERED IF THE CURRENT STATE OR PROP HAS CHANGED

//APP.JS => PARENT COMPONENT
import React, { useState } from 'react';

import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';

function App() {
    const [showParagraph, setShowParagraph] = useState(false);

    console.log('APP RUNNING');

    const toggleParagraphHandler = () => {
        setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    };

    return (
        <div className="app">
            <h1>Hi there!</h1>
            <DemoOutput show={false} />
            <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
        </div>
    );
}

export default App;




// DEMO.JS => CHILD OF APP.JS
import React from 'react';

import MyParagraph from './MyParagraph';

const DemoOutput = (props) => {
    console.log('DemoOutput RUNNING');
    return <MyParagraph>{props.show ? 'This is new!' : ''}</MyParagraph>;
};

export default React.memo(DemoOutput);



// PARA.JS => CHILD OF DEMO.JS
import React from 'react';

const MyParagraph = (props) => {
    console.log('MyParagraph RUNNING');
    return <p>{props.children}</p>;
};

export default MyParagraph;