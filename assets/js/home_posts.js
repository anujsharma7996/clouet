// method to submit the form data for new post using AJAX
{
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
            <a class="delete-post-button" href="/posts/destroy/${post.id}">
                <i class="fas fa-trash-alt"></i></a>
    </div>

    <!-- Post content -->
    <div class="post-content">
        ${post.content}
    </div>

    </p>

    <div class="post-comments">

            <form action="/comments/create" method="POST">
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


    createPost();
}

