"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const signup = () => {
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        email: "",
        username: "",
        userpassword: "",
    });
    const signup = async () => {
        console.log(`this is user on frontend: ${user.username}`);

        try {
            const res = await axios.post("/api/users/signup", user);
            console.log(`Signup successfull : ${res.data.username}`);
            router.push("/login");
        } catch (error: any) {
            console.log(`an error occured : ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (
            (user.email.length > 0,
            user.username.length > 0,
            user.userpassword.length > 0)
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    return (
        <div>
            <h1> {loading ? "Loading..." : "Signup Form"} </h1>
            <label htmlFor="email">Email</label>
            <input
                style={{ color: "black" }}
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                name="email"
                id="email"
            />
            <hr />
            <label htmlFor="username">Username:</label>
            <input
                style={{ color: "black" }}
                type="text"
                name="username"
                id="username"
                value={user.username}
                onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
                }}
            />
            <hr />
            <label htmlFor="userpassword">UserPassword</label>
            <input
                style={{ color: "black" }}
                type="password"
                name="userpassword"
                id="userpassword"
                value={user.userpassword}
                onChange={(e) => {
                    setUser({ ...user, userpassword: e.target.value });
                }}
            />
            <hr />
            <button onClick={signup}>
                {" "}
                {buttonDisabled ? `No Signup` : `Signup`}{" "}
            </button>
            <div>
                <Link href={"/login"}>Login page</Link>
            </div>
        </div>
    );
};

export default signup;
