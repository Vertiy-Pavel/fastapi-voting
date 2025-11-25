import React, {useState} from "react";
import {InputDefault, InputPassword} from "../Inputs.jsx";
import {BlueButton} from "../Button.jsx";
import {TbCloudDownload} from "react-icons/tb";
import {changeEmail} from "../../services/api/user.js";
import Modal from "../Modal.jsx";

const EmailChangeForm = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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
            setIsConfirmModalOpen(true)
        } catch (error) {
            console.log(error);
        } finally {
            setIsSaving(false);
        }
    }

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
                        title="Электронная почта"
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