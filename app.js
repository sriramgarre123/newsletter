const express = require("express");
const bodyParser= require("body-parser");
const app = express();
const request = require("request");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"))

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
});
app.post("/",function(req,res){
    var fname =req.body.firstname;
    var lname =req.body.lastname;
    var email =req.body.email;
    var data ={
        members: [
            {
                
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: lname,


                }
            }
        ]
    };

    var jsonData =JSON.stringify(data);
  var options={
    url:"https://us4.api.mailchimp.com/3.0/lists/178cf9c268",
    method : "POST",
    headers:{
        "Authorization":"sriram 16e1591fa9c5f8862cf0494ea53f20b9-us4"
    },
    body : jsonData
    
  };
    
    request(options, function(error,response,body){
      if(error){
          res.send("Go and try Again")
        //   console.log(error)
              }
   else{
       res.sendFile(__dirname + "/sucess.html");
       console.log(response.statusCode)
   }
            })

    });

app.listen(process.env.PORT || 3000 ,function()
{
console.log("running successfully")
})





