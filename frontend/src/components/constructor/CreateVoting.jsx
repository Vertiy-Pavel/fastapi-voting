import React, { useState, useEffect } from "react";
import StepHeader from "/src/components/constructor/CreateVoting/StepHeader";
import InputField from "/src/components/constructor/CreateVoting/InputField";
import DateTimePicker from "/src/components/constructor/CreateVoting/DateTimePicker";
import QuestionForm from "/src/components/constructor/CreateVoting/QuestionForm";
import AddQuestionButton from "/src/components/constructor/CreateVoting/AddQuestionButton";
import { saveTemplate } from "../../services/api";
import { CiViewList } from "react-icons/ci";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { useDepartments } from "../../hooks/useDepartments.js";
import { createVoting } from "../../services/api/voting.js";
import { BlueButton, Spinner, ToggleButton } from "../Button.jsx";
import toast from "react-hot-toast";
import { DepartmentSelectConstructor } from "../DepartmentSelect.jsx";

const CreateVoting = ({selectedTemplate}) => {
    const now = new Date();

    const [votingTitle, setVotingTitle] = useState("");

    const [registrationStart, setRegistrationStart] = useState({
        date: now,
        time: now,
    });
    const [registrationEnd, setRegistrationEnd] = useState({
        date: now,
        time: now,
    });
    const [votingStart, setVotingStart] = useState({
        date: now,
        time: now,
    });
    const [votingEnd, setVotingEnd] = useState({
        date: now,
        time: now,
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Управление открытием/закрытием выпадающего списка для департаментов
    const [typeVoting, setTypeVoting] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isSavingTemplate, setIsSavingTemplate] = useState(false);

    // Департаменты
    const {
        departments,
        selectedDepartmentIds,
        handleDepartmentChange,
        isLoadingDepartments,
        searchTerm,
        setSearchTerm,
    } = useDepartments();

    // Загружаем данные из выбранного шаблона
    useEffect(() => {
        if (selectedTemplate) {
            // Устанавливаем заголовок и условие кворума из шаблона
            setVotingTitle(selectedTemplate.title || "");
            setQuorumCondition(selectedTemplate.quorum || "");

            // Нормализуем вопросы из шаблона:
            // добавляем уникальный id
            // приводим title => header (для совместимости с QuestionForm)
            // options: вытаскиваем строку из объекта { option: "..." }
            const normalized = (selectedTemplate.questions || []).map((q, idx) => ({
                id: idx + 1,
                type: q.type || "single_choice",
                header: q.title || "",
                options: (q.options || []).map((opt) =>
                    typeof opt === "object" && opt !== null ? opt.option : opt
                ),
            }));

            setQuestions(normalized);
            console.log(selectedTemplate);
        }
    }, [selectedTemplate]);

    const [questions, setQuestions] = useState([
        {
            id: 1,
            type: "",
            header: "",
            options: ["", ""],
        },
    ]);

    const [quorumCondition, setQuorumCondition] = useState("");

    // --- Обработчики изменений ---
    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    // Универсальный обработчик для полей date/time
    const handleDateTimeChange = (setter, field) => (value) => {
        setter(prev => ({
            ...prev,
            [field]: value // value здесь — это уже объект Date
        }));
    };

    const removeQuestion = (id) => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
    };

    const addNewQuestion = () => {
        const newId = Math.max(0, ...questions.map((q) => q.id)) + 1;
        setQuestions((prev) => [
            ...prev,
            {id: newId, type: "", header: "", options: [""]},
        ]);
    };

    // Функция для объединения даты и времени в ISO-формат
    const combineDateTime = (dateObj, timeObj) => {
        // Проверка на валидность объектов
        if (!dateObj || !timeObj || isNaN(new Date(dateObj)) || isNaN(new Date(timeObj))) {
            return null;
        }

        const date = new Date(dateObj);
        const time = new Date(timeObj);

        // Собираем компоненты в локальном времени
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(time.getHours()).padStart(2, "0");
        const minutes = String(time.getMinutes()).padStart(2, "0");
        const seconds = "00";

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const data = {
        title: votingTitle || "Без названия",
        theme: "string",
        quorum:
            quorumCondition === "50_plus_1"
                ? 50
                : quorumCondition === "two_thirds"
                    ? 66
                    : 0,
        registration_start: combineDateTime(registrationStart.date, registrationStart.time),
        registration_end: combineDateTime(registrationEnd.date, registrationEnd.time),
        voting_start: combineDateTime(votingStart.date, votingStart.time),
        voting_end: combineDateTime(votingEnd.date, votingEnd.time),
        questions: questions.map((q) => ({
            type: q.type || "single_choice",
            title: q.header || "Без названия",
            options: (q.options || [])
                .filter((opt) => opt.trim() !== "")
                .map((opt) => ({option: opt.trim()})),
        })),
        departments: !typeVoting ? selectedDepartmentIds : [], // Используем выбранные ID департаментов
    };

    // Создание голосования
    const sendToServer = async () => {
        setIsSaving(true);
        try {
            await createVoting(data);
            console.log("Голосование успешно создано");
            toast.success("Голосование успешно создано");
        } catch (error) {
            console.log(error);
            toast.error("Не удалось создать голосование");
        } finally {
            setIsSaving(false);
        }
    };

    // Отправка шаблона
    const sendTemplateToServer = async () => {
        setIsSavingTemplate(true);
        try {
            await saveTemplate(data);
            console.log("Шаблон сохранен");
            toast.success("Шаблон сохранен");
        } catch (error) {
            console.log(error);
            toast.error("Не удалось сохранить шаблон");
        } finally {
            setIsSavingTemplate(false);
        }
    };

    return (
        <>
            <div className="bg-white p-6 rounded-[20px] shadow-lg ">
                <StepHeader stepNumber={1} title="Настройки"/>

                <InputField
                    label="Название голосования"
                    value={votingTitle}
                    onChange={handleChange(setVotingTitle)}
                    placeholder="Введите название"
                />

                {/* Условие кворума */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Условие кворума
                </label>
                <select
                    value={quorumCondition}
                    onChange={handleChange(setQuorumCondition)}
                    className="my-1 p-2 py-[20px] border border-gray-300 rounded-[12px] w-full bg-white focus:outline-none focus:border-gray-700 hover:border-gray-700 transition-colors"
                >
                    <option value="" disabled>
                        Выберите условие...
                    </option>
                    <option value="50_plus_1">50% + 1</option>
                    <option value="two_thirds">2/3 голосов</option>
                    <option value="unanimous">Единогласно</option>
                </select>

                <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                    Тип голосования
                </label>
                <div className="flex flex-wrap gap-2 justify-start">
                    <ToggleButton
                        className={`border rounded-xl ${typeVoting ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-100'}`}
                        onClick={() => setTypeVoting(true)}>
                        Открытое
                    </ToggleButton>

                    <ToggleButton
                        className={`border rounded-xl ${!typeVoting ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-100'}`}
                        onClick={() => setTypeVoting(false)}>
                        Закрытое
                    </ToggleButton>
                </div>

                {!typeVoting && (
                    <>
                        <div className='mt-2'>
                            <DepartmentSelectConstructor
                                departments={departments}
                                selectedIds={selectedDepartmentIds}
                                onToggleId={handleDepartmentChange}
                                searchTerm={searchTerm}
                                onSearchChange={setSearchTerm}
                                isLoading={isLoadingDepartments}
                            />
                        </div>
                    </>
                )}

                {/* Даты и время */}
                <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
                    <DateTimePicker
                        label="Начало регистрации"
                        selectedDate={registrationStart.date}
                        selectedTime={registrationStart.time}
                        onDateChange={handleDateTimeChange(setRegistrationStart, "date")}
                        onTimeChange={handleDateTimeChange(setRegistrationStart, "time")}
                    />
                    <DateTimePicker
                        label="Окончание регистрации"
                        selectedDate={registrationEnd.date}
                        selectedTime={registrationEnd.time}
                        onDateChange={handleDateTimeChange(setRegistrationEnd, "date")}
                        onTimeChange={handleDateTimeChange(setRegistrationEnd, "time")}
                    />
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-4 mt-2">
                    <DateTimePicker
                        label="Начало голосования"
                        selectedDate={votingStart.date}
                        selectedTime={votingStart.time}
                        onDateChange={handleDateTimeChange(setVotingStart, "date")}
                        onTimeChange={handleDateTimeChange(setVotingStart, "time")}
                    />
                    <DateTimePicker
                        label="Окончание голосования"
                        selectedDate={votingEnd.date}
                        selectedTime={votingEnd.time}
                        onDateChange={handleDateTimeChange(setVotingEnd, "date")}
                        onTimeChange={handleDateTimeChange(setVotingEnd, "time")}
                    />
                </div>

                <div className="mt-6"></div>
                <StepHeader stepNumber={2} title="Вопросы"/>

                {questions.map((question) => (
                    <QuestionForm
                        key={question.id}
                        question={question}
                        onChange={(updated) => {
                            setQuestions((prev) =>
                                prev.map((q) => (q.id === question.id ? updated : q))
                            );
                        }}
                        onRemove={() => removeQuestion(question.id)}
                    />
                ))}

                <AddQuestionButton onClick={addNewQuestion}/>

                {/* Кнопки управления */}
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <BlueButton
                        onClick={sendToServer}
                        className="w-full md:w-xs px-4 py-4 md:px-[20px] md:py-[16px]"
                    >
                        {isSaving ? (
                            <>
                                <Spinner/>
                            </>
                        ) : (
                            <>
                                <MdOutlineRocketLaunch size={24}/>
                                Создать голосование
                            </>
                        )}
                    </BlueButton>

                    <BlueButton
                        onClick={sendTemplateToServer}
                        className="w-full md:w-xs border border-blue-500 bg-white !text-blue-500 px-4 py-4 md:px-[20px] md:py-[16px] hover:bg-blue-50"
                    >
                        {isSavingTemplate ? (
                            <>
                                <Spinner/>
                            </>
                        ) : (
                            <>
                                <CiViewList size={24}/>
                                Сохранить шаблон
                            </>
                        )}
                    </BlueButton>
                </div>
            </div>
        </>
    );
};

export default CreateVoting;
