import { useState } from 'react';
import { changePassword } from "../../services/api";
import { TbCloudDownload } from "react-icons/tb";


const PasswordChangeForm = () => {  

    const [password, setPassword] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: '',
    });

    const [message, setMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword(prevPasswords => ({
            ...prevPasswords,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (password.new_password !== password.confirm_new_password) {
            console.log('Новый пароль и его подтверждение не совпадают.');
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
        }
        catch (error) {
            console.error('Ошибка при сохранении данных:', error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="shadow-lg bg-white rounded-[15px] md:rounded-[20px] xl:w-[473px]">
            <div className="p-4 md:p-[32px] space-y-4 md:space-y-[20px]">
                <h1 className="text-neutral-800 text-xl md:text-2xl font-semibold">Пароль</h1>

                {/* Пароль */}
                <div className="flex flex-col gap-2 md:gap-[10px]">
                    <label
                        htmlFor="old_password"
                        className="text-[#CCCCCC] text-sm md:text-base font-normal mb-1 flex items-center gap-1"
                    >
                        Пароль
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-stone-300"></div>
                    </label>
                    <input
                        type="password"
                        id="old_password"
                        name="old_password"
                        value={password.old_password}
                        onChange={handleChange}
                        placeholder="hiown9823u0n"
                        className="border border-black rounded-lg w-full h-12 md:h-[51px] px-3 md:px-4 py-2 md:py-3 text-sm md:text-base font-normal text-neutral-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Новый пароль */}
                <div className="flex flex-col gap-2 md:gap-[10px]">
                    <label
                        htmlFor="new_password"
                        className="text-[#CCCCCC] text-sm md:text-base font-normal mb-1 flex items-center gap-1"
                    >
                        Новый пароль
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-stone-300"></div>
                    </label>
                    <input
                        type="password"
                        id="new_password"
                        name="new_password"
                        value={password.new_password}
                        onChange={handleChange}
                        placeholder="******************"
                        className="border border-black rounded-lg w-full h-12 md:h-[51px] px-3 md:px-4 py-2 md:py-3 text-sm md:text-base font-normal text-neutral-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Подтвердить новый пароль */}
                <div className="flex flex-col gap-2 md:gap-[10px]">
                    <label
                        htmlFor="confirm_new_password"
                        className="text-[#CCCCCC] text-sm md:text-base font-normal mb-1 flex items-center gap-1"
                    >
                        Подтвердите новый пароль
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-stone-300"></div>
                    </label>
                    <input
                        type="password"
                        id="confirm_new_password"
                        name="confirm_new_password"
                        value={password.confirm_new_password}
                        onChange={handleChange}
                        placeholder="******************"
                        className="border border-black rounded-lg w-full h-12 md:h-[51px] px-3 md:px-4 py-2 md:py-3 text-sm md:text-base font-normal text-neutral-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full h-12 md:h-[51px] bg-[#437DE9] rounded-lg flex items-center justify-center gap-2 text-white text-sm md:text-base font-semibold disabled:opacity-50"
                >
                    {isSaving ? (
                        <span>Сохранение...</span>
                    ) : (
                        <>
                            <TbCloudDownload size={24} />
                            Сохранить изменения
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default PasswordChangeForm