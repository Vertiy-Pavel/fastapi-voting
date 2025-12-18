import { useState, useEffect, useMemo } from "react";
import { getAllDepartments } from "../services/api/department.js";

const mockDepartments = [
  {
    id: 1,
    name: "Головной офис",
    description: "Центральное управление",
    location: "Москва",
    parent_id: null,
    children: [
      {
        id: 2,
        name: "Департамент IT",
        description: "Разработка и поддержка",
        location: "Корпус А",
        parent_id: 1,
        children: [
          {
            id: 10,
            name: "Отдел Frontend",
            description: "React разработка",
            location: "Кабинет 301",
            parent_id: 2,
            children: [],
          },
          {
            id: 11,
            name: "Отдел Backend",
            description: "Python/Go разработка",
            location: "Кабинет 302",
            parent_id: 2,
            children: [],
          },
        ],
      },
      {
        id: 3,
        name: "HR Департамент",
        description: "Подбор персонала",
        location: "Корпус Б",
        parent_id: 1,
        children: [],
      },
    ],
  },
  {
    id: 4,
    name: "Филиал Санкт-Петербург",
    description: "Региональное представительство",
    location: "СПб",
    parent_id: null,
    children: [
      {
        id: 5,
        name: "Отдел продаж",
        description: "Работа с клиентами",
        location: "Офис 12",
        parent_id: 4,
        children: [],
      },
    ],
  },
];

export const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDepartmentChange = (id) => {
    setSelectedDepartmentIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const fetchDepartments = async () => {
    setIsLoadingDepartments(true);
    try {
      const data = await getAllDepartments();
      // Если бэкенд отдает массив напрямую: setDepartments(data);
      // Если в объекте (например data.items): setDepartments(data.items || data);
      setDepartments(Array.isArray(data.data) ? data.data : data.items || []);
    } catch (error) {
      console.error("Ошибка при получении всех департаментов:", error);
    } finally {
      setIsLoadingDepartments(false);
    }
  };

  // const fetchDepartments = async () => {
  //     setIsLoadingDepartments(true);
  //     try {
  //         await new Promise(resolve => setTimeout(resolve, 500));

  //         const data = mockDepartments;
  //         setDepartments(data);

  //     } catch (error) {
  //         console.error("Ошибка:", error);
  //     } finally {
  //         setIsLoadingDepartments(false);
  //     }
  // };

  const filteredDepartments = useMemo(() => {
    // Если строка поиска пустая — возвращаем всё как есть
    if (!searchTerm.trim()) return departments;

    const searchLower = searchTerm.toLowerCase();

    // Рекурсивная функция фильтрации
    const filterTree = (list) => {
      return list
        .map((dept) => {
          // 1. Проверяем, подходит ли сам департамент (имя, описание или локация)
          const isMatch =
            dept.name?.toLowerCase().includes(searchLower) ||
            dept.description?.toLowerCase().includes(searchLower) ||
            dept.location?.toLowerCase().includes(searchLower);

          // 2. Рекурсивно фильтруем детей
          const filteredChildren =
            dept.children && Array.isArray(dept.children)
              ? filterTree(dept.children)
              : [];

          // 3. Условие включения в результат:
          // Либо сам департамент подошел под поиск,
          // либо у него есть дети, которые подошли.
          if (isMatch || filteredChildren.length > 0) {
            return {
              ...dept,
              // Важно: заменяем детей на отфильтрованный список
              children: filteredChildren,
            };
          }

          return null;
        })
        .filter(Boolean);
    };

    return filterTree(departments);
  }, [departments, searchTerm]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    departments: filteredDepartments, // Возвращаем отфильтрованные данные
    selectedDepartmentIds,
    handleDepartmentChange,
    isLoadingDepartments,
    searchTerm, // Новое: отдаем стейт поиска
    setSearchTerm, // Новое: отдаем функцию изменения поиска
    hasMoreDepartments: false, // Теперь всегда false, так как данных больше нет
    handleLoadMore: () => {},
  };
};
