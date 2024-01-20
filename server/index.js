import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai"

// server
const app = express();
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
dotenv.config();

app.use(cors());

const configuration = new OpenAI({
  organization: process.env.ORG,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(configuration);
const port = process.env.PORT;

app.listen(port, () => console.log("listening on port 3000"));

app.get("/", (req, res) => {
  res.send("hello");
});

// post route for making request

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log("Otrzymane dane:", message);
  try {
    const response = await  openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: `${message}` }],
      max_tokens: 3000,
      temperature: 0.2,
      frequency_penalty: 0.8,
     presence_penalty: 0.2,
    });
    res.json({ message: response.choices[0].text });
    console.log({ message });
  } catch (e) {
    console.error("Błąd zapytania do OpenAI:", e);
    res.status(400).json({ error: e.message || "Wystąpił błąd", details: e });
    
  }
});
