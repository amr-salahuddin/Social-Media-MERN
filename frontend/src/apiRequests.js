exports.deletePostAPI = async (token, postId) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/post/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,

        }
    })
    return response.ok
}

exports.getFriendsAPI = async (userId) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/friends/${userId}`, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })

    if (response.ok) {
        const data = await response.json();
        const ok = response.ok;
        const friendsData = data.data.friends;
        return {ok, friendsData}
    }
}
exports.removeFriendAPI = async (token, friendId) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/friend/${friendId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return response.ok
}

exports.likePostAPI = async (token, postId, type) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/post/like/${postId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(
            {type})
    })

    return response.ok
}

exports.getCommentsAPI = async (postId, page) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/post/comments/${postId}`,
        {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
    )
    let fetchedComments;
    const ok = response.ok;

    if (ok) {
        const data = await response.json();
        fetchedComments = data.data.comments;
    }
    return {ok, fetchedComments}


}

exports.commentAPI = async (token, postId, comment, files) => {

    const formData = new FormData();


    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }
    formData.append('comment', comment);

    const response = await fetch(`${process.env.REACT_APP_BACKEND}/post/comment/${postId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })

    let ok = response.ok;
    if (ok) {
        const data = await response.json();
        const commentData = data.data.comment;
        return {ok, commentData}
    }
    return {ok}

}

exports.uncommentAPI = async (token, commentId) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/post/comment/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.ok
}
