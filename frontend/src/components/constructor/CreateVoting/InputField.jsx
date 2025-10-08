import React from 'react';

const InputField = ({label, value, onChange, placeholder = ""}) => {

    return (
        <div className="mb-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-1 p-2 px-[20px] py-[16px] border border-gray-300 rounded-[12px] w-full focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
        </div>
    );
};

export default InputField;