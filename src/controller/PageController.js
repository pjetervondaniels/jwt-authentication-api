module.exports = {
    view (req, res){
        res.send(req.user);
    }
}