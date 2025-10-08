import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import {loginUser} from '../services/api'

const LoginPage = () => {



    const [formData, setFormData] = useState({
        email: '',
        password: '',
        // role_id: 1,
        remember_flag: false,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let parsedValue;

        if (type === 'checkbox') {
            parsedValue = checked;
        }
        else if (name === 'role_id') {
            parsedValue = parseInt(value, 10);
        }
        else {
            parsedValue = value;
        }

        setFormData(prevState => {
            // -------------------------------------------------------------------------
            // const logMessage = `Обновлены данные формы: ${JSON.stringify(updatedData)}`;
            //console.log(logMessage);
            //setMessage(logMessage); 
            return {
                ...prevState,
                [name]: parsedValue,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(formData.email, formData.password, formData.role_id, formData.remember_flag);
            // console.log("Ответ API для входа в систему:", response);
            console.log(response.headers);
            //setMessage(`Ответ API для входа в систему: ${JSON.stringify(response)}`);
            const csrfRefreshToken = response.headers['x-csrf-refresh-token'];
            const csrfAccessToken = response.headers['x-csrf-access-token'];
            console.log(csrfRefreshToken);
            localStorage.setItem('x-csrf-refresh-token', csrfRefreshToken);
            localStorage.setItem('x-csrf-access-token', csrfAccessToken);
            toast.success('Авторизация прошла успешно')


                setTimeout(() => {
                    navigate('/');
                }, 1000);


        } catch (error) {
            console.log('Полный error:', error);
            console.log('error.response:', error.response);
            console.log('error.response.data:', error.response?.data);

        }
    };


    return (
        <>
            <ToastContainer />
            <div className=" ">
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-100">

                    <h1 className="text-[40px] mb-6 w-[264px] h-[48px] font-mak">Авторизация</h1>

                    {/* Мобильная версия - вертикальный макет */}
                    <div className="flex flex-col md:hidden w-full max-w-md bg-white shadow-lg rounded-[20px] overflow-hidden">
                        <div className="px-6 py-6">
                            <form onSubmit={handleSubmit}>
                                <label className="block mb-2 text-base">Войти как</label>
                                <select
                                    className="w-full border rounded-[8px] px-3 py-2 mb-4"
                                    name="role_id"
                                    value={formData.role_id}
                                    onChange={handleChange}
                                >
                                    <option value={1}>Сотрудник</option>
                                    <option value={2}>Начальник</option>
                                    <option value={3}>Администратор</option>
                                </select>

                                <label className="block mb-2 text-base">Электронная почта</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="ivanovivan@mail.ru"
                                    className="w-full border rounded-[8px] px-3 py-2 mb-4"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                                <label className="block mb-2 text-base">Пароль</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="******"
                                    className="w-full border rounded-[8px] px-3 py-2 mb-2"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="flex flex-col justify-between text-sm mb-4">
                                    <a href="#" className="text-gray-500 text-right">
                                        Забыли пароль?
                                    </a>
                                    <label className="flex items-center text-base mt-[24px]">
                                        <input
                                            type="checkbox"
                                            name="remember_flag"
                                            checked={formData.remember_flag}
                                            onChange={handleChange}
                                            className="mr-2 w-4 h-4"
                                        />
                                        Запомнить меня
                                    </label>
                                </div>

                                {/* {message && (
                                <p className={`text-sm mb-2 text-center ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
                                    {message}
                                </p>
                            )} */}

                                <button type="submit" className="w-full bg-black text-white px-4 py-4 rounded-[12px] my-6 text-lg">
                                    Войти
                                </button>
                            </form>
                        </div>
                        <div className="bg-[#212121] text-white p-6">
                            <div className="flex justify-center space-x-4 mb-6">
                                <button className="bg-[#303030] px-4 py-2 rounded-lg">RU</button>
                                <button className="px-4 py-2">ENG</button>
                            </div>

                            <div className="text-center">
                                <p className="text-sm mb-6">
                                    Панель управления системой электронных голосований
                                </p>
                                <Link to="/register" className="block border border-white text-center rounded-xl px-4 py-4 w-full">
                                    Регистрация
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Декстоп версия */}
                    <div className="hidden md:flex bg-white w-full max-w-4xl h-auto md:h-[500px] shadow-lg rounded-[20px] overflow-hidden">                    <div className="px-[32px] py-6 w-[467px] grow">
                        <form onSubmit={handleSubmit}> {/* Добавляем обработчик на форму */}

                            <label className="block mb-2 text-base">Войти как</label>
                            <select
                                className="w-full border rounded-[8px] px-3 py-2 mb-4"
                                name="role_id"
                                value={formData.role_id}
                                onChange={handleChange}
                            >
                                <option value={1}>Сотрудник</option>
                                <option value={2}>Начальник</option>
                                <option value={3}>Администратор</option>
                            </select>

                            <label className="block mb-2 text-base">Электронная почта</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="ivanovivan@mail.ru"
                                className="w-full border rounded-[8px] px-3 py-2 mb-4"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <label className="block mb-2 text-base">Пароль</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="******"
                                className="w-full border rounded-[8px] px-3 py-2 mb-2"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <div className="flex flex-col justify-between text-sm mb-4">
                                <a href="#" className="text-gray-500">
                                    Забыли пароль?
                                </a>
                                <label className="flex text-base mt-[24px]">
                                    <input type="checkbox" name='remember_flag' value={formData.remember_flag} onChange={handleChange} className="mr-2" /> Запомнить меня
                                </label>

                            </div>

                            {/* {message && (
                                <p className={`text-sm mb-2 ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
                                    {message}
                                </p>
                            )} */}

                            <button type="submit" className="w-full bg-black  text-white px-[20px] py-[16px] rounded-[12px] mt-13">
                                Войти
                            </button>
                        </form>
                    </div>

                        <div className="bg-[#212121] rounded-[20px] text-white p-6 w-[285px] h-[500px] flex flex-col justify-between">
                            <div className="flex justify-end mb-4">
                                <button className="bg-[#303030] mr-[10px] p-[10px] rounded-lg">RU</button>
                                <button>ENG</button>
                            </div>

                            <div className="justify-between">
                                <span className="text-sm w-[245px] h-[57px]">
                                    Панель управления системой электронных голосований
                                </span>
                                <div className="w-full h-[20px]"></div>
                                <Link to="/register" className="block border border-white text-center rounded-xl px-[20px] py-[16px] w-full">
                                    Регистрация
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;