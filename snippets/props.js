// props with color


import React from "react";
import PropTypes from 'prop-types';

const Card = (props) => {
    const styles = {
        backgroundColor: props.cardColor,
        height: 100,
        width: 100
    }

    return (
        <div style={styles}></div>
    )
}

Card.defaultProps = {
    cardColor: 'blue' // this is the default prop if none exists
}


Card.propTypes = { // must import PropTypes (impt) in vsSCode
    cardColor: PropTypes.string.isRequired // means the value of a string is required for this props
}



export default Card




// The App.js compoonent


import React from 'react'

const App = () => {
    return (
        <div>
            {/* This is where the prop is called and we give it a value of red */}
            <Card cardColor="red" />
        </div>
    )
}

export default App;













//creating a resusable component using a props object to pass mukltiple props data

// 1. create the universal component
import React from 'react';
import style from './Input.module.css';

const Input = (props) => {
    return (
        <div className={style.input}>
            <label htmlFor={props.addedValues.id}>{props.label}</label>
            <input {...props.addedValues} />
        </div>
    )
}

export default Input


// props.input is the object which we spread in a container for all additional props we need instead of placing them individually
// here we are creating a prop just for the label and we are also creating a prop object called 'input' we can pass multiple information






// 2. now create another component and pass the above Input compoonent into it, then add the values as needed

import React from 'react';
import style from './MealItemForm.module.css';
import Input from '../../UI/Input';


const MealItemForm = (props) => {
    return (
        <form className={style.form}>
            <Input
                label="Amount"
                addedValues={{
                    id: "amount",
                    type: "number",
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                }}
            />
            <button>Add</button>
        </form>
    )
}

export default MealItemForm