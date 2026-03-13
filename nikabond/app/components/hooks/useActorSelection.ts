import { create } from "zustand";

interface ActorSelectionStore {
    selectedActorIds: string[];
    isSelectionMode: boolean;
    toggleActor: (id: string) => void;
    selectAll: (ids: string[]) => void;
    deselectAll: () => void;
    enterSelectionMode: () => void;
    exitSelectionMode: () => void;
}

const useActorSelection = create<ActorSelectionStore>((set) => ({
    selectedActorIds: [],
    isSelectionMode: false,
    toggleActor: (id) =>
        set((state) => ({
            selectedActorIds: state.selectedActorIds.includes(id)
                ? state.selectedActorIds.filter((aid) => aid !== id)
                : [...state.selectedActorIds, id],
        })),
    selectAll: (ids) =>
        set((state) => {
            const merged = new Set([...state.selectedActorIds, ...ids]);
            return { selectedActorIds: Array.from(merged) };
        }),
    deselectAll: () => set({ selectedActorIds: [] }),
    enterSelectionMode: () => set({ isSelectionMode: true, selectedActorIds: [] }),
    exitSelectionMode: () => set({ isSelectionMode: false, selectedActorIds: [] }),
}));

export default useActorSelection;
