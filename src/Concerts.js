import axios from 'axios';
import { useState, useReducer, useEffect } from 'react';

const reducer=(state, action)=>{
    if(action.type==='get all concerts'){
        return {
            ...state,
            concerts: action.payload
        }
        }
}

function Concerts(){
    const [state, dispatch]=useReducer(reducer, {
        concerts:[],
        clickedConcert:''
    });

    const getConcerts=()=>{
        axios.get('http://localhost:3001/concerts')
        .then(response=>dispatch({
            type: 'get all concerts',
            payload: response.data
        }))
    }

    useEffect(getConcerts,[]);

    return(
        <div className='flex w-15'>
            {state.concerts && state.concerts.map((concert)=>{
        return <div>
            <img src={concert.image} className='w-10 h-10'></img>
            <h3>{concert.title}</h3>
            <h5>{concert.cost}</h5>
            </div>
    })}
        </div>
    );
}

export default Concerts;