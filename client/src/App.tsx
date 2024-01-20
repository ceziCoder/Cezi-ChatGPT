import { useState, useEffect } from 'react'

import { ChatBody } from './components/ChatBody'
import { ChatInput } from './components/ChatInput'
import { useMutation } from '@tanstack/react-query'
import { fetchResponse } from './api'
import './index.css'
import { FaRobot } from 'react-icons/fa'
import Typist  from 'react-typist'

const App = () => {


	

	
	const [chat, setChat] = useState<any>([])

	const mutation = useMutation({
		mutationFn: () => {
		  return fetchResponse(chat);
		},
	  
		onSuccess: (data) => {
		  if (data && data.message) {
			setChat((prev: any) => [
			  ...prev,
			  { sender: 'ai', message: data.message.replace(/^\n\n/, '') },
			]);
		  }
		},
	  });


	const sendMessage = async (message: any) => {
		await Promise.resolve(setChat((prev: any) => [...prev, message]))
		mutation.mutate()
	}

    useEffect(() => {
		const handleUnSupportedRoute = () => {
			 window.location.href = '/'
		}
		
		
		window.addEventListener('popstate', handleUnSupportedRoute)
		return () => {
			window.removeEventListener('popstate', handleUnSupportedRoute)
		}
	},[])
	
		

	return (
		<div className='bg-gradient-to-r from-[#0a343a] to-[#29776d] h-screen relative py-2 px-12 sm:px-16   text-white overflow-hidden flex flex-col align-middle '>
			<div className='gradient-01 gradient-03 z-0 absolute'></div>
			<div className='gradient-02 gradient-04  z-0 absolute'></div>
			<FaRobot className='absolute top-[2rem] left-[2rem] text-white' style={{ color: '#e641ec' }} size={39} />
                    {/* header */}
			<div className=' font-bold text-2xl text-center    w-40 self-center '>
				<p className='self-start bg-clip-text text-transparent bg-gradient-to-r from-[#41d8ec] to-[#8ffaec] '>Cezi Chat GPT  </p>
			</div>
				<p className='self-center text-xs bg-clip-text text-transparent bg-gradient-to-r from-[#e641ec] to-[#8ffaec] '> gpt-3.5-turbo" </p>
				
			
                   {/* body */}
			<div className='h-full overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-transparent scrollbar-thumb-rounded-md'>
				<ChatBody chat={chat} />
			</div>

			<div className='w-full max-w-4xl min-w-[20rem] self-center  '>
				<ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
			</div>
		</div>
	)
}

export default App
