import React from 'react'
import ReactModal from 'react-modal';


export default function Modal({isOpen,setisOpen,children}) {
  return (
<ReactModal
                isOpen={isOpen}
                overlayClassName="Overlay"
                className="Modal"
                shouldCloseOnEsc={true}
                shouldReturnFocusAfterClose={true}
                preventScroll={true}
                onRequestClose={()=>setisOpen(false)}
            >
{children}
</ReactModal>
  )
}



