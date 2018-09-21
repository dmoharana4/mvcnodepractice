let mongoose = require("mongoose")
var Schema = mongoose.Schema ;

let usersSchema = new Schema({
  id:'ObjectId' ,
  name:{type : String ,
    required:true
   },
  role:String ,
  email:{type:String ,
        required:true,
        unique:true
      } ,
  password:String ,
  adress:Array,
  phoneNumber:Number,
  activeStatus:{tyoe:Boolean,"default":false},
  gender:{type:String,
          "default":"Male"},
  regDate:{type:Date , "default":Date.now},
  lastLoginDate:{type:Date , "default":Date.now},

})

mongoose.model('UsersSchema',usersSchema,'hotels.users')
