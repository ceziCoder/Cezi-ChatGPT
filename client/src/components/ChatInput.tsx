import React, { useState } from 'react'
import { BiSend } from 'react-icons/bi'
import { text } from 'stream/consumers'

export const ChatInput = ({ sendMessage, loading }:any) => {



  const [value, setValue] = useState<any>('')

 

  const handleSubmit = () => {

    if (value === "") return;
  
   
    sendMessage({ sender: 'user', message: value })
    setValue('')

  }

  return (
    <div className='w-full bg-black/30 max-h-40 rounded-lg py-4 px-4 overflow-auto relative'>

    {loading ? (<img className='w-8 m-auto' src='./loader.gif'/>) : (
    <>
      <textarea
      onKeyDown={(e) => {
      e.keyCode === 13 && e.shiftKey === false && handleSubmit()
      
      
      }}
        rows={1}
        className='border-0 bg-transparent outline-none w-11/12'

        value={value}
        onChange={(event) => setValue(event.target.value)}


      />

      <BiSend
        size={24}
        className='absolute top-4 right-3 hover:cursor-pointer ease-in duration-100 hover:scale-125'
        onClick={handleSubmit}
      />

        </>

       )}
    </div>
  )
}
