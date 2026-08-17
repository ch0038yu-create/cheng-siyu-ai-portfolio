const express = require("express");
const path = require("path");
const OpenAI = require("openai");
const fs = require("fs");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = 3000;


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const profile = fs.readFileSync("profile.md", "utf8");

console.log("Profile loaded successfully!");

app.use(express.json());

app.use(express.static("public"));


app.post("/api/chat", async function (req, res) {

    try {

        const message = req.body.message;


        const response = await openai.responses.create({

            model: "gpt-4.1-mini",

            input: message

        });


        res.json({

            reply: response.output_text

        });


    } catch (error) {

        console.log("========== OPENAI ERROR ==========");
        console.error(error);
        console.log("error message:", error.message);
        console.log("error status:", error.status);
        console.log("==================================");

        res.status(500).json({
            reply: "AI 暂时无法回答，请稍后再试。"
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});