import React from "react";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { NAV_LINKS } from "./navData";
import { Link } from "react-router-dom";

export default function DesktopNavMenu() {
    return (
        <NavigationMenu className="hidden lg:block">
            <NavigationMenuList className="gap-0.5 xl:gap-1">
                {NAV_LINKS.map((group) => (
                    <NavigationMenuItem key={group.label}>
                        <NavigationMenuTrigger className="px-3 xl:px-4 py-2 text-[14px] hover:cursor-pointer font-semibold text-slate-700 hover:text-emerald-600 data-[state=open]:text-emerald-600 bg-transparent data-[state=open]:bg-slate-100 rounded-lg transition-all duration-200">
                            {group.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[580px] xl:w-[640px] gap-2 p-4 grid-cols-2 bg-white rounded-2xl shadow-xl border border-slate-100/80">
                                {group.items.map((item) => (
                                    <li key={item.title}>
                                        <NavigationMenuLink>
                                            <Link
                                                to={item.href}
                                                className="block rounded-xl p-3 transition-all duration-200 hover:cursor-pointer hover:bg-slate-50 group/item border border-transparent hover:border-emerald-400"
                                            >
                                                <p className="text-[13.5px] font-bold text-slate-900 group-hover/item:text-emerald-600 transition-colors duration-200">
                                                    {item.title}
                                                </p>
                                                <p className="mt-0.5 text-[12px] leading-normal text-slate-500 font-medium">
                                                    {item.desc}
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}