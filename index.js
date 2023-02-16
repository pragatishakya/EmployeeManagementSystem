const express=require('express')
const app= express()
const db= require('./model/connection')
const engine=require('express-handlebars').engine

app.use(express.json())   //middleware
app.use(express.urlencoded({extended:true}))
app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.set('views','./views')

app.post("/addUser",(req,res)=>{
    const user={name:req.body.name,email:req.body.email,phone:req.body.phone,city:req.body.city}
    let sql="INSERT INTO employee SET ?"
    db.query(sql,user, (err,result)=>{
        if(err) throw err
        else {
            // res.json(result)
            res.redirect("/showAllUser")
        }
    })
})

app.get("/showAllUser",(req,res)=>{
    let sql="SELECT * FROM employee"
    db.query(sql,(err,result)=>{
        if(err) throw err
        else {
            // res.json(result)
            res.render('show',{list:result})
        }
    })
})

app.get("/showUser/:id",(req,res)=>{
    const sql=`SELECT * FROM employee WHERE id=` + req.params.id
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        res.json(result)
    })
})

app.get("/deleteUser/:id",(req,res)=>{
    const sql="DELETE FROM employee WHERE id="+req.params.id
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        // res.json(result)
        res.redirect("/showAllUser")
    })
})

app.post("/updateUser/:id",(req,res)=>{
    const name=req.body.name
    const email=req.body.email
    const city=req.body.city
    const phone= req.body.phone
    const sql=`UPDATE employee SET name='${name}', email='${email}', city='${city}', phone='${phone}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        // res.json(result)
        res.render('show')
    })
})

app.get("/",(req,res)=>{
    res.render('home')
})

const PORT=process.env.PORT || 3000
app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))