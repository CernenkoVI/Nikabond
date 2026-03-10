import { create } from "zustand";

interface EditAgentModalStore {
    isOpen: boolean;
    entityId: string | null;
    entityData: any | null;
    onUpdated: (() => void) | null;
    open: (entityId: string, entityData: any, onUpdated?: () => void) => void;
    close: () => void;
}

const useEditAgentModal = create<EditAgentModalStore>((set) => ({
    isOpen: false,
    entityId: null,
    entityData: null,
    onUpdated: null,
    open: (entityId: string, entityData: any, onUpdated?: () => void) =>
        set({ isOpen: true, entityId, entityData, onUpdated: onUpdated || null }),
    close: () => set({ isOpen: false, entityId: null, entityData: null, onUpdated: null }),
}));

export default useEditAgentModal;
