'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import MyAccountComponent from "@/app/components/mypage/MyAccountComponent";
import MyActorsComponent from "@/app/components/mypage/MyActorsComponent";
import MyCollectionsComponent from "@/app/components/mypage/MyCollectionsComponent";
import MyProjectsComponent from "@/app/components/mypage/MyProjectsComponent";
import MyRolesComponent from "@/app/components/mypage/MyRolesComponent";
import MyAgentsComponent from "@/app/components/mypage/MyAgentsComponent";
import useAddProjectModal from "@/app/components/hooks/useAddProjectModal";
import useAddPortfolioModal from "@/app/components/hooks/useAddPortfolioModal";
import useAddRoleModal from "@/app/components/hooks/useAddRoleModal";
import useAddAgentModal from "@/app/components/hooks/useAddAgentModal";

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

const addIcons: Partial<Record<Section, React.ReactNode>> = {
    projects: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
    ),
    actors: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>
    ),
    roles: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
    ),
    agents: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>
    ),
};

const VALID_SECTIONS: Section[] = ["account", "projects", "actors", "collections", "roles", "agents"];

const MyPage = () => {
    const searchParams = useSearchParams();
    const initialSection = VALID_SECTIONS.includes(searchParams.get('section') as Section)
        ? (searchParams.get('section') as Section)
        : "account";
    const [activeSection, setActiveSection] = useState<Section>(initialSection);
    const addProjectModal = useAddProjectModal();
    const addPortfolioModal = useAddPortfolioModal();
    const addRoleModal = useAddRoleModal();
    const addAgentModal = useAddAgentModal();

    const addActions: Partial<Record<Section, () => void>> = {
        projects: () => addProjectModal.open(),
        actors: () => addPortfolioModal.open(),
        roles: () => addRoleModal.open(),
        agents: () => addAgentModal.open(),
    };

    const ActiveComponent = sectionComponents[activeSection];

    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-3">
            <div className="flex gap-6">
                {/* Sidebar */}
                <nav className="w-[220px] shrink-0">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.key} className="flex items-center gap-1">
                                <button
                                    onClick={() => setActiveSection(item.key)}
                                    className={`flex-1 text-left px-4 py-2.5 rounded-xl text-base cursor-pointer transition-colors ${
                                        activeSection === item.key
                                            ? "bg-lime-500/75 text-white font-semibold hover:bg-lime-500"
                                            : "bg-lime-100 hover:bg-lime-200"
                                    }`}
                                >
                                    {item.label}
                                </button>
                                {addIcons[item.key] && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addActions[item.key]?.();
                                        }}
                                        className="cursor-pointer text-lime-500 hover:text-lime-600 p-1"
                                    >
                                        {addIcons[item.key]}
                                    </button>
                                )}
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
