const Post  = require('../models/Post');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find(); // Example: Fetching 10 posts
        // console.log(posts);
        res.json({ 
            success: true,
            posts
         });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching posts' });
    }
};

module.exports = { getPosts };
