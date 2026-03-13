import { create } from "zustand";

interface ProfileVersionStore {
    version: number;
    bump: () => void;
}

const useProfileVersion = create<ProfileVersionStore>((set) => ({
    version: 0,
    bump: () => set((state) => ({ version: state.version + 1 })),
}));

export default useProfileVersion;
