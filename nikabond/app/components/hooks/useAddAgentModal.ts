import { create } from "zustand";

interface AddAgentModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddAgentModal = create<AddAgentModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export default useAddAgentModal;