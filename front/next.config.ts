import type { NextConfig } from "next";
import { sources } from "next/dist/compiled/webpack/webpack";

const nextConfig = {
  rewrites:()=>{
    return[
      {
        source:"/",
        destination:"/task"
      },
      {
        source:"/task_register",
        destination:"/register_task"
      }
    ]
  }
};

export default nextConfig;
