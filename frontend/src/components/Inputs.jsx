import { useState } from "react";
import { LuCircleCheck } from "react-icons/lu";

const InputDefault = ({
                          type,
                          placeholder,
                          title,
                          required,
                          validate,
                          className,
                          value,
                          onChange,
                          name,
                      }) => {
    const [inputStatus, setInputStatus] = useState(false);

    const handleInputChange = (e) => {
        let val = e.target.value;

        if (type === "tel") {
            val = val.replace(/[^0-9+]/g, ""); // убираем всё, кроме цифр и "+"
        }

        setInputStatus(validate ? validate(val) : val.trim() !== "");
        if (onChange) onChange(e);
    };

    return (
        <div className="w-full inline-flex flex-col mb-4">
            {title && (
                <div className="inline-flex items-center gap-[10px]">
                    <p>{title}</p>
                    {required && (
                        <LuCircleCheck
                            color={!inputStatus ? "#212121" : "#008200"}
                            size={16}
                        />
                    )}
                </div>
            )}

            <input
                type={type}
                name={name}
                value={value}
                onChange={handleInputChange}
                className={`rounded-xl border border-[#212121] p-[12px] text-[#212121] placeholder:text-[#ccc] ${className}`}
                placeholder={placeholder}
                autoComplete="on"
                inputMode={type === "tel" ? "numeric" : undefined}
                pattern={type === "tel" ? "[0-9+]*" : undefined}
                maxLength={type === "tel" ? 12 : undefined}
                required={required}
            />
        </div>
    );
};

export { InputDefault };
