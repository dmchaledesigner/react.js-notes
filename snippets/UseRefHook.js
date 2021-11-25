// Typically we use state to define values from input fields but we can useRefs to get the values

// Take this code using state and see how we use it

import React, { useState } from 'react';
import styles from './AddUser.module.css';

import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';



const AddUser = (props) => {
    const { getUsersHandler } = props;

    const [enteredUserName, setEnteredUserName] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState(null);


    const enteredUserNameHandler = (e) => {
        setEnteredUserName(e.target.value);
    }

    const enteredAgeHandler = (e) => {
        setEnteredAge(e.target.value)
    }


    const errorHandler = () => {
        setError(null) // no need to set to !error as null is a falsy value
    }


    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age (non emtpy values)',
            })
            return;
        }

        if (+enteredAge < 1) { // making sure enteredAge is a number
            setError({
                title: 'Invalid Input',
                message: 'Please enter a value greater than 0',
            })
            return
        }


        getUsersHandler(enteredUserName, enteredAge)


        // reset values to empty string
        setEnteredUserName('')
        setEnteredAge('')

    }


    return (
        <>
            {error && <Modal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className={styles.input}>
                <form onSubmit={onSubmitHandler}>

                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        onChange={enteredUserNameHandler}
                        value={enteredUserName}
                    />




                    <label htmlFor="age">Age (years)</label>
                    <input
                        type="number"
                        id="age"
                        onChange={enteredAgeHandler}
                        value={enteredAge}
                    />

                    <Button
                        type='submit'>Add User</Button>

                </form>
            </Card>
        </>

    );
}

export default AddUser;





// when using refs we do not need to have a value prop or an onChange prop as we are targeting the DOM nodes with use Ref and getting the values
// Here is the same code above, but using refs....


// 1. create the refs
// 2. connect them to the html using the ref={} prop, get the values and reset


import React, { useState, useRef } from 'react';
import styles from './AddUser.module.css';

import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';



const AddUser = (props) => {
    const { getUsersHandler } = props;



    // declare refs and conneect them 
    const nameRef = useRef();
    const ageRef = useRef();


    // input states are removed, we only need error for the modal
    const [error, setError] = useState(null);



    // event.target functions are no longer needed as we are not using state for the inputs


    const errorHandler = () => {
        setError(null) // no need to set to !error as null is a falsy value
    }


    const onSubmitHandler = (e) => {
        e.preventDefault();

        // assign the ref values to variables inside the submit handler

        const nameValue = nameRef.current.value;
        const ageValue = ageRef.current.value;

        // get the ref values
        if (nameValue.trim().length === 0 || ageValue.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age (non emtpy values)',
            })
            return;
        }

        if (+geValue < 1) { // making sure enteredAge is a number
            setError({
                title: 'Invalid Input',
                message: 'Please enter a value greater than 0',
            })
            return
        }

        // this is the function that takes in the values and pushes them back
        getUsersHandler(nameValue, ageValue)


        // reset values to empty string.
        // typically we should not manipulate the DOM but in this case locally its fine
        nameRef.current.value = '',
            ageRef.current.value = '',

        

    }


    return (
        <>
            {error && <Modal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className={styles.input}>
                <form onSubmit={onSubmitHandler}>

                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        ref={nameRef}
                    />




                    <label htmlFor="age">Age (years)</label>
                    <input
                        type="number"
                        id="age"
                        ref={ageRef}
                    />

                    <Button
                        type='submit'>Add User</Button>

                </form>
            </Card>
        </>

    );
}

export default AddUser;