const Spinner = () => (
    <svg className="h-5 w-5 animate-spin items-center" viewBox="0 0 24 24">
        <circle
            fill="none"
            strokeWidth="3"
            className="stroke-current opacity-40"
            cx="12"
            cy="12"
            r="10"
        />
        <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="50.265"
            strokeDashoffset="36"      /* длина видимой дуги */
            className="opacity-95"
            fill="none"
        />
    </svg>
)

const Button = ({children, onClick, className, ...props}) => {
    return (
        <button
            onClick={onClick}
            className={`px-5 py-4 rounded-lg flex items-center gap-2.5 
                       font-semibold
                      ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export const GrayButton = ({onClick, children}) => {
    return (
        <button
            onClick={onClick}
            className='border border-white text-center rounded-xl cursor-pointer px-4 py-4 w-full transition duration-200 hover:bg-white hover:text-black hover:border-black'
        >
            {children}
        </button>
    )
}

export const BlackButton = ({onClick, children, ...props}) => {
    return (
        <button
            onClick={onClick}
            className='flex w-full bg-black items-center justify-center text-white px-4 py-4 md:px-[20px] md:py-[16px] cursor-pointer rounded-[12px] mt-4 hover:scale-102 transition-transform duration-150 active:translate-y-0.5'
            {...props}
        >
            {children}
        </button>
    )
}

export const BlueButton = ({onClick, children, className, ...props}) => {
    return (
        <button
            onClick={onClick}
            className={`w-full h-[51px] bg-[#437DE9] flex items-center justify-center gap-2 cursor-pointer text-white text-sm md:text-base font-semibold rounded-[12px] hover:scale-102 transition-transform duration-150 active:translate-y-0.5 ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export const ToggleButton = ({onClick, children, className, ...props}) => {
    return (
        <button
            onClick={onClick}
            className={`cursor-pointer px-3 py-2 text-sm md:text-base flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] transition-colors duration-200 ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;