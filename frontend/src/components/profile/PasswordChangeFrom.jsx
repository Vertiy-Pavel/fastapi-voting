import React, {useEffect, useState} from 'react';
import {changePassword} from "../../services/api/profile";
import {TbCloudDownload} from "react-icons/tb";
import {InputPassword} from "../Inputs.jsx";
import {BlueButton, Spinner} from "../Button.jsx";
import toast from "react-hot-toast";
import Modal from "../Modal.jsx";


const PasswordChangeForm = () => {
    const [password, setPassword] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: '',
    });
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Восстанавливает оставшееся время блокировки из localStorage при монтировании
    useEffect(() => {
        const stored = localStorage.getItem('retry_password');
        if (stored) {
            const until = Number(stored);
            const seconds = Math.max(0, Math.ceil((until - Date.now()) / 1000));
            setSecondsLeft(seconds);
            if (seconds <= 0) localStorage.removeItem('retry_password');
        }
    }, []);

    // интервал обратного отсчёта
    useEffect(() => {
        if (secondsLeft <= 0) return;
        const id = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(id);
                    localStorage.removeItem('retry_password');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [secondsLeft]);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setPassword(prevPasswords => ({
            ...prevPasswords,
            [name]: value,
        }));
    };

    const email = localStorage.getItem("email");

    const handleSubmit = async () => {
        if (password.new_password !== password.confirm_new_password) {
            console.log('Новый пароль и его подтверждение не совпадают.');
            toast.error('Новый пароль и его подтверждение не совпадают.')
            return;
        }

        setIsSaving(true);
        try {
            const dataToSend = {
                old_password: password.old_password,
                new_password: password.new_password,
            };

            const response = await changePassword(dataToSend);
            console.log(response);
            const retry_until = response.data?.rate_minutes || 0
            localStorage.setItem('retry_password', retry_until)

            if (retry_until > 0) {
                const until = Date.now() + retry_until * 60 * 1000; // ms
                localStorage.setItem('retry_password', String(until));
                setSecondsLeft(Math.ceil((until - Date.now()) / 1000));
            } else {
                localStorage.removeItem('retry_password');
                setSecondsLeft(0);
            }
            console.log("Пароль успешно изменен!");
            setPassword({
                old_password: '',
                new_password: '',
                confirm_new_password: '',
            });
            toast.success('Подтвердите смену пароля на почте.')
            setIsSaving(true);
            setIsModalOpen(true)
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error.message);
            toast.error('Ошибка');
        } finally {
            setIsSaving(false);
        }
    };


    const format = (s) => {
        const m = Math.floor(s / 60).toString().padStart(2,'0');
        const sec = (s % 60).toString().padStart(2,'0');
        return `${m}:${sec}`;
    };

    return (
        <>
            <form className="shadow-lg bg-white rounded-[15px] md:rounded-[20px] xl:w-[473px]">
                <div className="p-4 md:p-[32px] space-y-4 md:space-y-[20px]">
                    <h1 className="text-neutral-800 text-xl md:text-2xl font-semibold">Пароль</h1>

                    {/* Старый пароль */}
                    <InputPassword
                        type="password"
                        title="Текущий пароль"
                        placeholder="hiown9823u0n"
                        value={password.old_password}
                        onChange={handleChange}
                        name="old_password"
                    />

                    {/* Новый пароль */}
                    <InputPassword
                        type="password"
                        title="Новый пароль"
                        placeholder="******"
                        required
                        validate={(val) => val.length >= 1}
                        value={password.new_password}
                        onChange={handleChange}
                        name="new_password"
                    />

                    {/* Подтвердить новый пароль */}
                    <InputPassword
                        type="password"
                        title="Подтвердите новый пароль"
                        placeholder="******"
                        required
                        validate={(val) => val.length >= 1 && val === password.new_password}
                        value={password.confirm_new_password}
                        onChange={handleChange}
                        name="confirm_new_password"
                    />

                    <BlueButton onClick={handleSubmit} disabled={isSaving || secondsLeft > 0} className={secondsLeft > 0 ? 'disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:hover:scale-100 disabled:transition-none disabled:translate-y-0' : ''}>
                        {secondsLeft > 0 ? `${format(secondsLeft)}` :
                            (isSaving ? (
                            <>
                                <Spinner />
                                Сохранение...
                            </>
                        ) : (
                            <>
                                <TbCloudDownload size={24}/>
                                Сохранить изменения
                            </>
                        ))}
                    </BlueButton>
                </div>
            </form>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Проверьте почту"
            >
                <div className="mt-2 text-sm text-black">
                    Для завершения операции перейдите по ссылке, отправленной на адрес <strong
                    className="break-words">{email}</strong>.
                </div>
            </Modal>
        </>
    );
};

export default PasswordChangeForm