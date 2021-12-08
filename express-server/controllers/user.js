const { default: axios } = require("axios");

const getUsers = (req, res) => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
         .then(response => {
             res.status(200).jsonp({success:true, data: response.data});
         });
}

const getUser = (req, res) => {
    return axios.get('https://jsonplaceholder.typicode.com/users/${req.params.id}')
         .then(response => {
             res.status(200).jsonp({success:true, data: response.data});
         });
}

module.exports = {
    getUsers,
    getUser
}