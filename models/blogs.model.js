const mongoose = require('mongoose')
const Schema = mongoose.Schema

var blogSchema = new Schema({
  title :String |Number ,
  author : String ,
  details: [{head:String , body:String,}] ,
  date:Date ,
  reviews:String ,
  ratings:Number
}) ;

// mongoose.model('model name' ,schemaname , collectionname)
mongoose.model('Blog',blogSchema,'hotels.blogs') ;
