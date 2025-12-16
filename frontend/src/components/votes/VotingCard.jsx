import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getVotingStatusConfig } from './Formatters';
import Modal from '../Modal.jsx'
import { LuCalendar1, LuAlarmClock, LuTrash2 } from "react-icons/lu";
import { IoMdStats } from "react-icons/io";
import {deleteVoting} from "../../services/api/voting.js";
import toast from "react-hot-toast";
import {BlueButton} from '../Button.jsx'

const VotingCard = ({ voting, isArchived }) => {
    const status = getVotingStatusConfig(voting, isArchived);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const userId = localStorage.getItem("user_id");
    console.log(userId === voting.creatorId);

    const handleDelete = async () => {
        try {
            await deleteVoting(voting.id);
            toast.success('Голосование удалено');
            setIsModalOpen(false);
            setIsDeleted(true);
        } catch (error) {
            console.log(error)
            toast.error('Не удалось удалить голосование')
        }
    }

    return (
        <div className="bg-white rounded-[15px] sm:rounded-[20px] w-full shadow-lg p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 relative">
            {/* Заголовок, группа и часовой пояс */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="flex flex-col gap-1 sm:gap-2">
                    <div className="text-neutral-800 text-lg sm:text-xl leading-tight">
                        {voting.title}
                    </div>
                    <div className="text-stone-300 text-xs sm:text-sm font-normal leading-tight">
                        {voting.groupName}
                    </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 text-neutral-600 text-xs sm:text-sm font-normal leading-tight">
                    {voting.creatorName}
                </div>
            </div>

            {/* Блок статуса и дат - главные изменения */}
            <div className="flex flex-col lg:flex-row lg:space-x-8 flex-grow">
                <div className="flex flex-col gap-2 w-full lg:w-fit mb-4 lg:mb-0">
                    <div className={`h-8 sm:h-10 p-2 sm:p-[10px] rounded-lg w-full 2xl:w-90 flex items-center gap-2 ${status.bg}`}>
                        {status.icon}
                        <div className={`text-xs sm:text-xs md:text-sm ${status.textColor}`}>
                            {status.text}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-130">
                    {/* Даты регистрации */}
                    <div className="flex flex-col gap-3 sm:gap-4 flex-1">
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <div className="text-neutral-600 text-xs sm:text-base">Начало регистрации</div>
                            <div className="flex items-center gap-1 sm:gap-2 text-neutral-800 text-xs sm:text-base">
                                <LuCalendar1 size={20} />
                                <span className="whitespace-nowrap">{voting.registrationStart.date}</span>
                                <LuAlarmClock size={20} />
                                <span className="whitespace-nowrap">{voting.registrationStart.time}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <div className="text-neutral-600 text-xs sm:text-base">
                                Окончание регистрации
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 text-neutral-800 text-xs sm:text-base">
                                <LuCalendar1 size={20} />
                                <span className="whitespace-nowrap">{voting.registrationEnd.date}</span>
                                <LuAlarmClock size={20} />
                                <span className="whitespace-nowrap">{voting.registrationEnd.time}</span>
                            </div>
                        </div>
                    </div>

                    {/* Даты голосования */}
                    <div className="flex flex-col gap-3 sm:gap-4 flex-1 mt-4 sm:mt-0">
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <div className="text-neutral-600 text-xs sm:text-base">
                                Начало голосования
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 text-neutral-800 text-xs sm:text-base">
                                <LuCalendar1 size={20} />
                                <span className="whitespace-nowrap">{voting.votingStart.date}</span>
                                <LuAlarmClock size={20} />
                                <span className="whitespace-nowrap">{voting.votingStart.time}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <div className="text-neutral-600 text-xs sm:text-base">
                                Окончание голосования
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 text-neutral-800 text-xs sm:text-base">
                                <LuCalendar1 size={20} />
                                <span className="whitespace-nowrap">{voting.votingEnd.date}</span>
                                <LuAlarmClock size={20} />
                                <span className="whitespace-nowrap">{voting.votingEnd.time}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Кнопки управления */}
            <div className="flex justify-end mt-2 sm:absolute sm:bottom-6 sm:right-6">
                <div className="flex gap-3 sm:gap-[10px]">
                    <Link to={`/votes/${voting.id}`} state={voting} className='bg-[#f4f4f4] hover:bg-[#ccc] transition-all rounded-lg p-2 cursor-pointer'>
                        <IoMdStats />
                    </Link>
                    {String(userId) === String(voting.creatorId) &&
                        <div className='bg-[#f4f4f4] hover:bg-[#EE5B5B] hover:text-[#FFE3E3] transition-all rounded-lg p-2 cursor-pointer' onClick={() => setIsModalOpen(true)} >
                            <LuTrash2 />
                        </div>
                    }
                </div>
            </div>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Подтверждение"
            >
                <div className="mt-2 text-sm text-black">
                    Вы уверены, что хотите удалить голосование <strong className="break-words">{voting.title}</strong>?
                </div>
                <div className="flex gap-4 justify-end pt-4">
                    <BlueButton
                        onClick={() => setIsModalOpen(false)}
                        className="h-auto px-1 py-2  cursor-pointer rounded-lg bg-gray-200 !text-black font-semibold hover:bg-gray-300 transition-colors"
                    >
                        Отмена
                    </BlueButton>

                    <BlueButton
                        onClick={handleDelete}
                        className="h-auto px-1 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                    >
                        Удалить
                    </BlueButton>
                </div>
            </Modal>

            {isDeleted && (
                <div className="absolute inset-0 bg-gray-500/40 rounded-[15px] z-30">
                </div>
            )}
        </div>
    );
};

export default VotingCard;