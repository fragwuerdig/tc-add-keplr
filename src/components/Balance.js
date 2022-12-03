
import React from 'react';
import './Balance.css';

class Balance extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='balance--box'>
                <h3>{this.props.denom}</h3>
                <h4>20000</h4>
            </div>
        )
    }

}

export default Balance;