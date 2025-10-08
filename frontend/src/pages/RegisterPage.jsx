import React, { useState } from 'react';
import HeaderLogin from "/src/components/HeaderLogin";
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api'
import {toast, ToastContainer} from "react-toastify";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        surname: '',
        email: '',
        phone: '',
        role_id: 1,
        password: '',
        confirm_password: '',
    });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate(); // Инициализируем хук для навигации

    // Универсальный обработчик изменений в полях ввода
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Обрабатываем role_id отдельно, чтобы убедиться, что это число
        let parsedValue = value;
        if (name === 'role_id') {
            parsedValue = parseInt(value, 10);
        }
        
        setFormData(prevState => {
            const updatedData = {
            ...prevState,
            [name]: parsedValue,
        };

        //---------------------------------------------------------------------
        const logMessage = `Обновлены данные формы: ${JSON.stringify(updatedData)}`;
        //console.log(logMessage);
        // setMessage(logMessage); // Раскомментируйте, если хотите видеть это сообщение
        return updatedData; 
    });
    };

    // Обработчик отправки формы на бэкенд
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsSuccess(false);

        const logMessage = `Попытка регистрации с использованием данных: ${JSON.stringify(formData)}`;
        console.log(logMessage);
        //setMessage(logMessage);

        // Клиентская валидация паролей
        if (formData.password !== formData.confirm_password) {
            const errorMsg = 'Пароли не совпадают!';
            console.warn('Не удалось подтвердить пароль',errorMsg);
            //setMessage(errorMsg);
            return;
        }

        // Подготовка данных для отправки
        try {
            const response = await register(formData);
            console.log('Ответ API регистрации:', response);

            toast.success('Регистрация прошла успешно!')

            console.log('Регистрация прошла успешно, переходим к входу в систему');

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            // const errorMsg = error.response?.data?.message || error.message || 'Не удалось подключиться к серверу.';
            //setMessage(`Ошибка: ${errorMsg}`);
            // console.error('Ошибка регистрации с сообщением:', errorMsg);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col items-center  justify-center min-h-[calc(100vh-100px)] bg-gray-100">
                <h1 className="text-[40px] mb-6 w-[264px] h-[48px] font-mak">Регистрация</h1>

                {/* Мобильная версия - вертикальный макет */}
                <div className="flex flex-col md:hidden w-full max-w-md bg-white shadow-lg rounded-[20px] overflow-hidden">

                    {/* Форма */}
                    <div className="px-6 py-6">
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-2 text-base">Зарегистрироваться как</label>
                            <select 
                                className="w-full border rounded-[8px] px-3 py-3 mb-4"
                                name="role_id"
                                value={formData.role_id}
                                onChange={handleChange}>
                                <option value={1}>Сотрудник</option>
                                <option value={2}>Начальник</option>
                                <option value={3}>Администратор</option>
                            </select>

                            <div className="flex flex-col sm:flex-row mb-4 gap-3">
                                <div className="flex flex-col flex-1">
                                    <label htmlFor="last_name" className="mb-1">Фамилия</label>
                                    <input 
                                        type="text" 
                                        id="last_name" 
                                        name="last_name"
                                        placeholder="Иванов" 
                                        className="border rounded-[8px] w-full px-3 py-3" 
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label htmlFor="first_name" className="mb-1">Имя</label>
                                    <input  
                                        type="text" 
                                        id="first_name" 
                                        name="first_name"
                                        placeholder="Иван" 
                                        className="border rounded-[8px] w-full px-3 py-3" 
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="flex flex-col mb-4">
                                <label htmlFor="surname" className="mb-1">Отчество</label>
                                <input 
                                    type="text" 
                                    id="surname" 
                                    name="surname"
                                    placeholder="Иванович" 
                                    className="border rounded-[8px] w-full px-3 py-3" 
                                    value={formData.surname}
                                    onChange={handleChange}
                                />
                            </div>

                            <label className="block mb-2 text-base">Электронная почта</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="ivanovivan@mail.ru"
                                className="w-full border rounded-[8px] px-3 py-3 mb-4"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <label className="block mb-2 text-base">Телефон</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="+7XXXXXXXXXX"
                                maxLength={12}
                                className="w-full border rounded-[8px] px-3 py-3 mb-4"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                            <label className="block mb-2 text-base">Пароль</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="******"
                                className="w-full border rounded-[8px] px-3 py-3 mb-4"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <label className="block mb-2 text-base">Повторите пароль</label>
                            <input
                                type="password"
                                name="confirm_password"
                                placeholder="******"
                                className="w-full border rounded-[8px] px-3 py-3 mb-4"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                required
                            />

                            {message && (
                                <p className={`text-sm mb-4 text-center ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
                                    {message}
                                </p>
                            )}

                            <button type="submit" className="w-full bg-black text-white px-4 py-4 rounded-[12px] my-4 text-lg">
                                Зарегистрироваться
                            </button>
                        </form>
                    </div>
                    <div className="bg-[#212121] text-white p-6">
                        <div className="flex justify-center space-x-4 mb-6">
                            <button className="bg-[#303030] px-4 py-2 rounded-lg text-sm">RU</button>
                            <button className="px-4 py-2 text-sm">ENG</button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm mb-6">
                                Панель управления системой электронных голосований
                            </p>
                            <Link to="/login" className="block border border-white text-center rounded-xl px-4 py-4 w-full">
                                Авторизация
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex bg-white w-[816px] h-[720px] shadow-lg rounded-[20px] overflow-hidden">
                    {/* Левая панель */}
                    <div className="bg-[#212121] rounded-[20px] text-white p-6 w-[285px] flex flex-col justify-between">
                        <div className="flex mb-4">
                            <button className="bg-[#303030] mr-[10px] p-[10px] rounded-lg">RU</button>
                            <button>ENG</button>
                        </div>
                        <div className="justify-between">
                            <span className="text-sm w-[245px] h-[57px]">
                                Панель управления системой электронных голосований
                            </span>
                            <div className="w-full h-[20px]"></div>
                            <Link to="/login" className="block border border-white text-center rounded-xl px-[20px] py-[16px] w-full">
                                Авторизация
                            </Link>
                        </div>
                    </div>

                    {/* Форма */}
                    <div className="px-[32px] py-6 w-[467px] grow"> 
                        <form onSubmit={handleSubmit}>

                            <label className="block mb-2 text-base">Зарегистрироваться как</label>
                            <select 
                                className="w-full border rounded-[8px] px-3 py-2 h-[51px] mb-4"
                                name="role_id"
                                value={formData.role_id}
                                onChange={handleChange}>
                                <option value={1}>Сотрудник</option>
                                <option value={2}>Начальник</option>
                                <option value={3}>Администратор</option>
                            </select>

                            <div className="flex mb-4 gap-[12px]">
                                <div className="flex flex-col">
                                    <label htmlFor="last_name" className="mb-1">Фамилия</label>
                                    <input 
                                        type="text" 
                                        id="last_name" 
                                        name="last_name"
                                        placeholder="Иванов" 
                                        className="border rounded-[8px] w-[150px] h-[51px] px-3 py-2" 
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="first_name" className="mb-1">Имя</label>
                                    <input  
                                        type="text" 
                                        id="first_name" 
                                        name="first_name"
                                        placeholder="Иван" 
                                        className="border rounded-[8px] w-[115px] h-[51px] px-3 py-2" 
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="surname" className="mb-1">Отчество</label>
                                    <input 
                                        type="text" 
                                        id="surname" 
                                        name="surname"
                                        placeholder="Иванович" 
                                        className="border rounded-[8px] w-[178px] h-[51px] px-3 py-2" 
                                        value={formData.surname}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            
                            <label className="block mb-2 text-base">Электронная почта</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="ivanovivan@mail.ru"
                                className="w-full border h-[51px] rounded-[8px] px-3 py-2 mb-4"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <label className="block mb-2 text-base">Телефон</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="+7XXXXXXXXXX"
                                maxLength={12}
                                className="w-full border h-[51px] rounded-[8px] px-3 py-2 mb-4"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                            <label className="block mb-2 text-base">Пароль</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="******"
                                className="w-full border h-[51px] rounded-[8px] px-3 py-2 mb-2"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <label className="block mb-2 text-base">Повторите пароль</label>
                            <input
                                type="password"
                                name="confirm_password"
                                placeholder="******"
                                className="w-full border h-[51px] rounded-[8px] px-3 py-2 mb-2"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                required
                            />

                            {message && (
                                <p className={`text-sm mb-2 ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
                                    {message}
                                </p>
                            )}

                            <button type="submit" className="w-full bg-black  text-white px-[20px] py-[16px] rounded-[12px] my-10">
                                Зарегистрироваться
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;