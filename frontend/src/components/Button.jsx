const Button = ({ children, onClick, className, ...props }) => {
    return (
        <button
            onClick={onClick}
            className={`px-5 py-4 rounded-lg flex items-center gap-2.5 
                       font-semibold font-supermolotDB leading-normal
                      ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export const BlueButton = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className='w-full py-3 px-3 bg-[#437DE9] rounded-lg text-lg font-normal text-white flex gap-3 justify-center items-center hover:brightness-90 transition-all cursor-pointer active:scale-98 whitespace-nowrap md:text-lg md:py-3 md:px-3'
        >
            {children}
        </button>
    )
}

export default Button;