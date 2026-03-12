'use client';

import useActorSelection from "../hooks/useActorSelection";
import useSaveToCollectionModal from "../hooks/useSaveToCollectionModal";

const FloatingSelectionBar = () => {
    const { isSelectionMode, selectedActorIds, exitSelectionMode } = useActorSelection();
    const saveModal = useSaveToCollectionModal();

    if (!isSelectionMode || selectedActorIds.length === 0) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white shadow-2xl rounded-xl px-6 py-3 flex items-center gap-4 border border-gray-200">
            <span className="text-sm font-medium text-gray-700">
                <strong>{selectedActorIds.length}</strong> actor{selectedActorIds.length !== 1 ? 's' : ''} selected
            </span>

            <button
                onClick={() => saveModal.open(selectedActorIds)}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-lime-500/75 hover:bg-lime-500 text-black transition-colors"
            >
                Save to Collection
            </button>

            <button
                onClick={exitSelectionMode}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors"
            >
                Cancel
            </button>
        </div>
    );
};

export default FloatingSelectionBar;
