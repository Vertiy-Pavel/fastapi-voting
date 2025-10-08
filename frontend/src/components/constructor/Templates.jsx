import {useEffect, useState} from "react";
import {getTemplates} from "../../services/api.js";
import {LuCalendar1, LuAlarmClock} from "react-icons/lu"

const Templates = ({setActiveContent, setSelectedTemplate}) => {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const getAllTemplates = async () => {
            const data = await getTemplates()
            console.log(data)
            const {items} = data
            const flatTemplates = Array.isArray(items) ? items.flat() : [];
            setTemplates(flatTemplates);
        }
        getAllTemplates()
    }, [])
    return (
        <div className="flex flex-col space-y-[10px] rounded-[20px] bg-white shadow-lg p-[32px] w-full">
            <h1 className="text-[20px]  pb-[10px]">Список шаблонов</h1>

            {templates.map((tpl, index) => (
                <div
                    key={index}
                    className="bg-[#CCCCCC] shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition"
                    onClick={() => {
                        setSelectedTemplate(tpl);
                        // переключаем вкладку сайдбара на "Конструктор"
                        setActiveContent("create-poll");
                    }}
                >
                    <span className="block text-lg font-bold text-blue-600 mb-3">
                        Шаблон {index + 1}
                    </span>

                    <div className="space-y-1 text-sm text-gray-700">
                        <div><strong>Название:</strong> {tpl.title}</div>
                        <div><strong>Тема:</strong> {tpl.theme}</div>
                        <div><strong>Публичный:</strong> {tpl.public ? "Да" : "Нет"}</div>
                        <div><strong>Кворум:</strong> {tpl.quorum}</div>
                        <div className='flex gap-2'>
                            <strong>Регистрация:</strong>
                            <LuCalendar1/> {new Date(tpl.registration_start).toLocaleString()} — {new Date(tpl.registration_end).toLocaleString()}
                        </div>
                        <div>
                            <strong>Голосование:</strong> {new Date(tpl.voting_start).toLocaleString()} — {new Date(tpl.voting_end).toLocaleString()}
                        </div>
                    </div>

                    <div className="mt-3">
                        <strong>Вопросы:</strong>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                            {tpl.questions?.map((q, qi) => (
                                <li key={qi}>
                                    {q.title} ({q.type}) — варианты: {q.options.map((o) => o.option).join(", ")}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            ))}

        </div>
    );
};

export default Templates; 