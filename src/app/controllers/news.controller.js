class NewsPage{
    index(req, res){
        res.render('newspage')
    }
    show(req, res){
        res.send('hihi')
    }
}

export default new NewsPage