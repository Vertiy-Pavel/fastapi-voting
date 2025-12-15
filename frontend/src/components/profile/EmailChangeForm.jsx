import React, {useEffect, useState} from "react";
import {InputDefault, InputPassword} from "../Inputs.jsx";
import {BlueButton} from "../Button.jsx";
import {TbCloudDownload} from "react-icons/tb";
import {changeEmail} from "../../services/api/profile.js";
import Modal from "../Modal.jsx";
import {Spinner} from "../Button.jsx";

const EmailChangeForm = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [secondsLeft, setSecondsLeft] = useState(0);

    // Восстанавливает оставшееся время блокировки из localStorage при монтировании
    useEffect(() => {
        const stored = localStorage.getItem('retry_email');
        if (stored) {
            const until = Number(stored);
            const seconds = Math.max(0, Math.ceil((until - Date.now()) / 1000));
            setSecondsLeft(seconds);
            if (seconds <= 0) localStorage.removeItem('retry_email');
        }
    }, []);

    // интервал обратного отсчёта
    useEffect(() => {
        if (secondsLeft <= 0) return;
        const id = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(id);
                    localStorage.removeItem('retry_email');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [secondsLeft]);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        try {
            const response = await changeEmail(formData);
            console.log(response);
            const retry_until = response.data?.rate_minutes || 0
            localStorage.setItem('retry_email', retry_until)

            if (retry_until > 0) {
                const until = Date.now() + retry_until * 60 * 1000; // ms
                localStorage.setItem('retry_email', String(until));
                setSecondsLeft(Math.ceil((until - Date.now()) / 1000));
            } else {
                localStorage.removeItem('retry_email');
                setSecondsLeft(0);
            }
            setIsConfirmModalOpen(true)
        } catch (error) {
            console.log(error);
        } finally {
            setIsSaving(false);
        }
    }

    const format = (s) => {
        const m = Math.floor(s / 60).toString().padStart(2,'0');
        const sec = (s % 60).toString().padStart(2,'0');
        return `${m}:${sec}`;
    };

    return (
        <>
            <div
                className="shadow-lg bg-white rounded-[15px] md:rounded-[20px]"
            >
                <div className="p-4 md:p-[32px] space-y-4 md:space-y-[20px]">
                    <h1 className="text-neutral-800 text-xl md:text-2xl font-semibold">Смена электронной почты</h1>

                    {/* Фамилия */}
                    <InputDefault
                        type="email"
                        title="Новая электронная почта"
                        value={formData.email}
                        onChange={handleChange}
                        name='email'
                    />

                    {/* Имя */}
                    <InputPassword
                        type="password"
                        title="Пароль"
                        placeholder="*******"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
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
            </div>

            <Modal
                open={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                title="Проверьте почту"
            >
                <div className="mt-2 text-sm text-black">
                    Для завершения операции перейдите по ссылке, отправленной на адрес <strong
                    className="break-words">{formData.email}</strong>.
                </div>
            </Modal>
        </>
    )
}

export default EmailChangeForm;