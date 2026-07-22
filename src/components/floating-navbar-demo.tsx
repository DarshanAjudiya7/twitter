"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import {
  IconBell,
  IconBook,
  IconBrandHipchat,
  IconHome,
  IconSearch,
  IconUsersGroup,
  IconUserCircle,
  IconTrophy,
  IconChartBar,
} from "@tabler/icons-react";

export default function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Chat",
      link: "/chat",
      icon: <IconBrandHipchat className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Blogs",
      link: "/blogs",
      icon: <IconBook className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Communities",
      link: "/communities",
      icon: <IconUsersGroup className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Leaderboard",
      link: "/leaderboard",
      icon: <IconTrophy className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Analytics",
      link: "/analytics",
      icon: <IconChartBar className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Profile",
      link: "/profile/alicedev",
      icon: <IconUserCircle className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="relative z-50 w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
