"use client";

import { UserProfile } from "@/types/types";
import { Card } from "@nextui-org/react";
import Image from "next/image";
import { FaUsers } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

export default function ProfileCard({ user }: { user: UserProfile }) {
  return (
    <Card className="p-6 bg-gradient-to-br from-green-800 to-green-900 rounded-xl shadow-xl">
      <div className="flex items-center gap-6">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-full ">
          <Image
            priority
            src={user.images[0].url}
            alt={user.display_name || "User Image"}
            width={144}
            height={144}
          />
        </div>

        {/* User Info */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {user.display_name}
          </h1>
          <div className="flex flex-wrap gap-2 text-gray-200 text-sm">
            <span className="bg-black/30 px-3 py-1 rounded-full flex items-center gap-1">
              <FaUsers className="text-green-300" /> {user.followers.total}
            </span>
            <span className="bg-black/30 px-3 py-1 rounded-full flex items-center gap-1">
              <MdOutlineAlternateEmail className="text-green-300" />{" "}
              {user.email}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
