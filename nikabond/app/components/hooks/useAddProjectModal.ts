import { create } from "zustand";

interface AddProjectModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddProjectModal = create<AddProjectModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export default useAddProjectModal;