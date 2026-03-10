import { create } from "zustand";

interface AddSessionModalStore {
    isOpen: boolean;
    projectId: string | null;
    onCreated: (() => void) | null;
    open: (projectId?: string, onCreated?: () => void) => void;
    close: () => void;
}

const useAddSessionModal = create<AddSessionModalStore>((set) => ({
    isOpen: false,
    projectId: null,
    onCreated: null,
    open: (projectId?: string, onCreated?: () => void) =>
        set({ isOpen: true, projectId: projectId || null, onCreated: onCreated || null }),
    close: () => set({ isOpen: false, projectId: null, onCreated: null }),
}));

export default useAddSessionModal;
