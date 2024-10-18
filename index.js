import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));//to use static files like css , images in public folder
app.use(bodyParser.urlencoded({ extended: true }));

var blogs = [];
app.get("/", (req, res) => {
    res.render("index.ejs");
  });

  // ADD BUTTON
app.post("/submit",(req,res)=>{
    res.render("edit.ejs");
})

// SAVE OR UPDATE
app.post("/save",(req,res)=>{
    if(req.body["save"]!=undefined){
        blogs.push({content:req.body.content});
        res.render("index.ejs",{blogs:blogs});
    }
    else if(req.body["update"]!=undefined){
        console.log(req.body["content"]);
        blogs[parseInt(req.body["update"])]["content"]=req.body["content"]
        res.render("index.ejs",{blogs:blogs});
    }
    else{
        res.render("index.ejs");
    }
})

// DELETE OR EDIT 
app.post("/update",(req,res)=>{
    if(req.body.delete!=undefined){
        if(req.body.delete != NaN)blogs.splice(parseInt(req.body.delete),1);
        // console.log(blogs);
        res.render("index.ejs",{blogs:blogs});
    }
    else{
        // console.log(req.body.edit);
        res.render("edit.ejs",{
            index:req.body.edit,
            blogs:blogs
        });
    }
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});






