import React, {useState, useRef} from "react"
import {useNavigate} from "react-router-dom"

const HeaderDropdown = ({
                            options = [],
                            title,
                            links = []
                        }) => {
    const [isOpen, setIsOpen] = useState(false)
    const timeoutRef = useRef(null)
    const navigate = useNavigate()

    // Open menu on hover
    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current)
        setIsOpen(true)
    }

    // Close menu with delay
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false)
        }, 100)
    }

    const handleItemClick = (index) => {
        setIsOpen(false)
        if (links[index]) {
            navigate(links[index])
        }
    }

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`${
                isOpen ? 'bg-[#505050]' : ''
            } grid-cols-5 grid overflow-hidden rounded-2xl select-none`}
        >
            <div className='col-span-4'>
                <p className='p-3 cursor-pointer'>{title}</p>
                <div className={!isOpen ? 'hidden' : ''}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleItemClick(index)}
                            className='p-3 w-36 cursor-pointer text-base font-normal select-none transition-all block hover:bg-[#606060]'
                        >
                            {option.title || option}
                        </div>
                    ))}
                </div>
            </div>
            <div
                className={`col-span-1 relative w-full flex justify-center ${
                    !isOpen ? 'items-center' : 'items-start top-[7.5%]'
                }`}
            >
                <div
                    className={`bg-[#ccc] w-2 ${
                        !isOpen ? 'h-2' : 'h-[85%]'
                    } absolute transition-all rounded-full`}
                ></div>
            </div>
        </div>
    )
}

export default HeaderDropdown;