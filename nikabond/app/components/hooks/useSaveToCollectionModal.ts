import { create } from "zustand";

interface SaveToCollectionModalStore {
    isOpen: boolean;
    actorIds: string[];
    open: (actorIds: string[]) => void;
    close: () => void;
}

const useSaveToCollectionModal = create<SaveToCollectionModalStore>((set) => ({
    isOpen: false,
    actorIds: [],
    open: (actorIds: string[]) => set({ isOpen: true, actorIds }),
    close: () => set({ isOpen: false, actorIds: [] }),
}));

export default useSaveToCollectionModal;
