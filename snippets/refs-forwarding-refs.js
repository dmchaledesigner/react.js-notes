

// standard useRef => useRef hook
// the ability to target a html Node and get its value, ideally we should use state but it can be useful to target a JSX element in a component

import React, { useRef } from 'react'

const MyComponent = () => {

    const inputRef = useRef();

    console.log(inputRef.current.value) // a ref always has a current method

    return (
        <div>
            {/* we pass the ref name to the ref prop which we can target.
                therefore we dont need to use 'value' or and onChange handler */}
            <input type="text" name="name" ref={inputRef} />
        </div>
    )
}

export default MyComponent;







// passing a ref from an stand alone UI INPUT component into another component
// using React.forwardRef()

import React, { useRef } from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => { // we need to pass props AND ref as params
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} /> {/* the props.inout is an object where we can use added props as we need them*/}
        </div>
    );
});

export default Input;






// the form component where we want to use 

import { useRef, useState } from 'react';


const MyForm = () => {

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label='Amount'
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    );
}








// another example

const FancyButton = React.forwardRef((props, ref) => {
    return (
        <button ref={ref} className="FancyButton">
            {props.children}
        </button>
    )
}


// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;



