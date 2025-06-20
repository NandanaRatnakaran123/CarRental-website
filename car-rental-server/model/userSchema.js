import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    _id:{
        tpye :string ,
        required :true
    },
    username:{
        type:string,
        required:true
    },
    email:{
        type:string,
        required:true
    },
    image:{
        type:string,
        required:true
    },
    role:{
        type:string,
        enum:['user','owner'],default:'user'
        
    },
    recentSearchCities:[{
        type:string,
        required:true
    }]
    
});

const User=mongoose.model('user',userSchema);
export default User