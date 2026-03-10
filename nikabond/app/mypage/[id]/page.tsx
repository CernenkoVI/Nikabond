'use client';

import { useState } from "react";
import Link from "next/link";
import MyAccountComponent from "@/app/components/mypage/MyAccountComponent";
import MyActorsComponent from "@/app/components/mypage/MyActorsComponent";
import MyCollectionsComponent from "@/app/components/mypage/MyCollectionsComponent";
import MyProjectsComponent from "@/app/components/mypage/MyProjectsComponent";
import MyRolesComponent from "@/app/components/mypage/MyRolesComponent";
import MyAgentsComponent from "@/app/components/mypage/MyAgentsComponent";

type Section = "account" | "projects" | "actors" | "collections" | "roles" | "agents";

const menuItems: { key: Section; label: string }[] = [
    { key: "account", label: "My Account" },
    { key: "projects", label: "My Projects" },
    { key: "actors", label: "My Actors" },
    { key: "collections", label: "My Collections" },
    { key: "roles", label: "My Roles" },
    { key: "agents", label: "My Agents" },
];

const sectionComponents: Record<Section, React.FC> = {
    account: MyAccountComponent,
    projects: MyProjectsComponent,
    actors: MyActorsComponent,
    collections: MyCollectionsComponent,
    roles: MyRolesComponent,
    agents: MyAgentsComponent,
};

const MyPage = () => {
    const [activeSection, setActiveSection] = useState<Section>("account");

    const ActiveComponent = sectionComponents[activeSection];

    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-3">
            <div className="flex gap-6">
                {/* Sidebar */}
                <nav className="w-[220px] shrink-0">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.key}>
                                <button
                                    onClick={() => setActiveSection(item.key)}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-base cursor-pointer transition-colors ${
                                        activeSection === item.key
                                            ? "bg-lime-500 text-white font-medium"
                                            : "bg-lime-100 hover:bg-lime-200"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/inbox/1"
                                className="block w-full text-left px-4 py-2.5 rounded-xl text-base bg-lime-100 hover:bg-lime-200 transition-colors"
                            >
                                Inbox
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                    <ActiveComponent />
                </div>
            </div>
        </main>
    );
};

export default MyPage;
