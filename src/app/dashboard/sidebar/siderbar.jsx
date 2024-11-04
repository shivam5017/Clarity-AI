"use client";
import React, { useState, useContext } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/app/aceternity/ui/sidebar";
import Dummy from "@/app/images/example.png";
import {
  IconHeartSpark,
  IconBrandTabler,
  IconTemplate,
  IconHistory,
  IconLogout2
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import HistoryContent from "../history/page";
import DashboardContent from "../dashboard/page";
import TemplateContent from "../template/page";
import FavTemplate from "../favtemplate/page";
import { AuthContext } from "../../context/AuthContext"; 
import Spinner from "@/app/aceternity/spinner";

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("dashboard");
  const { logout, userDetails, userDetailsLoading } = useContext(AuthContext);
  
  const usernameDisplay = userDetailsLoading ? <Spinner />: userDetails.username || "User"
  
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setSelected("dashboard"),
    },
    {
      label: "History",
      href: "#",
      icon: <IconHistory className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setSelected("history"),
    },
    {
      label: "Templates",
      href: "#",
      icon: <IconTemplate className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setSelected("template"),
    },
    {
      label: "Favorite Templates",
      href: "#",
      icon: <IconHeartSpark className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => setSelected("favtemplate"),
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconLogout2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: logout, // Use logout function from AuthContext
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 h-full">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} onClick={link.onClick} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label:usernameDisplay,
                href: "#",
                icon: (
                  <Image
                    src={Dummy}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard selected={selected} />
    </div>
  );
}

const Logo = () => (
  <a
    href="#"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-black dark:text-white whitespace-pre"
    >
      Clarity AI
    </motion.span>
  </a>
);

const LogoIcon = () => (
  <a
    href="#"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
  </a>
);

const Dashboard = ({ selected }) => {
  let Content;
  if (selected === "history") {
    Content = <HistoryContent />;
  } else if (selected === "dashboard") {
    Content = <DashboardContent />;
  } else if (selected === "template") {
    Content = <TemplateContent />;
  } else {
    Content = <FavTemplate />;
  }

  return (
    <div className="flex flex-1 h-full">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        {Content}
      </div>
    </div>
  );
};
