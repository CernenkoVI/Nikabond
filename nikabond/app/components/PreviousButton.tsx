interface PreviousButtonProps {
    label: string;
    className?: string;
    onClick: () => void;
}

const PreviousButton: React.FC<PreviousButtonProps> = ({
    label,
    className,
    onClick
}) => {
    return (
        <div 
            onClick={onClick}
            className={`py-4 bg-black hover:bg-gray-700 rounded-xl text-center text-white transition cursor-pointer ${className}`}
        >
            {label}
        </div>
    )
}

export default PreviousButton;