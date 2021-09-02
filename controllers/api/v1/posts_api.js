const { findById } = require('../../../models/post');
const Posts = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {

    let posts = await Posts.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of posts v1",
        posts: posts
    })
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Posts.findById(req.params.id);

        // if (post.user = req.user.id) {

        post.remove();

        await Comment.deleteMany({ post: req.params.id });

        return res.json(200, {
            message: "Post has been deleted"
        });

        // else {
        // return res.redirect('back');
        // }

    } catch (err) {
        console.log(err);
        return res.json(200, {
            message: "Internal Server Error"
        })
    }
}