const variantClasses = {
    primary: "bg-yellow-400 hover:bg-yellow-500 text-black font-semibold",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    success: "bg-green-500 hover:bg-green-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    outline:
        "border-2 border-gray-300 hover:border-gray-400 text-gray-700 bg-transparent",
};

const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

export default function Button({
    children,
    onClick,
    variant = "primary",
    size = "md",
    disabled = false,
    className = "",
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant] || variantClasses.primary
                } ${sizeClasses[size] || sizeClasses.md} ${className}`}
        >
            {children}
        </button>
    );
}
