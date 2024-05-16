import { useEffect, useState } from 'react';
import React from "react"
import ReactModal from 'react-modal';
import "./components.css"
import { useRef } from 'react';
import Modal from './ModalComponent/Modal';
import FormIncome from './FormIncome/FormIncome';
import FormExpense from './FormExpense/FormExpense'
import TransactionCard from './TransactionCard/TransactionCard';

const Home = () =>{

 
    const [balance, setbalance]=useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalExpenseIsOpen, setmodalExpense] = useState(false);
    const[expense,setexpense]=useState(0)
    const[expenseList,setExpenseList] =useState([])
    const [isMounted, setIsMounted] = useState(false);
    const [editId, setEditId] = useState(0)
    const [isDisplayEditor, setIsDisplayEditor] = useState(false)
  

console.log("use effect mount state",isMounted)

    console.log(expenseList)

    useEffect(()=>{

      const balance= localStorage.getItem("balance")

     if(balance){
            setbalance(Number(balance))
     }
     else {
        setbalance(5000);
        localStorage.setItem("balance", 5000);

     }

     const items = JSON.parse(localStorage.getItem("expenses"));


     setExpenseList(items || []);

    setIsMounted(true);

    },[])

    useEffect(()=>{
        
        if (expenseList.length > 0 || isMounted) {
            localStorage.setItem("expenses", JSON.stringify(expenseList));
          }

          
        if (expenseList.length > 0) {
            setexpense(
              expenseList.reduce(
                (accumulator, currentValue) =>
                  accumulator + Number(currentValue.price),
                0
              )
            );
          } else {
            setexpense(0);
          }

    },[expenseList])

    useEffect(()=>{
        
        if(isMounted){
        localStorage.setItem("balance",balance)

        }

    },[balance])


  

    console.log("balance",balance)

    const openModal = () => {
        setModalIsOpen(true);
    };

    const openExpenseModal = () =>{
        setmodalExpense(true)
    }

    const handleDelete = (id)=>{
        const item = expenseList.find(i => i.id === id)
        const price = Number(item.price)
        setbalance(prev => prev + price)
        setExpenseList(prev => (
            prev.filter(item => item.id !== id)
        ))
    }

    const handleEdit = (id)=>{
   
           setEditId(id)
        setIsDisplayEditor(true)

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
<h1>Recent Transactions</h1>

{


expenseList.length>0? (

    expenseList.map((expense)=>(
    <div>
  
  <TransactionCard title={expense.title} price={expense.price} date={expense.date} category={expense.category} handleDelete={()=>handleDelete(expense.id)} handleEdit={()=>handleEdit(expense.id)}/>

    </div>
    )
) ):

(
<div>
<h1> NO transactions found !</h1>
</div>
)



}


{/*Modals*/}
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


<Modal isOpen={isDisplayEditor} setIsOpen={setIsDisplayEditor}>
                <FormExpense
                    editId={editId}
                    expenseList={expenseList}
                    setExpenseList={setExpenseList}
                    setisOpen={setIsDisplayEditor}
                    balance={balance}
                    setBalance={setbalance}
                />
            </Modal>


</>
    )
}

export default Home