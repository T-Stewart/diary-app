const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    entry: String
});

const Post = mongoose.model('post', PostSchema)

module.exports = Post;