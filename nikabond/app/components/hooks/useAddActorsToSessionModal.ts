import { create } from "zustand";

type RoleType = {
    id: string;
    name: string;
    image_url: string;
    project_id: string;
}

interface AddActorsToSessionModalStore {
    isOpen: boolean;
    sessionId: string | null;
    role: RoleType | null;
    onAdded: (() => void) | null;
    open: (sessionId: string, role: RoleType, onAdded?: () => void) => void;
    close: () => void;
}

const useAddActorsToSessionModal = create<AddActorsToSessionModalStore>((set) => ({
    isOpen: false,
    sessionId: null,
    role: null,
    onAdded: null,
    open: (sessionId: string, role: RoleType, onAdded?: () => void) =>
        set({ isOpen: true, sessionId, role, onAdded: onAdded || null }),
    close: () => set({ isOpen: false, sessionId: null, role: null, onAdded: null }),
}));

export default useAddActorsToSessionModal;
