"use client";

import { UserProfile } from "@/types/types";
import { Card } from "@nextui-org/react";
import Image from "next/image";
import { FaUsers, FaSpotify, FaFlag } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

export default function ProfileCard({ user }: { user: UserProfile }) {
  return (
    <Card
      className="
        relative p-8 rounded-3xl shadow-2xl
        overflow-hidden bg-gradient-to-br from-[#0C1F11] to-[#1A3B23]
        transition-all duration-300
      "
    >
      {/* Background Overlay */}
      <div
        className="
          absolute inset-0 z-0 pointer-events-none
          bg-[radial-gradient(circle,_rgba(0,255,123,0.15)_0%,_rgba(0,0,0,0)_60%)]
          opacity-30
        "
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image Container */}
        <div className="relative overflow-hidden rounded-full border-[5px] border-green-600">
          <Image
            priority
            src={user.images[0]?.url || "/placeholder.png"}
            alt={user.display_name || "User Image"}
            width={144}
            height={144}
            className="object-cover"
          />
        </div>

        {/* User Info */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <h1
            className="
              text-3xl md:text-4xl font-extrabold mb-2
              text-green-100
            "
          >
            {user.display_name}
          </h1>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start text-gray-200 text-xs md:text-sm mt-3">
            {/* Followers */}
            <span
              className="
                bg-black/30 px-3 py-1 rounded-full flex items-center gap-1
                hover:bg-black/50 transition-colors
              "
            >
              <FaUsers className="text-gray-300" />
              {user.followers?.total || 0} Followers
            </span>

            {/* Email */}
            {user.email && (
              <span
                className="
                  bg-black/30 px-3 py-1 rounded-full flex items-center gap-1
                  hover:bg-black/50 transition-colors
                  max-w-full truncate
                "
                title={user.email}
              >
                <MdOutlineAlternateEmail className="text-gray-300" />
                {user.email}
              </span>
            )}

            {/* Country */}
            {user.country && (
              <span
                className="
                  bg-black/30 px-3 py-1 rounded-full flex items-center gap-1
                  hover:bg-black/50 transition-colors
                "
              >
                <FaFlag className="text-gray-300" />
                {user.country}
              </span>
            )}

            {/* Spotify Profile Link */}
            <a
              href={user.external_urls?.spotify || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="
                bg-green-700 px-3 py-1 rounded-full flex items-center gap-1
                hover:bg-green-600 hover:scale-[1.02] transform transition-all
                whitespace-nowrap
              "
            >
              <FaSpotify className="text-white" />
              Spotify Profile
            </a>
          </div>

          {/* Product Info */}
          <p className="mt-3 text-gray-400 italic text-xs md:text-sm">
            {`Spotify Plan: ${
              user.product
                ? user.product.charAt(0).toUpperCase() + user.product.slice(1)
                : "N/A"
            }`}
          </p>
        </div>
      </div>
    </Card>
  );
}
