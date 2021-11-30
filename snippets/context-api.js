

// 1. Create a simple example of a context provider would look like this
//======================================================================

// create auth-context.js file like so

import React from "react";


const AuthContext = React.createContext({
    isLoggedIn: true,
})



export default AuthContext;







// 2. the Provider

// then we go to the file that contains multiple components that will hold the glogal data, import it and
//wrap the components we want to use it by using the name of the context component that holds the object ablove using AthContext.Provider
<AuthContext.Provider>
    <Navigation />
    <SomeOtherComponent />
    <SomeOtherComponent />
</AuthContext.Provider> // here we are using the '.Provider' method




// 3. the Consumer
// the consumer is what we use in a child component of the parent / provider component that we want to use that state, function or the abject inside the AuthContext we created


//inside our child component, we import the AuthContext and wrap the JSX in AuthContext.Consumer which takes a child function


// Navigtion component where we need to add the context

import React from 'react';

import classes from './Navigation.module.css';


import AuthContext from '../context/auth-context';

const Navigation = (props) => {
    return (

        <AuthContext.Consumer>
            { // open JS

                (contextData) => { // this is the child function we need to pass in the JSX and use and argument to get the actual data from the context-api file

                    return ( // remember to return and put the JSX inside
                        <nav className={classes.nav}>
                            <ul>
                                {contextData.isLoggedIn && ( // we remove the props and replace with contextData.object as per the value we want from the context api
                                    <li>
                                        <a href="/">Users</a>
                                    </li>
                                )}
                                {contextData.isLoggedIn && (
                                    <li>
                                        <a href="/">Admin</a>
                                    </li>
                                )}
                                {contextData.isLoggedIn && (
                                    <li>
                                        <button onClick={props.onLogout}>Logout</button>
                                    </li>
                                )}
                            </ul>
                        </nav>

                    )
                }
            }

        </AuthContext.Consumer>
    );
};

export default Navigation;


// 4. NOW WE WILL GET AN ERROR
// we need to pass value to the provider which is the state of the parent component when the provider is used, the App.js component

// so, in the initial context-api file we declare the object we want to pass with an initial value - false
// then in the content.Provider we can use state as a new value to which is inside the component itself


import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';


// context
import AuthContext from './components/context/auth-context';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    return (
        <React.Fragment>

            <AuthContext.Provider
                value={{
                    isLoggedIn: isLoggedIn // the value of isLoggedIn is now the state value
                }} // now the isLogged in object value from the initial context-api holds the state value that can be updated
            >
                <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
                <main>
                    {!isLoggedIn && <Login onLogin={loginHandler} />}
                    {isLoggedIn && <Home onLogout={logoutHandler} />}
                </main>
            </AuthContext.Provider>

        </React.Fragment>
    );
}

export default App;




// 5. finally, because the MainHeader is used to drill down the state of isLoggedIn we can remove its prop like so


<MainHeader onLogout={logoutHandler} />















// USING THE USECONTEXT HOOK => A MORE ELEGANT WAY OF USING CONTEXT API
//======================================================================

// restructuring Navigation to use the useContext hook

import React, { useContext } from 'react'; // import useContext
import classes from './Navigation.module.css';


import AuthContext from '../context/auth-context';



const Navigation = (props) => {


    const { isLoggedIn } = useContext(AuthContext); // using the useContext hook 

    return (

        <nav className={classes.nav}>
            <ul>
                {isLoggedIn && ( // and now we use the isloggedIn key from the AuthContext const in the auth-context.js file
                    <li>
                        <a href="/">Users</a>
                    </li>
                )}
                {isLoggedIn && (
                    <li>
                        <a href="/">Admin</a>
                    </li>
                )}
                {isLoggedIn && (
                    <li>
                        <button onClick={props.onLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>

    )


};

export default Navigation;











// PASSING FUNCTIONS

// if we use function outside of the Provider and use it in the value, its better to create a dummy function inside the context to be used later
// for example



// in our app.js file we have a context.provider wrapper 

import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';


// context
import AuthContext from './components/context/auth-context';

function App() {

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <React.Fragment>
            <AuthContext.Provider
                value={{
                    isLoggedIn: isLoggedIn, // here we are taking the isLoggedIn value from the auth-context.js file
                    onLogout: logoutHandler,  // here we are using the logout function inside the value so we can use it in another component, then make that function where need it 
                }}>

                <MainHeader />
                <main>
                    {!isLoggedIn && <Login onLogin={loginHandler} />}
                    {isLoggedIn && <Home onLogout={logoutHandler} />}
                </main>
            </AuthContext.Provider>
        </React.Fragment >
    );
}

export default App;



// now in our auth-context.js file we need to add the onLogout key as a dummy function

import React from "react";


const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { }, // here is the dummy function
})



export default AuthContext;








// 1. context Provider boilerplate

import React, { useState, useEffect } from 'react';


//1. create the context

const AuthContext = React.createContext({
    isLoggedIn: false, // first declare all instances of our object to pass
    onLogout: () => { },
    onLogin: (email, password) => { }
});



// 2. create the provider that holds state and functions which are also in the AuthContext above
export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider
            value={{ // pass the Auth Context object with the values of the new state and functions
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;




// 2. wrap the index.js file with the Provider and import useContext hook

import React from 'react';
import ReactDOM from 'react-dom';
import AuthContextProvider from './components/context/auth-context';
import './index.css';
import App from './App';

ReactDOM.render(
    <AuthContextProvider><App /></AuthContextProvider>, document.getElementById('root'));





// 3. then use the context in any component that we need to get the value of any given object value thats inside the context-api file

import React, { useContext } from 'react';
import classes from './Navigation.module.css';

import AuthContext from '../../store/auth-context';

const Navigation = () => {
    const ctx = useContext(AuthContext); // this is the Context data object

    return (
        <nav className={classes.nav}>
            <ul>
                {ctx.isLoggedIn && ( // access the loggin by using the context.whatweneed
                    <li>
                        <a href="/">Users</a>
                    </li>
                )}
                {ctx.isLoggedIn && (
                    <li>
                        <a href="/">Admin</a>
                    </li>
                )}
                {ctx.isLoggedIn && (
                    <li>
                        <button onClick={ctx.onLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;


