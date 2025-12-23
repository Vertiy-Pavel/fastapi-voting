import React, { useState, useRef, useEffect, useMemo } from "react";

export const DepartmentSelect = ({
                              departments, // массив
                              selectedIds,
                              onToggleId,
                              searchTerm,
                              onSearchChange,
                              isLoading,
                              label = "Группа пользователей",
                              placeholder = "Выберите группы...",
                          }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Функция для превращения дерева в плоский массив
    const flattenDepartments = (items) => {
        let flat = [];
        items.forEach(item => {
            flat.push({id: item.id, name: item.name}); // Сохраняем только нужные данные
            if (item.children && item.children.length > 0) {
                flat = [...flat, ...flattenDepartments(item.children)];
            }
        });
        return flat;
    };

    // Оптимизируем: выпрямляем список только когда меняются входные данные
    const flatList = useMemo(() => flattenDepartments(departments), [departments]);

    // Закрытие при клике вне области
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full mb-4" ref={containerRef}>
            <label className="">
                {label}
            </label>

            <div className="relative">
                {/* Поле выбора */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={`min-h-[51px] rounded-xl border border-[#212121] p-[12px] transition-all flex justify-between items-center cursor-pointer bg-white ${
                        isOpen ? "shadow-sm" : ""
                    }`}
                >
                    <span
                        className={`text-sm ${selectedIds.length > 0 ? "text-black font-medium" : "text-[#ccc] text-base"}`}>
                        {selectedIds.length > 0
                            ? `Выбрано элементов: ${selectedIds.length}`
                            : placeholder}
                    </span>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </div>

                {/* Выпадающий список */}
                {isOpen && (
                    <div
                        className="absolute z-[100] mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                        {/* Поиск */}
                        <div className="p-3 bg-gray-50 border-b">
                            <input
                                type="text"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Поиск по списку..."
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>

                        {/* Плоский список элементов */}
                        <div className="max-h-60 overflow-y-auto py-1">
                            {isLoading ? (
                                <div className="p-4 text-center text-gray-400 text-sm">Загрузка...</div>
                            ) : flatList.length > 0 ? (
                                flatList.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center px-4 py-2.5 hover:bg-blue-50 cursor-pointer transition-colors"
                                        onClick={() => onToggleId(item.id)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(item.id)}
                                            onChange={() => {
                                            }} // Управляется кликом по строке
                                            className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">{item.name}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-400 text-sm">Список пуст</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export const DepartmentSelectConstructor = ({
    departments,
    selectedIds,
    onToggleId,
    searchTerm,
    onSearchChange,
    isLoading,
    label = "Группа пользователей",
    placeholder = "Выберите группы...",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Закрытие при клике вне области
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Рекурсивный рендер департаментов (как в вашем примере CreateVoting)
    const renderDepartments = (depts, level = 0) => {
        return depts.map((dept) => (
            <div key={dept.id}>
                <div
                    className="p-3 hover:bg-gray-100 flex items-center cursor-pointer transition-colors"
                    style={{ paddingLeft: `${level * 16 + 12}px` }} // Базовый отступ + уровень вложенности
                    onClick={() => onToggleId(dept.id)}
                >
                    <input
                        type="checkbox"
                        id={`dept-${dept.id}`}
                        checked={selectedIds.includes(dept.id)}
                        onChange={() => {}} // Управляется через onClick родительского div
                        className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                        htmlFor={`dept-${dept.id}`}
                        className="cursor-pointer flex-1 text-gray-700 select-none"
                    >
                        {dept.name}
                    </label>
                </div>

                {/* Рекурсивный вызов для поддепартаментов */}
                {dept.children && dept.children.length > 0 && (
                    <div>{renderDepartments(dept.children, level + 1)}</div>
                )}
            </div>
        ));
    };

    return (
        <div className="w-full relative mt-4" ref={containerRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>

            {/* Поле выбора (Trigger) */}
            <div
                className="mt-1 mb-1 p-4 border border-gray-300 rounded-xl text-gray-500 w-full bg-white focus:outline-none focus:ring-2 focus:ring-grey-500 cursor-pointer flex justify-between items-center hover:border-gray-700 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="truncate">
                    {selectedIds.length > 0
                        ? `${selectedIds.length} выбрано`
                        : placeholder}
                </span>
                <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </div>

            {/* Выпадающий список */}
            {isOpen && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden flex flex-col">
                    {/* Поле поиска */}
                    <div className="p-2 sticky top-0 bg-white border-b z-20">
                        <input
                            type="text"
                            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Поиск департамента..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    {/* Список */}
                    <div className="overflow-y-auto flex-1">
                        {departments.length > 0 ? (
                            renderDepartments(departments)
                        ) : (
                            <div className="p-3 text-gray-500 text-center">
                                {isLoading ? "Загрузка..." : "Ничего не найдено"}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};