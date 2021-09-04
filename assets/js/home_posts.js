// method to submit the form data for new post using AJAX
{
    // const { PostComments } = require("./home_post_comments");

    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('.post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    new PostComments(data.data.post._id);

                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM

    let newPostDom = function (post) {
        return $(`
<li class="post-container" id="post-${post._id}">
    <p>
    <div>
        <p class="name-size">
            <!-- Name -->
            ${post.user.name}
        </p>
            <a class="delete-post-button"  href="/posts/destroy/${post._id}">
                <i class="fas fa-trash-alt"></i></a>
    </div>

    <!-- Post content -->
    <div class="post-content">
        ${post.content}
    </div>

    </p>

    <div class="post-comments">

            <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Add comment..." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Comment">
            </form>

                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                        
                    </ul>
                </div>
    </div>

</li>`)
    }


    // method to delete a post in DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }


    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function () {
        $('.post-list-container>ul>li').each(function () {
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();
}

