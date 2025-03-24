// components/ProfileHeader.tsx
"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function ProfileHeader() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            {user.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-300 flex items-center justify-center text-gray-600">
                {user.firstName?.[0] || user.username?.[0] || "?"}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">
              {user.firstName
                ? `${user.firstName} ${user.lastName || ""}`
                : user.username}
            </span>
            <span className="text-sm text-gray-500">
              {user.emailAddresses[0]?.emailAddress}
            </span>
          </div>
          <UserButton afterSignOutUrl="/" />
        </>
      ) : (
        <span className="text-gray-600">Not signed in</span>
      )}
    </div>
  );
}
