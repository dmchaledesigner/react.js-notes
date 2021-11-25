import React, { useReducer } from 'react'; // import useReducer hook


// our reducer function sits outside the component
const reducer = (state, action) => { // here the STATE represents the current STATE inside the reducer funtion, the ACTION is what is used to indicate anything we have dispatched
    switch (action.type) { // declare the action.type as an indicator for the case values below
        case 'minus':
            return state + 1 // always return
            break;

        case 'plus':
            return state - 1
            break;

        default:
            return state; // when using reducer to test, ALWAYS return a default case or it will not work when testing data that has initial state
    }
}





const ReducerExample1 = () => {

    // create a reducer here INSIDE the component
    const [countState, dispatchCount] = useReducer(reducer, 0);

    // all functions related to the reducer function are created here, then sent up OUTISDE the component into the reducer function where we use the switch statement to work it
    const increment = () => {
        dispatchCount({
            type: 'minus',
        })
    }


    const decrement = () => {
        dispatchCount({
            type: 'plus',
        })
    }




    return (
        <div>
            <h3>{countState}</h3>
            <button onClick={decrement}>decrement</button>
            <button onClick={increment}>increment</button>
        </div>
    )
}

export default ReducerExample1;
