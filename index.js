var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/Database', (err) => {
  if (err) {
    console.log('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

var db = mongoose.connection;
db.on('error', () => console.log('Error connecting to Database'));
db.once('open', () => console.log('Connected to database'));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  phone: String,
  gender: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.post("/signup", (req, res) => {
  var name = req.body.name;
  var age = req.body.age;
  var email = req.body.email;
  var phone = req.body.phone;
  var gender = req.body.gender;
  var password = req.body.password;

  var data = {
    "name": name,
    "age": age,
    "email": email,
    "phone": phone,
    "gender": gender,
    "password": password
  };

  const user = new User(data);
  user.save((err, user) => {
    if (err) {
      throw err;
    }
    console.log("Inserted Successfully");
  });

  return res.redirect('signup_success.html');
});

app.get("/", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*"
  });
  return res.redirect('index.html');
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});