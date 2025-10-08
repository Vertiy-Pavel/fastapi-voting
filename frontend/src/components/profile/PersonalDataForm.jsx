import { useState, useEffect } from "react";
import { getProfileData, updateProfileData } from '/src/services/api.js'
import { TbCloudDownload } from "react-icons/tb";


const PersonalData = ({formData, setFormData}) => {

    const [isSaving, setIsSaving] = useState(false);



    // Обработчик изменений в полях формы
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // PUT-запрос
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const updatableData = {
                last_name: formData.last_name,
                first_name: formData.first_name,
                surname: formData.surname,
                email: formData.email
            };

            await updateProfileData(updatableData);
            console.log('Данные успешно сохранены!');
            
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error.message);
            
        } finally {
            setIsSaving(false);
        }
    };


    return (
        <form 
            className="shadow-lg bg-white rounded-[15px] md:rounded-[20px] xl:w-[473px]"
            onSubmit={handleSubmit}
        >
            <div className="p-4 md:p-[32px] space-y-4 md:space-y-[20px]">
                <h1 className="text-neutral-800 text-xl md:text-2xl font-semibold">Персональные данные</h1>
                
                {/* Фамилия */}
                <div className="flex flex-col gap-2 md:gap-[10px]">
                    <label
                        htmlFor="last_name"
                        className="text-[#CCCCCC] text-sm md:text-base font-normal mb-1 flex items-center gap-1"
                    >
                        Фамилия
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-stone-300"></div>
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="border border-black rounded-lg w-full h-12 md:h-[51px] px-3 md:px-4 py-2 md:py-3 text-sm md:text-base font-normal text-neutral-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Имя */}
                <div className="flex flex-col gap-2 md:gap-[10px]">
                    <label
                        htmlFor="first_name"
                        className="text-[#CCCCCC] text-sm md:text-base font-normal mb-1 flex items-center gap-1"
                    >
                        Имя
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-stone-300"></div>
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="border border-black rounded-lg w-full h-12 md:h-[51px] px-3 md:px-4 py-2 md:py-3 text-sm md:text-base font-normal text-neutral-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Отчество */}
                <div className="flex flex-col gap-2 md:gap-[10px]">
                    <label
                        htmlFor="surname"
                        className="text-[#CCCCCC] text-sm md:text-base font-normal mb-1 flex items-center gap-1"
                    >
                        Отчество
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-stone-300"></div>
                    </label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        className="border border-black rounded-lg w-full h-12 md:h-[51px] px-3 md:px-4 py-2 md:py-3 text-sm md:text-base font-normal text-neutral-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Электронная почта */}
                <div className="flex flex-col mb-4 md:mb-6 gap-2 md:gap-[10px]">
                    <label
                        htmlFor="email"
                        className="text-[#CCCCCC] text-sm md:text-base font-normal mb-1 flex items-center gap-1"
                    >
                        Электронная почта
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-stone-300"></div>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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
                            <TbCloudDownload size={24}/>
                            Сохранить изменения
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default PersonalData;