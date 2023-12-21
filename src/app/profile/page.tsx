"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    let logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            router.push("/login");
        } catch (error: any) {
            console.log(`error : ${error.message}`);
        }
    };
    const getUserDetails = async () => {
      const res = await axios.get("api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
  };
    return (
        <div>
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">
                {data === "nothing" ? (
                    "Nothing"
                ) : (
                    <Link href={`/profile/${data}`}>{data}</Link>
                )}
            </h2>
            <hr />
            <div>
                <button onClick={logout}>Logout</button>
            </div>
            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                GetUser Details
            </button>
        </div>
    );
};

export default page;
