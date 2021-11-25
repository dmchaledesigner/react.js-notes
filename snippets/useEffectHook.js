
// useEffect(); => its job is to handle side effects. To run when the compontent first mounts and when state is changed thereafter

// useEffect(() => { // code  }, [dependancies]);

//1) useEffect hook without mentioning any dependency array like.. useEffect(someCallbackFuction); runs for every render of the functional component in which its included..

// 2) useEffect hook with an empty dependency array like this..  useEffect(callbackFunc , [] ) is executed only for the the initial render of the the functional component. And then it will not run in the further renders of the same functional Component..


// 3) useEffect hook with some dependencies inside the dependency array like this.. useEffect(callbackFunc , [dependency] ); will run for the initial render as well as when the render happen due to change in dependencies mentioned in the dependency array... 




import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);



    // we use useEffect here when enteredEmail and enteredPassword changes as user is typing for validation
    // initially we have setFormIsValid INSIDE BOTH changeHandlers but its better to use useEffect for this process as state is changed and updated
    // rememver to use ANY state that we are changing AS DEPENDENCIES


    // So long story short: You must add all "things" you use in your effect function if those "things" could change because your component (or some parent component) re-rendered. That's why variables or state defined in component functions, props or functions defined in component functions have to be added as dependencies!


    useEffect(() => {
        setFormIsValid(
            enteredEmail.includes('@') && enteredPassword.trim().length > 6
        )
    }, [enteredEmail, enteredPassword]); // both state dependancies are placed inside the array as they are the state values changing


    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
        // bring form validation up to useEffect
        // setFormIsValid(
        //   event.target.value.includes('@') && enteredPassword.trim().length > 6
        // );
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
        // bring form validation up to useEffect
        // setFormIsValid(
        //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
        // );
    };

    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'));
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(enteredEmail, enteredPassword);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''
                        }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
                        }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;




// however, there is a problem

useEffect(() => {
    setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
    )
}, [enteredEmail, enteredPassword]);


// This useEffect method runs on every keystroke, so we could use setTimeout() on the initial execution of the setFormIsValid to check if validation is met

// HERE we use the clean up function inside use effect
useEffect(() => {
    effect
    return () => { // this is the cleanup function which runs only after the effect is run once and executed a second time
        cleanup
    }
}, [input])


// what we need to do is run a setTimeout funtion that waits til the user has stopped typing then clear the time out in the clean up function


useEffect(() => {
    console.log('loaded'); // runs once
    const userDelay = setTimeout(() => {
        setFormIsValid(
            enteredEmail.includes('@') && enteredPassword.trim().length > 6
        )
    }, 5000);

    return () => {
        console.log('cleaned up'); // runs when the inital effect is run a second time which cancels the timeout and removes it from the DOM
        clearTimeout(userDelay)
    }
}, [enteredEmail, enteredPassword])