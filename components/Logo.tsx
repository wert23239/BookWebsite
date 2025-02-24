"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Logo: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center items-center h-32 w-full bg-gray-100">
      <h1 className="text-4xl font-bold">
        {session?.user?.name
          ? `${session.user.name}'s Hyper Reality`
          : "Hyper Reality"}
      </h1>
    </div>
  );
};

export default Logo;
