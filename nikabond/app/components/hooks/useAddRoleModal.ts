import { create } from "zustand";

interface AddRoleModalStore {
    isOpen: boolean;
    projectId: string | null;
    open: (projectId?: string) => void;
    close: () => void;
}

const useAddRoleModal = create<AddRoleModalStore>((set) => ({
    isOpen: false,
    projectId: null,
    open: (projectId?: string) =>
        set({ isOpen: true, projectId: projectId || null }),
    close: () => set({ isOpen: false, projectId: null }),
}));

export default useAddRoleModal;