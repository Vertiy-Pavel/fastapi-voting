import React from 'react';
import { FiPlusSquare } from "react-icons/fi";

const AddQuestionButton = ({onClick}) => {
    return (
        <div className="items-center mt-4">
            <button
                className="flex items-center"
                onClick={onClick}
            >
                <FiPlusSquare size={24}/>

                <span className="ml-2 text-sm font-medium text-gray-700">Добавить вопрос</span>
            </button>
        </div>
    );
};

export default AddQuestionButton;