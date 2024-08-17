import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const app = express();
const port = process.env.PORT || 5005;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://adeeliore:root@localhost:27018/agona_db', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

const recipeSchema = new mongoose.Schema({
    label: { type: String, required: true },
    image: String,
    calories: Number,
    mealType: [String],
    cuisineType: [String],
    url: String,
    ingredients: [
        {
            text: String,
            quantity: Number,
            measure: String,
            food: String,
            weight: Number,
            foodCategory: String,
            foodId: String,
            image: String
        }
    ],
    username: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);

app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save();
        res.status(201).send('User registered');
    } catch (error) {
        if (error.code === 11000) {
            if (error.keyPattern.username) {
                res.status(400).send('Username already exists');
            } else if (error.keyPattern.email) {
                res.status(400).send('Email already exists');
            }
        } else {
            res.status(400).send(`Error registering user: ${error.message}`);
        }
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            res.status(200).send('User logged in');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send(`Error logging in: ${error.message}`);
    }
});

app.post('/save-recipe', async (req, res) => {
    const { recipe, username } = req.body;
    try {
        const newRecipe = new Recipe({ ...recipe, username });
        await newRecipe.save();
        res.status(201).send('Recipe saved');
    } catch (error) {
        res.status(400).send(`Error saving recipe: ${error.message}`);
    }
});

app.get('/my-book', async (req, res) => {
    const { username } = req.query;
    try {
        const recipes = await Recipe.find({ username }).lean();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).send(`Error fetching recipes: ${error.message}`);
    }
});

app.post('/add-user-recipe', async (req, res) => {
    const { label, ingredients, calories, mealType, cuisineType, url, username } = req.body;
    try {
        const newRecipe = new Recipe({ label, ingredients, calories, mealType, cuisineType, url, username });
        await newRecipe.save();
        res.status(201).send('Recipe added');
    } catch (error) {
        res.status(400).send(`Error adding recipe: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
