import {
	AlarmClock,
	Calendar1,
	ChartColumn,
	ChevronLeft,
	ChevronRight,
	FileArchive,
	Flame,
	Globe,
	ScanFace,
	Trash2,
} from 'lucide-react'
import { GrayTag, GreenTag, YellowTag } from './Tags'
import { BlueButton, GreenButton } from './Buttons'
import { ProgressCircle } from '../details/ProgressCircle'
import { NavLink } from 'react-router-dom'

const DateRow = ({ date, time, title }) => {
	return (
		<>
			<p className='text-sm md:text-base font-normal whitespace-nowrap text-[#ccc] mb-1 md:mb-2'>
				{title}
			</p>
			<div className='flex gap-2 md:gap-3 items-center text-base md:text-xl'>
				<div className='flex gap-1 md:gap-2 items-center'>
					<Calendar1 size={16} className='md:w-auto' />
					<p className='font-normal text-sm md:text-base mt-[1px] md:mt-[2px]'>{date}</p>
				</div>
				<div className='flex gap-1 md:gap-2 items-center'>
					<AlarmClock size={16} className='md:w-auto' />
					<p className='font-normal text-sm md:text-base mt-[1px] md:mt-[2px]'>{time}</p>
				</div>
			</div>
		</>
	)
}

export const VoteCard = ({ title, description, timezone, deadlines }) => {
	return (
		<>
			<div className='bg-white flex flex-col gap-3 md:gap-3 rounded-[15px] md:rounded-[20px] p-4 md:p-5 shadow-sm'>
				<p className='text-lg md:text-xl font-bold'>{title}</p>
				<div className='flex flex-col md:flex-row md:justify-between gap-2'>
					<p className='text-sm md:text-base font-normal text-[#ccc]'>{description}</p>
					<div className='flex items-center gap-2 md:gap-3'>
						<Globe size={16} className='md:w-auto' />
						<p className='text-sm md:text-base font-normal text-[#212121]'>{timezone}</p>
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<div className='col-span-1 flex flex-col gap-2'>
						<GreenTag>
							<Flame size={16} className='md:w-auto' />
							<p className='text-sm md:text-base'>Голосование активно</p>
						</GreenTag>
						<YellowTag>
							<ScanFace size={16} className='md:w-auto' />
							<p className='text-sm md:text-base'>Голосование на этапе регистрации</p>
						</YellowTag>
					</div>
					<div className='col-span-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-20 md:gap-y-5'>
						{deadlines.map((item, index) => {
							return (
								<div key={index} className='col-span-1'>
									<DateRow
										title={item.title}
										date={item.date}
										time={item.time}
									/>
								</div>
							)
						})}
					</div>
					<div className='col-span-1 relative'>
						<div className='flex gap-2 md:gap-3 absolute bottom-0 right-0'>
							<NavLink
								to={'/details'}
								className='bg-[#f4f4f4] hover:bg-[#ccc] transition-all rounded-lg p-2 cursor-pointer'
							>
								<ChartColumn size={20} className='md:w-auto' />
							</NavLink>
							<button className='bg-[#f4f4f4] hover:bg-[#EE5B5B] hover:text-[#FFE3E3] transition-all rounded-lg p-2 cursor-pointer'>
								<Trash2 size={20} className='md:w-auto' />
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export const MinInfoVoteCard = ({
	title,
	description,
	timezone,
	date,
	time,
}) => {
	return (
		<>
			<div className='bg-white flex flex-col gap-1 rounded-[15px] md:rounded-[20px] p-4 md:p-5 border-1 border-[#f4f4f4]'>
				<p className='text-base md:text-base font-bold'>{title}</p>
				<div className='flex flex-col md:flex-row md:justify-between gap-2'>
					<p className='text-sm md:text-base font-normal text-[#ccc]'>{description}</p>
					<div className='flex items-center gap-2 md:gap-3'>
						<Globe size={16} className='md:w-auto' />
						<p className='text-sm md:text-base font-normal text-[#212121]'>{timezone}</p>
					</div>
				</div>
				<div className='grid grid-cols-1 gap-1'>
					<div className='flex flex-col gap-1'>
						<YellowTag wfull={true} px={'px-1'}>
							<ScanFace size={16} className='md:w-auto' />
							<p className='whitespace-nowrap text-sm md:text-base font-medium'>
								Голосование на этапе регистрации
							</p>
						</YellowTag>
						<GrayTag px={'px-1'}>
							<FileArchive size={16} className='md:w-auto' />
							<p className='whitespace-nowrap text-sm md:text-base font-medium'>Тайное</p>
						</GrayTag>
					</div>
					<div className='col-span-3 bg-[#FFF6F6] rounded-xl px-3 md:px-5 py-2'>
						<DateRow
							title={'Окончание регистрации'}
							date={date}
							time={time}
						/>
					</div>
				</div>
				<div className='flex flex-col md:flex-row items-start md:items-center gap-3 mt-4'>
					<div className='w-full md:w-1/3'>
						<BlueButton>
							<p className='text-sm md:text-base font-semibold'>Зарегистрироваться</p>
						</BlueButton>
					</div>
					<p className='font-semibold text-[#EE5B5B] text-sm md:text-base'>
						Вы не зарегистрированы
					</p>
				</div>
			</div>
		</>
	)
}

export const ActualVoteCard = ({
	title,
	startdate,
	starttime,
	enddate,
	endtime,
	progress,
}) => {
	return (
		<>
			<div className='flex flex-col h-full justify-between rounded-[20px] '>
				<div className='flex flex-col gap-3'>
					<p className='text-base font-bold'>{title}</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
						<div className='bg-[#F6FFF9] rounded-xl px-3 md:px-5 py-2'>
							<DateRow
								title={'Начало голосования'}
								date={startdate}
								time={starttime}
							/>
						</div>
						<div className='bg-[#FFF6F6] rounded-xl px-3 md:px-5 py-2'>
							<DateRow
								title={'Окончание голосования'}
								date={enddate}
								time={endtime}
							/>
						</div>
					</div>
				</div>
				<div className='h-fit flex justify-between items-center'>
					<ChevronLeft color='#ccc' size={48} />
					<ProgressCircle progress={progress} />
					<ChevronRight color='#ccc' size={48} />
				</div>
				<div className='flex items-center gap-3 mt-5'>
					<div className='w-1/2 mb-8'>
						<GreenButton>
							<p>Проголосовать</p>
						</GreenButton>
					</div>
				</div>
			</div>
		</>
	)
}
