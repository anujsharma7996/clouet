const Posts = require('../../../models/post');

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
        message: "List of posts v2",
        posts: posts
    })
}