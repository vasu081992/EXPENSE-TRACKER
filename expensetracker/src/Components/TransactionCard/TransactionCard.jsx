import React from 'react'
import styles from "./TransactionCard.module.css"
import { MdEdit } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { MdOutlineLocalPizza } from "react-icons/md";
import { MdCardTravel } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";


export default function TransactionCard({title,price,date,category,handleDelete,handleEdit}) {

   
    return (
    <div className={styles.card}>
     
    <h1> {title} </h1>
    <p> <FaRupeeSign /> {price} </p>
    <p> {date} </p>
    <p> {category} </p>
    <button className={styles.cardDelete} onClick={handleEdit}>
    <MdEdit />
    </button>
    <button className={styles.cardDelete} onClick={handleDelete}>
    <IoIosClose/>                   
     </button>
 


    { category ==='food'&&
    (
<MdOutlineLocalPizza />
    )
    }

{ category ==='travel'&&
    (
<MdCardTravel />
    )
    }

    
{ category ==='entertainment'&&
    (
<BiCameraMovie />
    )
    }
  
    </div>
  )


}
