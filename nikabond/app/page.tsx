'use client';

import { useEffect, useState } from "react";
import AdvancedFilters from "./components/AdvancedFilters";
import ActorsList from "./components/actors/ActorsList";
import FloatingSelectionBar from "./components/actors/FloatingSelectionBar";
import useActorSelection from "./components/hooks/useActorSelection";
import { getUserId } from "./lib/actions";

export default function Home() {
  const { isSelectionMode, enterSelectionMode, exitSelectionMode } = useActorSelection();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getUserId().then(setUserId);
  }, []);

  return (
      <main className="max-w-[1500px] mx-auto px-6">

        <AdvancedFilters />

        {userId && (
          <div className="flex items-center justify-end pb-2">
            {isSelectionMode ? (
              <button
                onClick={exitSelectionMode}
                className="px-4 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Cancel Selection
              </button>
            ) : (
              <button
                onClick={enterSelectionMode}
                className="px-4 py-1.5 rounded-lg text-sm font-medium text-lime-700 bg-lime-100 hover:bg-lime-200 transition-colors flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Select
              </button>
            )}
          </div>
        )}

        <div className="mt-4 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">
          <ActorsList />
        </div>

        <FloatingSelectionBar />
      </main>
  );
}
