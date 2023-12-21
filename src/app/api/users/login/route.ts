import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, userpassword} = reqBody;

    
        //check if user already exists
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User didn't exists"}, {status: 400})
        }

        //hash password
        const validPassword = await bcryptjs.compare(userpassword, user.password);
        
        if(!validPassword){
            return NextResponse.json({
                error: "invalid password",
            },{status:400})
        }
        console.log(`password hashed`)
        
        // create token data 
        const tokendata = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        // create token 
        const token = await jwt.sign(tokendata,process.env.TOKEN_SECRET!, {expiresIn:"1d"});

        const response = NextResponse.json({
            message:"login successful",
            success: true,
        });
        response.cookies.set("token",token,{httpOnly:true})

        return response;


    } catch (error: any) {
        return NextResponse.json({error: error.message,mm:8520},{status: 500})

    }
}