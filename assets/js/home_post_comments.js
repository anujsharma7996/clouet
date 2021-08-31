class PostComments {
    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;

        $(' .delete-button', this.postContainer).each(function () {
            self.deleteComment($(this));
        });
    }

    createComment(postId) {
        let pSelf = this;
        this.newCommentForm.submit(function (e) {
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function (data) {
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    newCommentDom(comment) {
        return $(`<li id="comment-${comment._id}">
    <div class=" comment-content">
    <div id="name">
        <p class="name-size">
            ${comment.user.name}
        </p>

            <a class="delete-button" href="/comments/destroy/${comment.id}">
                <i class="fas fa-trash-alt"></i></a>
    </div>

    <div class="post-comment-size">
        ${comment.content}
    </div>
    </div>
</li>`);
    }

    deleteComment(deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#comment-${data.data.comment_id}`).remove();

                }, error: function (error) {
                    console.log(error.responseText);
                }
            });

        });
    }

    convertCommentToAjax() {
        $('.post-comments-list>ul>li').each(function () {
            let self = $(this);
            let deleteButton = $(' .delete-button', self);
            deleteComment(deleteButton);

            // get the comment's id by splitting the id attribute
            let commentId = self.prop('id').split("-")[1]
            new PostComments(commentId);
        });
    }

    convertCommentToAjax();
}