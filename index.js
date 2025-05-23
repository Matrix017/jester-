import express from "express";
import axios from "axios";
import bodyparser from "body-parser";

const app = express();
const PORT = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Any?type=single&?blacklistFlags=nsfw,racist,sexist,explicit& ?format=json"; // Replace with your API URl

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyparser.urlencoded({ extended: true }));
app.get("/",async (req, res) => {
    try{
     const result = await axios.get(API_URL);
     const finaljoke = result.data.joke;
     const category= result.data.category;
     console.log(finaljoke);
    res.render("index.ejs",{jokes:finaljoke,category:category,error:null});

    }
    catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).render("index.ejs",{error:"Error fetching data from API ",jokes:null,category:null});
    }
    
});

// POST request to fetch a new joke

app.post("/newjoke", async (req, res) => {
    try {
        const value = req.body.categories;
        console.log(value);
        // const result = await axios.get(`https://v2.jokeapi.dev/joke/${value}?type=single&blacklist
       const result = await axios.get(`https://v2.jokeapi.dev/joke/${value}?type=single&blacklistFlags=nsfw,racist,sexist,explicit&format=json`);
        const finaljoke = result.data.joke;
        const category= result.data.category;
        console.log(finaljoke);
        res.render("index.ejs",{jokes:finaljoke,category:category,error:null});
    } catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).render("index.ejs",{error:"Error fetching data from API",jokes:null,category:null});
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});