const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();

            // ajax 
            if (req.xhr) {
                comment = await comment.populate('user', 'name').execPopulate();

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment Posted!"
                });
            }

            res.redirect('/');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id) {
            let postID = comment.post;
            comment.remove();

            let post = Post.findByIdAndUpdate(postID, { $pull: { comments: req.params.id } });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted!"
                });
            }

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err.responseText);
        return;
    }
}