const Post = require('../Models/Post');

let PostContoller = {
      Index: function(req, res) {
    Post.find( function(err, posts) {
      if (err) { throw err; }
        posts = posts.reverse()
        res.json(posts)

      });
  },

  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var post = new Post(req.body);
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/api/posts')
    });
  },

    Delete: function(req, res){
        let id = req.body.id;
        Post.deleteOne({'_id' : id}, function(err){
            if (err) {
                throw err;
            }
            res.status(201).redirect('/api/posts')
        })
    },

    Update: function(req, res){
        console.log('in delete function')
        let id = req.body.id;
        let title = req.body.title;
        let entry = req.body.entry;

        Post.updateOne({"_id" : id}, {$set: {"title": title, "entry": entry}}, {upsert: true}, function(err, posts){
            if(err){
                throw err;
            }
            res.status(201).redirect('/api/posts')
        });
    },

    findOne: function(req, res){
        console.log('in retrieve function')
        let id = req.body.id;
        Post.findOne({'_id' : id}, function(err, posts){
            if(err){
                throw err;
            }
            res.json(posts)
        })
    },

    UpdateForm: function(req, res) {
        res.render('/update', {});
    }
};

module.exports = PostContoller;