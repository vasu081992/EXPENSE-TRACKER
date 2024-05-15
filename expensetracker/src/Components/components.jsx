import { useEffect, useState } from 'react';
import React from "react"
import ReactModal from 'react-modal';
import "./components.css"
import { useRef } from 'react';
import Modal from './ModalComponent/Modal';
import FormIncome from './FormIncome/FormIncome';
import FormExpense from './FormExpense/FormExpense'


const Home = () =>{

 
    const [balance, setbalance]=useState(5000)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalExpenseIsOpen, setmodalExpense] = useState(false);
    const[expense,setexpense]=useState(0)
    const[expenseList,setExpenseList] =useState([])

    console.log(expenseList)
    
    useEffect(()=>{
     
        console.log("expense changed so use effect is running")

        expenselistAdd()

    },[balance])

    const expenselistAdd = ()=>{
   
         

    }

    console.log("balance",balance)

    const openModal = () => {
        setModalIsOpen(true);
    };

    const openExpenseModal = () =>{
        setmodalExpense(true)
    }

    const Card = ({buttonName,amount,onClick})=>{

        return (
        <div className="expense-tracker">
        <p>{amount}</p>
         <button onClick={onClick}>{buttonName}</button>
         </div>
        )
    }

 



    return (

<>

    <p>Expense Tracker</p>

<div className='expense-total'> 
<Card buttonName="Add Income" amount={`Wallet balance : ${balance}`} onClick={openModal} />
<Card buttonName="Add expenses" amount={`Expenses : ${expense}`} onClick={openExpenseModal} />
</div>

<Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>

<FormIncome setisOpen={setModalIsOpen} setbalance={setbalance}/>
</Modal>

<Modal isOpen={modalExpenseIsOpen} setIsOpen={setmodalExpense}>

<FormExpense 
setisOpen={setmodalExpense}
setexpense={setexpense}
setbalance={setbalance}
balance={balance}
expenseList={expenseList}
setExpenseList={setExpenseList} />

</Modal>



</>
    )
}

export default Home