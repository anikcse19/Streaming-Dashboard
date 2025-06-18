/* eslint-disable react/prop-types */
import { useState } from "react";

import {
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  X,
  LogOut,
} from "lucide-react";
import { CiStreamOn } from "react-icons/ci";
import { Button } from "../../componentscomponents/ui/button";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../componentscomponents/ui/collapsible";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { MdEventAvailable } from "react-icons/md";
import { GiVerticalBanner } from "react-icons/gi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = useLocation();
  const [expandedItems, setExpandedItems] = useState(["doctors"]);
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("stream-token");
    console.log("token remove");
    navigate("/");
  };
  const toggleExpanded = (item) => {
    setExpandedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Event",
      icon: MdEventAvailable,
      href: "/dashboard/event",
    },
    {
      title: "Banner",
      icon: GiVerticalBanner,
      href: "/dashboard/banner",
    },
  ];

  const renderMenuItem = (item, level = 0) => {
    const isActive = pathname.pathname === item.href;
    console.log("pathname", pathname);
    console.log("item.href", item.href);
    console.log("isActive",isActive)
    const isExpanded = expandedItems.includes(item.title.toLowerCase());
    const hasChildren = item.children && item.children.length > 0;
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <Collapsible
          key={item.title}
          open={isExpanded}
          onOpenChange={() => toggleExpanded(item.title.toLowerCase())}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={clsx(
                "w-full justify-start text-left font-normal hover:bg-blue-50 hover:text-blue-700 transition-colors",
                level === 0 ? "px-3 py-2 mb-1" : "px-6 py-1.5 text-sm",
                level === 1 ? "ml-4" : "",
                isActive && "bg-blue-100 text-blue-700 font-medium"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {Icon && level === 0 && <Icon className="h-4 w-4 mr-3" />}
                  <span>{item.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {item.children.map((child) => renderMenuItem(child, level + 1))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Link key={item.href} to={item.href} onClick={onClose}>
        <Button
          variant="ghost"
          className={clsx(
            "w-full justify-start text-left font-normal hover:bg-blue-50 hover:text-blue-700 transition-colors",
            level === 0 ? "px-3 py-2 mb-1" : "px-6 py-1.5 text-sm",
            level === 1 ? "ml-4" : "",
            level === 2 ? "ml-8" : "",
            isActive && "bg-blue-100 text-blue-700 font-medium"
          )}
        >
          {Icon && level === 0 && <Icon className="h-4 w-4 mr-3" />}
          <span>{item.title}</span>
        </Button>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={clsx(
          "fixed left-0 top-0 h-full w-64 bg-[#0B1D51] dark:bg-slate-800 text-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between",
          "lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#18358e] rounded-lg flex items-center justify-center">
              <CiStreamOn className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-blue-200">
                Streaming Dashboard
              </h2>
              <p className="text-xs text-blue-500">Sports Dashboard</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {menuItems.map((item) => renderMenuItem(item))}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-blue-200 bg-blue-900/80 dark:bg-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-700  hover:bg-blue-800 text-white font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
          <p className="text-xs text-blue-100 text-center mt-3">
            © {new Date().getFullYear()} RexVets. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
