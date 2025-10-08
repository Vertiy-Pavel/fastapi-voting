import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const DropdownMenu = ({ label, items, links, triggerClassName, menuClassName, itemClassName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // Открываем меню при наведении
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  // Закрываем меню с задержкой 0.5 секунды
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handleItemClick = (index) => {
    if (links && links[index]) {
      navigate(links[index]);
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Триггер выпадающего меню с кастомными стилями */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex items-center gap-2.5 cursor-pointer bg-[#505050] ${triggerClassName || ''}`}
      >
        <div className="text-white text-base font-semibold">{label}</div>
        <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
      </div>

      {/* Выпадающее меню с кастомными стилями */}
      {isOpen && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`absolute right-0 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y ${menuClassName || 'bg-[#505050] divide-neutral-700'}`}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <a
                key={index}
                onClick={() => handleItemClick(index)}
                className={`block px-4 py-2 text-sm hover:bg-neutral-400 rounded-md ${itemClassName || 'text-white'}`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;