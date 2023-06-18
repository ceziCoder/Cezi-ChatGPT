import React, { useRef, useEffect } from 'react'
import autoAnimate from '@formkit/auto-animate'
import ScrollableFeed from 'react-scrollable-feed'




export const ChatBody = ({ chat }: any) => {

    const aiStyle = 'bg-white bg-opacity-20 backdrop-blur-lg shadow-sm shadow-white m-auto  '

    const parent = useRef(null)
    const bottomRef = useRef<any>(null)

    // automatic animation
    useEffect(() => {

        parent.current && autoAnimate(parent.current)


    }, [parent])

 



    return (
        <ScrollableFeed>
        <div className='flex flex-col gap-4  ' ref={parent}>
            
            {chat.map((message: any, i: any) => {
                return (
                    <div key={i} className={`border-[#999999] break-words border-2 rounded-xl self-start py-3 px-3 max-w-[80%] ${message.sender === 'ai' && aiStyle}`}>
                        <pre className='whitespace-pre-wrap'>
                            <span  >{message.message}</span>
                        </pre>
                    </div>
                )
            })}
        
            
        </div>
        </ScrollableFeed >
        
    
    )
}
