import { create } from "zustand";

interface AssignActorsModalStore {
    isOpen: boolean;
    roleId: string | null;
    onUpdated: (() => void) | null;
    open: (roleId: string, onUpdated?: () => void) => void;
    close: () => void;
}

const useAssignActorsModal = create<AssignActorsModalStore>((set) => ({
    isOpen: false,
    roleId: null,
    onUpdated: null,
    open: (roleId: string, onUpdated?: () => void) =>
        set({ isOpen: true, roleId, onUpdated: onUpdated || null }),
    close: () => set({ isOpen: false, roleId: null, onUpdated: null }),
}));

export default useAssignActorsModal;
