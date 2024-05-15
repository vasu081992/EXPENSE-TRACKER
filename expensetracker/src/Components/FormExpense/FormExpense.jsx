
import React from 'react'
import { useState } from 'react';


export default function FormExpense({setisOpen,setexpense,setbalance,balance,expenseList,setExpenseList}) {

    
      const[form,setform]=useState({
        title:'',
        price:'',
        category:'',
        date:''
      })

      console.log("form data",form)

    const handleSubmit = (e) =>{

      e.preventDefault();

      setexpense((prev)=>(prev)+Number(form.price))
          
      setbalance((prev)=>prev-Number(form.price))

    setExpenseList((prev)=>[{...form},...prev])

      setform({
        title: '',
        category: '',
        price: '',
        date: '',
    })
      
      setisOpen(false)

    }


    const handleClose = () =>{
        setisOpen(false)
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title.." required value={form.title} onChange={(e) => setform({ ...form, title: e.target.value })}
/>

    <input type="number"
    value={Number(form.price)} // Bind input value to the state
    onChange={(e) => setform({ ...form, price:Number(e.target.value) })}
    placeholder="Price..." required/>

<label for="cars">Select category:</label>

<select name="categories" id="categories" value={form.category} onChange={(e)=>setform({...form,category:e.target.value})}  required>
  <option value="" disabled>Select category</option>
  <option value="food">food</option>
  <option value="travel">travel</option>
  <option value="entertainment">entertainment</option>
</select>

<input type="date"  value={form.date} onChange={(e)=>setform({...form,date:e.target.value})}/>

    <button type="submit">Add Expense</button> {/*this submission will trigger function at submit in form*/}
    <button onClick={handleClose}>Cancel</button>
</form>
  )
}
