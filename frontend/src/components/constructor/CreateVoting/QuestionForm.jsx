import React, {useState} from 'react';
import {LuTrash2} from "react-icons/lu";
import { FiPlusSquare } from "react-icons/fi";


const QuestionForm = ({question, onChange, onRemove}) => {

    const handleTypeChange = (e) => {
        onChange({...question, type: e.target.value});
    };

    const handleHeaderChange = (e) => {
        onChange({...question, header: e.target.value});
    };

    const handleOptionChange = (index, e) => {
        const newOptions = [...question.options];
        newOptions[index] = e.target.value;
        onChange({...question, options: newOptions});
    };

    const addOption = () => {
        onChange({...question, options: [...question.options, '']});
    };

    const removeOption = (index) => {
        if (question.options.length <= 1) return;
        const newOptions = question.options.filter((_, i) => i !== index);
        onChange({...question, options: newOptions});
    };

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between">
                <div className="text-base font-bold text-gray-700">
                    Вопрос №{question.id}
                </div>
                <button
                    type="button"
                    onClick={onRemove}
                    className="bg-[#f4f4f4] hover:bg-[#EE5B5B] hover:text-[#FFE3E3] transition-all rounded-lg p-2 cursor-pointer"
                >
                    <LuTrash2 size={24} />
                </button>
            </div>

            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Тип вопроса</label>
                <select
                    type="text"
                    value={question.type}
                    onChange={handleTypeChange}
                    className="mt-1 p-2 px-[20px] py-[16px] border border-gray-300 rounded-[12px] w-full"
                    placeholder="Введите тип вопроса"
                >
                    <option value="single_choice">Одиночный вопрос</option>
                    <option value="multiple_choice">Множественный вопрос</option>
                </select>
            </div>

            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Заголовок вопроса</label>
                <input
                    type="text"
                    value={question.header}
                    onChange={handleHeaderChange}
                    className="mt-1 p-2 px-[20px] py-[16px] border border-gray-300 rounded-[12px] w-full"
                    placeholder="Введите заголовок вопроса"
                />
            </div>

            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Варианты ответа</label>
                <div className="mt-1 space-y-2">
                    {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e)}
                                className="p-2 border px-[20px] py-[16px] border-gray-300 rounded-[12px] w-full"
                                placeholder={`Вариант ${index + 1}`}
                            />
                            <button
                                className="bg-[#f4f4f4] hover:bg-[#EE5B5B] hover:text-[#FFE3E3] transition-all rounded-lg p-2 cursor-pointer disabled:opacity-50"
                                onClick={() => removeOption(index)}
                                disabled={question.options.length <= 1}
                            >
                                <LuTrash2 size={24} />
                            </button>
                            <button className="bg-[#f4f4f4] hover:bg-gray-300 transition-all rounded-lg p-2 cursor-pointer disabled:opacity-5"
                                    onClick={addOption}>
                                <FiPlusSquare size={24} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;