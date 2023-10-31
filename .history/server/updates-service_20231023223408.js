/*

Includes API endpoints for storing new posts and serving
existing posts.

*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = 7182;
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/updates', {
    dbName:'updates',
    useNewUrlParser: true,
    useUnifiedTopology: true,
}), err => err ? console.log(err) :
console.log('Connected to database');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    postDate: {
        type: Date
    },
    tags: {
        type: [String]
    }
})

const updates = mongoose.model('updates', postSchema);
updates.createIndexes();



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


// POST request should deal with adding to database the json request
app.post('/create-post', (req, res) => {
    const currentDate = new Date();
    const content = req.body.content;
    const title = req.body.title;
    const tags = req.body.tags;

    const newPost = new updates({
        content: content,
        title: title,
        tags: tags,
        postDate: currentDate
    })

    async function createPost() {
        try {
            await newPost.save();
            res.status(200).json({message: 'Post created successfully'});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Error creating post'});
        }
    }

    createPost();
})



//GET request should deal with retrieving from db posts in order of most recent
app.get('/get-posts', (req, res) => {
    console.log(req.query);
    console.log(req.query.queries);
    const queries = req.query.queries;

    //modify the below to match the query, if null, this is the standard.
    updates
    .find()
    .sort({postDate: -1})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((error) => {
        console.error(error);
                res.status(500).json({message: 'Error retrieving posts'});
            })
        };
    
});