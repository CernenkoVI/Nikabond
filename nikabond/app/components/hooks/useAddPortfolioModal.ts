import { create } from "zustand";

interface AddPortfolioModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddPortfolioModal = create<AddPortfolioModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export default useAddPortfolioModal;