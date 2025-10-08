import React from "react";

const Sidebar = ({menuItems, activeItem, onMenuItemClick}) => {
    const handleItemClick = (itemKey) => {
        onMenuItemClick(itemKey);
    };

    return (
        <div className="bg-white rounded-[15px] sm:rounded-[20px] shadow-lg p-4 sm:p-[32px] w-full sm:w-[393px]">
            <ul className="space-y-2 sm:space-y-[10px]">
                {menuItems.map((item) => (
                    <li
                        key={item.key}
                        className={`flex items-center p-2 sm:p-[10px] rounded-[6px] sm:rounded-[8px] cursor-pointer transition-colors duration-200 ${
                            activeItem === item.key ? 'bg-[#D2F0FF]' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleItemClick(item.key)}
                    >
                        {typeof item.icon === 'function' ? item.icon(activeItem === item.key) : item.icon}
                        <span className={`px-3 text-sm sm:text-base ${activeItem === item.key ? 'text-blue-800' : 'text-gray-700'}`}>
                            {item.label}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;