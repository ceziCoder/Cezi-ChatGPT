import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

// server
const app = express()

env.config()

app.use(cors({origin: '*'}))
app.use(bodyParser.json())



const configuration = new Configuration({
    organization: "org-4ku6UgPDwckRKe8sBZk7VcOo",
    apiKey: process.env.API_KEY


})

const openai = new OpenAIApi(configuration)


app.listen("3000", () => console.log('listening on port 3000'))

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
            temperature: .5,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })
        res.json({message: response.data.choices[0].text})

    
    } catch(e) {

        console.log(e)
        res.send(e).status(400)
    
    }

})