import course from "../models/course.js"

class CoursesController{
    
    show(req, res,next){
        console.log(req.cookie);
        course.findOne({slug: req.params.slug})
            .then((course)=>{
               if(course){
                res.render('courses/detail',{course})
               }
               else{
                   res.send('404')
               }
            })
            .catch(next)

    }
    create(req, res){
        res.render('courses/create')
    }

    store(req, res){
        req.body.img = `https://i.ytimg.com/vi/${req.body.idVideo}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLA1TeLGOu-5Shk-iskdlpV48G3mLA`
        const item = new course(req.body)
        item.save()
            .then(()=>res.redirect('/'))
    }

}
export default new CoursesController