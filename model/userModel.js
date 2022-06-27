import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    sheetNo:{
        type:Number
    }, 
    catg:{
        type:String
    }, 
    type:{
        type:String
    }, 
    size:{
        type:Number
    },
    ownersName:{
        type:String
    },
    mobileNo:{
        type:Number
    }, 
    secondMobileNo:{
        type:String
    }, 
    thirdMobileNo:{
        type:String
    }, 
    plotNo:{
        type:Number
    }, 
    secNo:{
        type:String
    }, 
    communityCenter:{
        type:String
    },
    refNo:{
        type:String
    }, 
    emailId:{
        type:String
    }, 
    cnicNo:{
        type:  String
    },
    mem:{
        type:String
    }, 
   
  })
  
  const User = mongoose.model('DHA', userSchema)

  export default User