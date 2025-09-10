import { create } from "zustand";

interface AddSessionModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddSessionModal = create<AddSessionModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export default useAddSessionModal;