module.exports.home = function (req, res) {
    return res.end('<h1> Home </h1>')
}

module.exports.profile = (req, res) => {
    return res.end('<h1> Profile </h1>')
}