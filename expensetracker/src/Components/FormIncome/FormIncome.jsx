
import React from 'react'
import { useState } from 'react';


export default function FormIncome({setisOpen,setbalance}) {


     const [inputText,setInputText] = useState(0)


    const handleSubmit = (e) =>{

      e.preventDefault();

      setbalance((prev)=>(prev)+Number(inputText))
    
      setInputText(0)
      
      setisOpen(false)
    }

    const handleInputChange = (e)=>{
        console.log("typed num",e.target.value)
        setInputText(e.target.value)
        
    }

    const handleClose = () =>{
        setisOpen(false)
    }
  return (
    <form onSubmit={handleSubmit}>
    <input type="number"
    value={inputText} // Bind input value to the state
    onChange={handleInputChange}  placeholder="Income amount..." required/>
    <button type="submit">Add Balance</button> {/*this submission will trigger function at submit in form*/}
    <button onClick={handleClose}>Cancel</button>
</form>
  )
}
