const { default: axios } = require("axios");

const getPosts = (req, res) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts`)
         .then(response => {
             res.status(200).jsonp({success:true, data: response.data});
         });
}

const getPost = (req, res) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`)
        .then(response => {
            res.status(200).jsonp({success:true, data: response.data});
        });
}

const getComments = (req, res) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}/comments`)
        .then(response => {
            res.status(200).jsonp({success:true, data: response.data});
        });
}

const createPost = (req, res) => {
    axios.post(`https://jsonplaceholder.typicode.com/posts`, req.body)
    .then(response => {
        res.status(200).jsonp({success:true, data: response.data});
    });
}

const updatePost = (req, res) => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`, req.body)
    .then(response => {
        res.status(200).jsonp({success:true, data: response.data});
    });
}
const patchPostData = (req, res) => {
    axios.patch(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`, req.body)
    .then(response => {
        res.status(200).jsonp({success:true, data: response.data});
    });
}

const deletePost = (req, res) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`, req.body)
    .then(response => {
        res.status(200).jsonp({success:true, data: true});
    });
}

module.exports = {
    getPosts,
    getPost,
    getComments,
    createPost,
    updatePost,
    patchPostData,
    deletePost
}