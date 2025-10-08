const TimezoneSetting = () => {
    return (   
        <div className="shadow-lg bg-white rounded-[15px] md:rounded-[20px] w-auto">
            <div className="p-4 md:p-[32px] space-y-4 md:space-y-[20px]">
                <h1 className="text-neutral-800 text-xl md:text-2xl font-semibold">Настройка времени</h1>
                <div className="flex flex-col gap-2 md:gap-[10px]">
                    <label
                        htmlFor="timezone"
                        className="text-[#CCCCCC] text-sm md:text-base font-normal mb-1 flex items-center gap-1"
                    >
                        Часовой пояс
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-stone-300"></div>
                    </label>
                    <select
                        id="timezone"
                        className="border border-black rounded-lg w-full h-12 md:h-[51px] px-3 md:px-4 py-2 md:py-3 text-sm md:text-base font-normal text-neutral-800 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white bg-[url('/src/assets/icons/arrow-down.svg')] bg-no-repeat bg-right-4 bg-center-y bg-4"
                    >
                        <option value="UTC+3">[UTC+3] Россия - Москва - Московское время</option>
                    </select>
                </div>
                <button
                    className="w-full h-12 md:h-[51px] bg-[#437DE9] rounded-lg flex items-center justify-center gap-2 text-white text-sm md:text-base font-semibold"
                >
                    {/* <img src="/icons/cloud.svg" alt="" className="w-5 h-5 md:w-auto md:h-auto" /> */}
                    Сохранить изменения
                </button>
            </div>
        </div>
    );
};

export default TimezoneSetting;