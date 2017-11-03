// Express
let express = require("express");
let app = express();
const path = require("path");

var jwt = require('jsonwebtoken');
var secret = 'secret';
// Static Folder
app.use(express.static(__dirname + '/public/dist'));

// Body Parser
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Morgan
let morgan = require("morgan");
app.use(morgan('dev'));

// Mongo Database
let mongoose = require("mongoose");

var mongodbUri = 'mongodb://DIN66008608.corp.Capgemini.com:27017/ecDB';

var options = {};

var connection = mongoose.connect(mongodbUri,options, function(err) {	
	if(err){
		logger.error('Connection Failed.'+err);
	} else {
		console.log('Connection Successful');	
	}
});


let ecUser = new mongoose.Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    editable: { type: Boolean, require: true }
})

mongoose.model("ecUser", ecUser);
let User = mongoose.model("ecUser");

// Routes
//Authenticate
//User Login Route
app.post('/authenticate', function(req,res){
    console.log(req.body.username,req.body.password)
    User.findOne({email: req.body.username}).select('email _id password first_name last_name').exec(function(err,user){
        if(err) throw err;        
        if(!user){
            res.json({success:false,message:'could not authenticate user'});			
        }else if (user){
            if(req.body.password ){
                var validPassword = req.body.password;		
            }else{
                res.json({success:false, message:'No password Provided'});			
            }				
            if(!validPassword){
                res.json({success:false,message:'could not authenticate user'});			
            }else{
                var token = jwt.sign({_id:user._id},secret,{expiresIn: '10h'});
                res.json({success:true,message:'User Authenticates',token: token,userdetails:user});			
            }
        }
    });
});


// Get Users
app.get("/users", (req, res, next) => {
    console.log("Server > GET '/users' ");
    User.find({}, (err, users)=>{
        return res.json(users);
    })
})

// Create User
app.post("/users", (req, res, next) => {
    console.log("Server > POST '/users' > user ", req.body);
    delete req.body._id
    delete req.body.editable
    User.create(req.body, (err, user)=>{
        if (err) return res.json(err)
        else return res.json(user)
    })
})
// Destroy User
app.delete("/users/:id", (req, res, next) => {
    console.log("Server > DELETE '/users/:id' > id ", req.params.id);
    User.deleteOne({_id:req.params.id}, (err, rawData)=>{
        if (err) return res.json(err)
        else return res.json(true)
    })
})
app.put("/users/:id", (req, res, next) => {
    console.log("Server > PUT '/users/:id' > id ", req.params.id);
    delete req.body.editable
    console.log("Server > PUT '/users/:id' > user ", req.body);
    User.update({_id:req.params.id}, req.body, (err, rawData)=>{
        if (err) return res.json(err)
        else return res.json(true)
    })
    
})

app.all("*", (req,res,next) => {
    res.sendfile(path.resolve("./public/dist/index.html"))
})


app.listen(1337, function(){
	console.log('Running the Server on port : ' + 1337);
});