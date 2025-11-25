import React, {useState} from 'react';
import {changePassword} from "../../services/api/user";
import {TbCloudDownload} from "react-icons/tb";
import {InputPassword} from "../Inputs.jsx";
import {BlueButton} from "../Button.jsx";
import toast from "react-hot-toast";
import Modal from "../Modal.jsx";


const PasswordChangeForm = () => {
    const [password, setPassword] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPassword(prevPasswords => ({
            ...prevPasswords,
            [name]: value,
        }));
    };

    const email = localStorage.getItem("email");

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            await changePassword(dataToSend);

            console.log("Пароль успешно изменен!");
            setPassword({
                old_password: '',
                new_password: '',
                confirm_new_password: '',
            });
            toast.success('Подтвердите смену пароля на почте.')
            setIsSaving(true);
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error.message);
            toast.error('Ошибка');
        } finally {
            setIsSaving(false);
        }
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

                    <BlueButton onClick={handleSubmit} disabled={isSaving}>
                        {isSaving ? (
                            <>
                                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                                    <circle
                                        fill="none"
                                        strokeWidth="3"
                                        className="stroke-current opacity-40"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                    />
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeDasharray="50.265"
                                        strokeDashoffset="36"      /* длина видимой дуги */
                                        className="opacity-95"
                                        fill="none"
                                    />
                                </svg>
                                Сохранение...
                            </>
                        ) : (
                            <>
                                <TbCloudDownload size={24}/>
                                Сохранить изменения
                            </>
                        )}
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