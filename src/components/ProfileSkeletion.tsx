"use client";

import { Card, Skeleton } from "@nextui-org/react";

export default function ProfileSkeleton() {
  return (
    <Card
      className="
        relative p-8 rounded-3xl shadow-2xl
        bg-gradient-to-br from-[#0C1F11] to-[#1A3B23]
      "
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image Skeleton */}
        <Skeleton className="rounded-full border-[5px] border-green-600">
          <div className="w-[144px] h-[144px] rounded-full bg-default-300" />
        </Skeleton>

        {/* Profile Info Skeleton */}
        <div className="flex flex-col items-center md:items-start space-y-3 w-full">
          <Skeleton className="rounded-lg">
            <div className="h-6 w-[150px] bg-default-300" />
          </Skeleton>
          <Skeleton className="rounded-lg">
            <div className="h-4 w-[120px] bg-default-300" />
          </Skeleton>
          <div className="flex gap-2 mt-2">
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} className="rounded-full">
                <div className="h-6 w-[80px] bg-default-300" />
              </Skeleton>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
