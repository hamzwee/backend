import { request } from "http";
import mongoose from "mongoose";
import chalk from "chalk";
import express, { response } from "express";
import postModel from "./postSchema.js";


const app = express()




const DBURI = 'mongodb+srv://hamza:wowuseridcluster@cluster0.ymgli.mongodb.net/'


app.use(express.json());
app.use(express.urlencoded({extended:true}))


mongoose.connect(DBURI);

mongoose.connection.on("connected", () => console.log("MongoDB Connected"));

mongoose.connection.on("error", (err) => console.log("MongoDB Error", err));


// app.get('/products',(request,response)=>{
//     response.send(data)
// })

// // single product
// app.get('/products/:id',(request,response)=>{
//     const singleProid = request.params.id
//     const filterData = data.filter((e,i)=> e.id == singleProid)
//     response.send(filterData)
// })

app.get('/api/post',(req,res)=>{
    res.send("get post")
})
app.post('/api/post',async (req,res)=>{
    const {title,desc,postId} = req.body;

    if (!title || !desc ||!postId){
        res.json({
            message : "fields missing"
        });
        return;
    }

    const postObj = {
        title,
        desc,
        postId,
    }

    const response = await postModel.create(postObj);

    res.json({
        message:"post created",
        data : response,
    })


    res.send("create post")
    // console.log(req.body)
    // res.send("create post")
})
app.put('/api/post',(req,res)=>{
    res.send("update post")
})
app.delete('/api/post',(req,res)=>{
    res.send("delete post")
})


// app.get('/products',(req,res)=>{
   
//     console.log(req.query.id);
//     if(req.query.id){
//         const filterData = data.filter((e,i)=> e.id == req.query.id);
//         res.send(filterData);
//         return;

//     }
//     res.send(data)
// })


app.get('/',(request,response)=>{
    response.send("server running on /")
})

app.listen(6229,()=>{
    console.log(chalk.green.bgWhite.bold("Server Running ..."))
})


