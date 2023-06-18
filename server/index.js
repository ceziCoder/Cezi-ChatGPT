import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

// server
const app = express()
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ limit: '20mb', extended: true }))
dotenv.config()

app.use(cors({
    origin: 'cezi-chat-gpt.vercel.app' }))




const configuration = new Configuration({
    organization: process.env.ORG,
    apiKey: process.env.API_KEY


})

const openai = new OpenAIApi(configuration)
const port = process.env.PORT

app.listen(port, () => console.log('listening on port 3000'))

app.get('/', (req, res) => {
    res.send('hello')
})

// post route for making request

app.post('/', async (req, res) => {
    const { message } = req.body

    try {

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 3000,
            temperature: 0.2,
            frequency_penalty: 0.8,
            presence_penalty: 0.2
        })
        res.json({ message: response.data.choices[0].text })
        console.log({message})

    } catch (e) {

       
        res.send(e).status(400)
        console.log(e)

    }

})