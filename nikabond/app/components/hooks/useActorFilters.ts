import { create } from "zustand";

export interface ActorFilters {
    ethnicity: string[];
    gender: string[];
    age: number | null;
    ageRange: number | null;
    language: string;
    height: number | null;
    heightRange: number | null;
    haircolor: string;
    hairstyle: string;
    eyecolor: string;
    skills: string;
}

const emptyFilters: ActorFilters = {
    ethnicity: [],
    gender: [],
    age: null,
    ageRange: null,
    language: '',
    height: null,
    heightRange: null,
    haircolor: '',
    hairstyle: '',
    eyecolor: '',
    skills: '',
};

interface ActorFiltersStore {
    filters: ActorFilters;
    appliedFilters: ActorFilters;
    applyVersion: number;
    setFilter: <K extends keyof ActorFilters>(key: K, value: ActorFilters[K]) => void;
    applyFilters: () => void;
    clearAll: () => void;
}

const useActorFilters = create<ActorFiltersStore>((set) => ({
    filters: { ...emptyFilters },
    appliedFilters: { ...emptyFilters },
    applyVersion: 0,
    setFilter: (key, value) =>
        set((state) => ({
            filters: { ...state.filters, [key]: value },
        })),
    applyFilters: () =>
        set((state) => ({
            appliedFilters: { ...state.filters },
            applyVersion: state.applyVersion + 1,
        })),
    clearAll: () =>
        set((state) => ({
            filters: { ...emptyFilters },
            appliedFilters: { ...emptyFilters },
            applyVersion: state.applyVersion + 1,
        })),
}));

export default useActorFilters;
