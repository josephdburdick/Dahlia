FlowRouter.route('/update/:postId', {
    name: 'update',
    action: function(params) {
        console.log("This is my update post:", params.postId);
    }
});
