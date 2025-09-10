import { create } from "zustand";

interface AddRoleModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddRoleModal = create<AddRoleModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export default useAddRoleModal;