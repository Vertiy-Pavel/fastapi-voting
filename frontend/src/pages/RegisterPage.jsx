import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {register} from '../services/api/auth.js'
import {InputDefault, InputPassword, InputPhone} from "../components/Inputs.jsx";
import {BlackButton, GrayButton, Spinner} from "../components/Button.jsx";
import Modal from '../components/Modal'

const initialFormState = {
    first_name: '',
    last_name: '',
    surname: '',
    email: '',
    phone: '',
    role: 'EMPLOYEE',
    password: '',
};

const RegisterPage = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({text: '', type: ''});
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Инициализируем хук для навигации

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Универсальный обработчик изменений в полях ввода
    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Обработчик отправки формы на бэкенд
    const handleSubmit = async (e) => {
        e.preventDefault();

        const logMessage = `Попытка регистрации с использованием данных: ${JSON.stringify(formData)}`;
        console.log(logMessage);
        //setMessage(logMessage);

        // Валидация почты
        if (!EMAIL_REGEX.test(formData.email)) {
            setMessage({ text: 'Введите корректный адрес электронной почты', type: 'error' });
            return;
        }

        // Клиентская валидация паролей
        if (formData.password !== confirmPassword) {
            setMessage({text: 'Пароли не совпадают!', type: 'error'});
            return;
        }

        // Подготовка данных для отправки
        try {
            setLoading(true);
            const response = await register(formData);
            console.log('Ответ API регистрации:', response);
            setIsConfirmModalOpen(true)
            console.log('Регистрация прошла успешно, переходим к входу в систему');
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            setMessage({text: error.response.data.detail, type: 'error'});
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center px-4 justify-center min-h-[calc(100vh-100px)] bg-gray-100">
                <h1 className="text-[40px] mb-6 w-[264px] h-[48px] font-mak">Регистрация</h1>

                {/* Мобильная версия - вертикальный макет */}
                <div
                    className="flex flex-col md:hidden w-full max-w-md bg-white shadow-lg rounded-[20px] overflow-hidden">

                    {/* Форма */}
                    <div className="px-6 py-6">
                        <form>
                            <label className="block text-base">Зарегистрироваться как</label>
                            <select
                                className="w-full border rounded-xl px-3 py-3 mb-4"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}>
                                <option value={'EMPLOYEE'}>Сотрудник</option>
                                <option value={'CHIEF'}>Начальник</option>
                            </select>

                            <div className="flex flex-col md:flex-row">
                                <InputDefault
                                    type="text"
                                    title="Фамилия"
                                    placeholder="Иванов"
                                    required
                                    validate={(val) => val.trim().length > 0}
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    name='last_name'
                                    className={'w-full h-[51px]'}
                                />

                                <InputDefault
                                    type="text"
                                    title="Имя"
                                    placeholder="Иван"
                                    required
                                    validate={(val) => val.trim().length > 0}
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    name='first_name'
                                    className={'w-full h-[51px]'}
                                />

                                <InputDefault
                                    type="text"
                                    title="Отчество"
                                    placeholder="Иванович"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    name='surname'
                                    className={'w-full h-[51px]'}
                                />
                            </div>

                            <InputDefault
                                type="email"
                                title="Электронная почта"
                                placeholder="ivanovivan@mail.ru"
                                required
                                validate={(val) => EMAIL_REGEX.test(val)}
                                value={formData.email}
                                onChange={handleChange}
                                name='email'
                                className={'h-[51px]'}
                            />

                            <InputPhone
                                type="tel"
                                title="Телефон"
                                required
                                validate={(val) => /^\+?\d{11}$/.test(val)}
                                value={formData.phone}
                                onChange={handleChange}
                                name='phone'
                                className={'h-[51px]'}
                            />

                            <InputPassword
                                type="password"
                                title="Пароль"
                                placeholder="******"
                                required
                                validate={(val) => val.length >= 1}
                                value={formData.password}
                                onChange={handleChange}
                                name="password"
                            />

                            <InputPassword
                                type="password"
                                title="Подтвердите пароль"
                                placeholder="******"
                                required
                                validate={(val) => val.length >= 1 && val === formData.password}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                name="confirm_password"
                            />

                            {message.text && (
                                <p
                                    className={`text-sm font-medium mt-2 text-center ${
                                        message.type === "success" ? "text-green-600" : "text-red-600"
                                    }`}
                                >
                                    {message.text}
                                </p>
                            )}

                            <BlackButton onClick={handleSubmit} disabled={loading}>
                                {loading ?
                                    (
                                        <Spinner/>
                                    )
                                    : (
                                        <>
                                            Зарегистрироваться
                                        </>
                                    )

                                }
                            </BlackButton>
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
                            <GrayButton onClick={() => navigate('/login')}>Авторизация</GrayButton>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex bg-white w-[816px] shadow-lg rounded-[20px] overflow-hidden">
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
                            <GrayButton onClick={() => navigate('/login')}>Авторизация</GrayButton>
                        </div>
                    </div>

                    {/* Форма */}
                    <div className="px-[32px] py-6 w-[467px] grow">
                        <form>
                            <label className="block text-base">Зарегистрироваться как</label>
                            <select
                                className="w-full border rounded-xl px-3 py-2 h-[51px] mb-4"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}>
                                <option value={'EMPLOYEE'}>Сотрудник</option>
                                <option value={'CHIEF'}>Начальник</option>
                            </select>

                            <div className="flex gap-[12px]">
                                <InputDefault
                                    type="text"
                                    title="Фамилия"
                                    placeholder="Иванов"
                                    required
                                    validate={(val) => val.trim().length > 0}
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    name='last_name'
                                    className={'w-[150px] h-[51px]'}
                                />

                                <InputDefault
                                    type="text"
                                    title="Имя"
                                    placeholder="Иван"
                                    required
                                    validate={(val) => val.trim().length > 0}
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    name='first_name'
                                    className={'w-[115px] h-[51px]'}
                                />

                                <InputDefault
                                    type="text"
                                    title="Отчество"
                                    placeholder="Иванович"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    name='surname'
                                    className={'w-[178px] h-[51px]'}
                                />
                            </div>

                            <InputDefault
                                type="email"
                                title="Электронная почта"
                                placeholder="ivanovivan@mail.ru"
                                required
                                validate={(val) => EMAIL_REGEX.test(val)}
                                value={formData.email}
                                onChange={handleChange}
                                name='email'
                                className={'h-[51px]'}
                            />

                            <InputPhone
                                type="tel"
                                title="Телефон"
                                required
                                validate={(val) => /^\+?\d{11}$/.test(val)}
                                value={formData.phone}
                                onChange={handleChange}
                                name='phone'
                                className={'h-[51px]'}
                            />

                            <InputPassword
                                type="password"
                                title="Пароль"
                                placeholder="******"
                                required
                                validate={(val) => val.length >= 1}
                                value={formData.password}
                                onChange={handleChange}
                                name="password"
                            />

                            <InputPassword
                                type="password"
                                title="Подтвердите пароль"
                                placeholder="******"
                                required
                                validate={(val) => val.length >= 1 && val === formData.password}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                name="confirm_password"
                            />


                            {message.text && (
                                <p
                                    className={`text-sm font-medium mt-2 text-center ${
                                        message.type === "success" ? "text-green-600" : "text-red-600"
                                    }`}
                                >
                                    {message.text}
                                </p>
                            )}

                            <BlackButton onClick={handleSubmit} disabled={loading}>
                                {loading ?
                                    (
                                        <>
                                            <Spinner/>
                                        </>)
                                    : (
                                        <>
                                            Зарегистрироваться
                                        </>
                                    )

                                }
                            </BlackButton>

                        </form>
                    </div>
                </div>
            </div>


            <Modal
                open={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                title="Проверьте почту"
            >
                <div className="mt-2 text-sm text-black">
                    Для завершения регистрации перейдите по ссылке, отправленной на адрес <strong
                    className="break-words">{formData.email}</strong>.
                </div>
            </Modal>
        </>
    );
};

export default RegisterPage;