interface SubmitButtonProps {
    label: string;
    className?: string;
    onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    label,
    className,
    onClick
}) => {
    return (
        <div 
            onClick={onClick}
            className={`py-4 bg-lime-300 hover:bg-lime-400 rounded-xl text-center transition cursor-pointer ${className}`}
        >
            {label}
        </div>
    )
}

export default SubmitButton;