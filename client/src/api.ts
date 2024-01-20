
//  http://localhost:3000/  

//https://cezi-server-gpt.vercel.app/

export const fetchResponse = async (chat: any) => {
	try {
		const response = await fetch('https://cezi-server-gpt.vercel.app/', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },

			body: JSON.stringify({
				message: chat.map((message: any) => message.message).join('\n'),
			}),
		})
      const data = await response.text()
	  const jsonData = JSON.parse(data);

	  return jsonData;

	} catch (err) {
		console.log(err)
	}
}
