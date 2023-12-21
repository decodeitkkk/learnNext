"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const login = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        userpassword: "",
    });
    const [loading, setLoading] = React.useState(false);
    const login = async () => {
        try {
            setLoading(true);
            const resposne = await axios.post("/api/users/login", user);
            console.log(resposne.data);
            router.push("/profile");
        } catch (error: any) {
            console.log(`Login failed : ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                maxWidth: "500px",
            }}
        >
            <h1 className="bg-red-500  " > {loading ? "Loading..." : "login"} </h1>
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
            <button onClick={login}>Login</button>
            <div>
                <Link href={"/signup"}>Signup page</Link>
            </div>
        </div>
    );
};

export default login;
