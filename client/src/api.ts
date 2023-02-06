import axios, { Axios } from "axios"




export const fetchResponse = async (chat: any) => {
	try {
		const response = await fetch('https://cezi-chat-gpt.vercel.app/', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },

			body: JSON.stringify({
				message: chat.map((message: any) => message.message).join('\n'),
			}),
		})
      const data = await response.json()
      return data

	} catch (err) {
		console.log(err)
	}
}
