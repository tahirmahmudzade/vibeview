"use client";

import { Card, Skeleton } from "@nextui-org/react";

export default function SectionSkeleton({ title }: { title: string }) {
  return (
    <div>
      {/* Section Title */}
      <h2 className="text-2xl font-semibold mb-4 tracking-tight text-gray-400">
        {title}
      </h2>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {[...Array(10)].map((_, idx) => (
          <Card
            key={idx}
            className="
              p-4 bg-black/50 rounded-xl shadow-md border border-white/10 h-[220px]
            "
          >
            {/* Image Skeleton */}
            <Skeleton className="rounded-full">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-default-300 rounded-full" />
            </Skeleton>

            {/* Placeholder Info */}
            <div className="flex flex-col items-center gap-2 mt-4">
              {/* Title */}
              <Skeleton className="rounded-lg">
                <div className="h-4 w-3/4 bg-default-300" />
              </Skeleton>

              {/* Subtitle */}
              <Skeleton className="rounded-lg">
                <div className="h-3 w-2/4 bg-default-300" />
              </Skeleton>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
