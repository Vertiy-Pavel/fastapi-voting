import {
	format,
	startOfMonth,
	endOfMonth,
	getDay,
	eachDayOfInterval,
	isToday,
} from 'date-fns'
import { ru } from 'date-fns/locale'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Calendar = () => {
	const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
	const [currentDate, setCurrentDate] = useState(new Date())
	const [activeIndex, setActiveIndex] = useState(null)

	const start = startOfMonth(currentDate)
	const end = endOfMonth(currentDate)
	const allDays = eachDayOfInterval({ start, end })

	// getDay() возвращает 0 (вс)–6 (сб), нужно сместить: Пн = 0 => Вс = 6
	const startOffset = (getDay(start) + 6) % 7
	const totalCells = startOffset + allDays.length
	const endOffset = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7)

	const prevMonth = () => {
		setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
		setActiveIndex(null)
	}

	const nextMonth = () => {
		setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
		setActiveIndex(null)
	}

	return (
		<div className='w-full'>
			<div className='flex flex-col md:flex-row md:justify-between md:items-end mb-4 md:mb-2 gap-4'>
				<div className='flex flex-wrap gap-3 md:gap-5 mb-1'>
					<div className='flex items-center gap-2'>
						<div className='h-3 w-3 md:h-4 md:w-4 bg-[#FFD17D] rounded-full'></div>
						<p className='text-sm md:text-lg font-normal'>Запланировано</p>
					</div>
					<div className='flex items-center gap-2'>
						<div className='h-3 w-3 md:h-4 md:w-4 bg-[#437DE9] rounded-full'></div>
						<p className='text-sm md:text-lg font-normal'>Активно</p>
					</div>
					<div className='flex items-center gap-2'>
						<div className='h-3 w-3 md:h-4 md:w-4 bg-[#EE5B5B] rounded-full'></div>
						<p className='text-sm md:text-lg font-normal'>Завершено</p>
					</div>
				</div>
				<div className='inline-flex justify-between items-center border-1 border-[#ccc] rounded-lg py-2 px-3 uppercase w-full md:w-[218px]'>
					<p className='text-base font-normal text-sm md:text-base'>
						{format(currentDate, 'LLLL yyyy', { locale: ru })}
					</p>
					<div className='flex'>
						<ChevronLeft
							onClick={prevMonth}
							className='text-[var(--secondary-text)] bg-[var(--bg-sidebar)] hover:bg-[var(--gray)] rounded-lg transition-all cursor-pointer'
							size={20}
							strokeWidth={2}
						/>
						<ChevronRight
							onClick={nextMonth}
							className='text-[var(--secondary-text)] bg-[var(--bg-sidebar)] hover:bg-[var(--gray)] rounded-lg transition-all cursor-pointer ml-1'
							size={20}
							strokeWidth={2}
						/>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-7 gap-1 text-[#212121] uppercase mb-2 font-semibold'>
				{weekdays.map((day, index) => (
					<div
						className='flex justify-center bg-[#D2F0FF] rounded-xl h-12 md:h-16 items-center text-lg md:text-2xl font-medium p-2 md:p-4'
						key={index}
					>
						<p className='text-xs md:text-base'>{day}</p>
					</div>
				))}
			</div>

			<div className='grid grid-cols-7 gap-1'>
				{Array.from({ length: startOffset }).map((_, index) => (
					<div key={`empty-start-${index}`} className='h-12 md:h-16' />
				))}

				{allDays.map((date, index) => {
					const today = isToday(date)
					return (
						<div
							key={index}
							onClick={() => setActiveIndex(index)}
							className={`relative h-12 md:h-16 flex justify-start items-end select-none border-1 pl-2 pb-1 border-[#F4F4F4] transition-colors text-lg md:text-2xl rounded-xl cursor-pointer`}
						>
							{today && (
								<div className='bg-[var(--color1)] rounded-lg flex justify-start items-end w-8 h-8 md:w-10 md:h-10'>
									<span className='flex justify-start items-end pl-1 pb-1'>
										{format(date, 'd')}
									</span>
								</div>
							)}
							<span
								className={`${
									!today 
										? 'flex justify-start items-end w-8 h-8 md:w-10 md:h-10 pl-1 pb-1' 
										: ''
								}`}
							>
								{!today && format(date, 'd')}
							</span>
						</div>
					)
				})}

				{Array.from({ length: endOffset }).map((_, index) => (
					<div key={`empty-end-${index}`} className='h-12 md:h-16' />
				))}
			</div>
		</div>
	)
}

export default Calendar