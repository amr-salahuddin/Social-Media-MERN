
exports.deletePostAPI = async (token, postId) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/post/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    console.log(response.status)
    const data = await response.json()
    return response.ok
}