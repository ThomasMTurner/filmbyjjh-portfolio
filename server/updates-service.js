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


app.get('/get-tags', (req ,res) => {
    //want to get every tag and count their instances.
    //check through every document, add tag to map if doesn't exist
    // add count to tag in map if already exists.
    const tagsCountMap = {}

    updates.find({tags : {$exists: true}})
    .then((results) => {
        for (let i = 0; i < results.length; i ++){
            for (let j = 0; j < results[i].tags.length; j++){
                currentTag = results[i].tags[j]
                if (currentTag in tagsCountMap){
                    tagsCountMap[currentTag] += 1
                }
                else {
                    tagsCountMap[currentTag] = 1
                }
            }
        }

    res.status(200).json(tagsCountMap);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({message: 'Error retrieving tags'});
    })

})

//GET request should deal with retrieving from db posts in order of most recent
app.get('/get-posts', (req, res) => {
    const sort = req.query.sort;
    const filterTags = req.query.filterTags;
    const search = req.query.search;
    const dateLower = req.query.dateLower;
    const dateUpper = req.query.dateUpper;

    //now we have some list of tags we want to match our search against
    let sortMap = {'oldest': 1, 'most recent': -1};
    
    let query = {};

    if (search) {
        query.title = {$regex: search, $options: 'i'};
    }
    if (filterTags){
        query.tags = { $in: filterTags };
    }

    if (dateLower && dateUpper){
        query.postDate = {$gte: dateLower, $lte: dateUpper};
    }
    

    updates
    .find(query)
    .sort({postDate: sortMap[sort]})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({message: 'Error retrieving posts'});
    })

    
    
});