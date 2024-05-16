
import React from 'react'
import { useState,useEffect } from 'react';
import { useSnackbar } from 'notistack';


export default function FormExpense({setisOpen,setexpense,editId,setbalance,balance,expenseList,setExpenseList}) {

    
      const[form,setform]=useState({
        title:'',
        price:'',
        category:'',
        date:''
      })
      const { enqueueSnackbar } = useSnackbar();

      console.log("form data",form)

    const handleSubmit = (e) =>{

      e.preventDefault();

      setexpense((prev)=>(prev)+Number(form.price))
          
      setbalance((prev)=>prev-Number(form.price))

      const lastId = expenseList.length > 0 ? expenseList[0].id : 0

    setExpenseList((prev)=>[{...form,id:lastId+1},...prev])

      setform({
        title: '',
        category: '',
        price: '',
        date: '',
    })
      
      setisOpen(false)

    }

    const handleEdit = (e) => {
        e.preventDefault()

        const updated = expenseList.map(item => {
            if (item.id === editId) {

                const priceDifference = item.price - Number(form.price)

                if (priceDifference < 0 && Math.abs(priceDifference) > balance) {
                    enqueueSnackbar("Price should not exceed the wallet balance", { variant: "warning" })
                    setisOpen(false)
                    return { ...item }
                }

                setbalance(prev => prev + priceDifference)
                return { ...form, id: editId }


            }
            else {
                return item
            }
        })

        setExpenseList(updated)

        setisOpen(false)
    }

    useEffect(() => {

        if (editId) {
            const expenseData = expenseList.find(item => item.id === editId)

            setform({
                title: expenseData.title,
                category: expenseData.category,
                price: expenseData.price,
                date: expenseData.date
            })

        }

    }, [editId])

    const handleClose = () =>{
        setisOpen(false)
    }
  return (
    <form onSubmit={editId ? handleEdit : handleSubmit}>
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

<input type="date"  value={form.date} onChange={(e)=>setform({...form,date:e.target.value}) } required/>

    <button type="submit">Add Expense</button> {/*this submission will trigger function at submit in form*/}
    <button onClick={handleClose}>Cancel</button>
</form>
  )
}
