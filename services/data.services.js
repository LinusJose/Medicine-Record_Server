const { mquery } = require('mongoose');
const db = require('./db')

  const login=(req,email,password)=> {
  return db.User.findOne({email,password})
  .then(user=>{
    if(user){
      console.log(user)
       req.session.currentUser=user.email;     
      return{
        statusCode:200,
           status:true,
           message:"successfully login",
           name:user.username  
       }
    }
    else{
      return{
        statusCode:422,
          status:false,
          message:"Invalid credentials"
      }
    }
  })
  }
 
  const register=(email,username,password)=>{
    return db.User.findOne({email})
    .then(user=>{
      if(user){
     return {
       statusCode:422,
       status:false,
       message:"User exist"
     }
   }
     else{
      const newUser=new db.User({
         email,
         username,
         password,
       })
       newUser.save();
    return{
     statusCode:200,
        status:true,
        message:"successfully registered"
    }
     }
    })
 }

  const addData=(req,email,medicine,quantity)=>{
    return db.User.findOne({email})
    .then(user=>{
       if(user){
        user.event.push({medicine:medicine,quantity:quantity})
        user.save()
        return{
            statusCode:200,
            status:true,
            message:"saved",  
        }
        }
        else{
            return{
            statusCode:422,
            status:false,
            message:"can't save"
        }
      }
        })
}

  


const DisplayMedicineData=(email)=>{
  return db.User.findOne({email})
  .then((user)=>{
    if(user){
    
    return{
      statusCode:200,
      status:true,
      message: msg
      }
}
else{
  return{
    statusCode:422,
    status:false,
    message:"can't get"
}
}
  })
}

  module.exports={
    register,
    login,
     addData,
     DisplayMedicineData
     }