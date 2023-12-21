import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, userpassword} = reqBody;

        console.log(`this is reqBody.username: ${reqBody.username}`);
        console.log(`this is reqBody.email: ${reqBody.email}`);
        console.log(`this is reqBody.password: ${reqBody.userpassword}`);

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(userpassword, salt)

        console.log(`password hashed`)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        //      SAVING NEW USER 
        const savedUser = await newUser.save()
        console.log(`this is after savedUser: ${savedUser}`);

        //send verification email
        
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message,mm:8520},{status: 500})

    }
}