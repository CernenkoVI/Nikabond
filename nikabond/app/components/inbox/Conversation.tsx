'use client';

interface ConversationProps {
    label: string;
    onClick: () => void;
    isSelected?: boolean;
}

const Conversation: React.FC<ConversationProps> = ({
    label,
    onClick,
    isSelected = false,
}) => {
    return (
        <div
            onClick={onClick}
            className={`px-6 py-4 cursor-pointer border rounded-xl bg-gray-200 hover:bg-lime-100 transition ${
                isSelected ? 'bg-lime-200 border-lime-400' : 'border-gray-300'
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onClick();
            }}
        >
            {label}
        </div>
    );
};

export default Conversation;
