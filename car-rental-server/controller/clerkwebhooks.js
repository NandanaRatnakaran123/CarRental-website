import { Webhook } from "svix";
import User from "../model/userSchema.js";
import { Message } from "svix/dist/api/message.js";


const clerkwebhook = async (req, res) =>{
    try {
        const whook= new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        
        // getting headers
        const headers= {
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"],
        }
        // verifying headers

        await whook.verify(JSON.stringify(req.body),headers)
        // getting data from request body
        const {data, type} = req.body
        const userData = {
            _id:data.id,
            email :data.email_address[0].email_address,
            username:data.first_name + " " +data.last_name,
            Image:data.image_rul,
        }

        // switch cases for different events
        switch (type){
            case "user.created":{
                await User.create(userData)
                break;
            }
            case "user.updated":{
                await User.findByAndUpdate(data.id, userData)
                break;
            }
            case "user.deleted":{
                await User.findByAndDelete(data.id)
                break;
            }

            default:
                break;
        }
        res.json({success:true ,messge:"webhook recieved"})
    } catch (error) {
        console.log(error.messge);
         res.json({ success:false , Message: error.messge})
    }
}

export default clerkwebhook