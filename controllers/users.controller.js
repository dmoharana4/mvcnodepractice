var userobj = [{
    name: "user1",
    age: 25
  }, {
    name: "user2",
    age: 35
  },
  {
    name: "user3",
    age: 35
  }, {
    name: "user4",
    age: 35
  }, {
    name: "user5",
    age: 35
  },
  {
    name: "user6",
    age: 35
  }, {
    name: "user7",
    age: 35
  }, {
    name: "user8",
    age: 35
  },
  {
    name: "user9",
    age: 35
  }, {
    name: "user10",
    age: 35
  }, {
    name: "user11",
    age: 35
  }
];


module.exports.getusers = (req, res) => {
  res.status(200).json(userobj);
  console.log("indide users bro");
};

module.exports.getuser = (req, res) => {
  var flag = true ;
  for (var index in userobj) {
    for (var key in userobj[index]) {
      if (userobj[index][key] == req.query.name) {
        res.status(200).json(userobj[index]);
        flag = false ;
        break ;
      }
    }
  }
  if(flag){
    res.status(200).send("user not found");
  }
};
module.exports.putusers = (req, res) => {
  var newuserobj = {}
  newuserobj.name = req.query.name
  newuserobj.age = req.query.age
  userobj.push(newuserobj)
  res.status(200).json(userobj);
  console.log("successfully added bro");
};
module.exports.deleteusers = (req, res) => {
  var flag = true ;
  for (var index in userobj) {
    for (var key in userobj[index]) {
      if (userobj[index][key] == req.query.name) {
        res.status(200).json(userobj[index]);
        userobj.splice(index,1)
        flag = false ;
        break ;
      }
    }
  }
  if(flag){
    res.status(200).send("user not found");
  }
};
