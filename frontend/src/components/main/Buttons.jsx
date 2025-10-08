import { ChevronLeft, ChevronRight, CircleCheck } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@material-tailwind/react'

const ToggleLangBtn = () => {
	const [isRusLang, setIsRusLang] = useState(true)
	return (
		<>
			<div className='inline-flex relative'>
				<div className='inline-flex items-center py-2 px-4 gap-6 text-base font-medium text-white uppercase '>
					<p className='z-10 cursor-pointer' onClick={() => setIsRusLang(true)}>
						ru
					</p>
					<p
						className='z-10 cursor-pointer'
						onClick={() => setIsRusLang(false)}
					>
						eng
					</p>
				</div>

				<div
					className={`bg-[#303030] transition-all absolute rounded-lg w-[52px] h-[39px] ${
						!isRusLang && 'translate-x-[49px]'
					}`}
				></div>
			</div>
		</>
	)
}

const TransButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='border-1 py-3 px-4 w-full flex gap-3 items-center whitespace-nowrap border-[#212121] bg-transparent rounded-lg text-lg font-normal text-[#212121] md:text-lg md:py-3 md:px-4'
		>
			{children}
		</button>
	)
}

const WhiteButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='border-1 w-full flex items-center gap-5 px-5 py-3 whitespace-nowrap border-[#f4f4f4] rounded-lg text-lg font-medium text-[#212121] hover:brightness-90 transition-all cursor-pointer active:scale-98 md:text-lg md:py-3 md:px-5'
		>
			{children}
		</button>
	)
}

const BlueButton = ({ onClick, children }) => {
	return (
		<button
			onClick={onClick}
			className='w-full py-3 px-3 bg-[#437DE9] rounded-lg text-lg font-normal text-white flex gap-3 justify-center items-center hover:brightness-90 transition-all cursor-pointer active:scale-98 whitespace-nowrap md:text-lg md:py-3 md:px-3'
		>
			{children}
		</button>
	)
}

const AltBlueButton = ({ onClick, children }) => {
	return (
		<button
			onClick={onClick}
			className='border-1 w-full py-3 border-[#437DE9] rounded-xl text-lg font-normal text-[#437DE9] flex gap-5 justify-center items-center hover:brightness-90 transition-all cursor-pointer active:scale-98 md:text-lg md:py-3'
		>
			{children}
		</button>
	)
}

const GreenButton = ({ onClick, children }) => {
	return (
		<button
			onClick={onClick}
			className='w-full py-3 px-3 bg-[#5BC25B] rounded-lg text-lg font-normal text-white flex gap-3 justify-center items-center hover:brightness-90 transition-all cursor-pointer active:scale-98 whitespace-nowrap md:text-lg md:py-3 md:px-3'
		>
			{children}
		</button>
	)
}

const GrayButton = ({ onClick, children }) => {
	return (
		<button
			onClick={onClick}
			className='w-full py-3 px-3 bg-[#F4F4F4] whitespace-nowrap rounded-lg text-lg font-normal text-[#212121] flex gap-3 justify-center items-center hover:brightness-90 transition-all cursor-pointer active:scale-98 md:text-lg md:py-3 md:px-3'
		>
			{children}
		</button>
	)
}

const RedButton = ({ title, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='w-full py-3 text-[#EE5B5B] rounded-xl text-lg font-medium hover:brightness-90 transition-all cursor-pointer active:scale-98 md:text-lg md:py-3'
		>
			{title}
		</button>
	)
}

const PrevNextButton = ({ children, onClick }) => {
	return (
		<div className='inline-flex flex-col sm:flex-row sm:justify-between sm:items-center border-1 border-[#f4f4f4] rounded-lg py-3 px-3 gap-2 sm:gap-0'>
			<p className='text-base sm:text-xl font-normal whitespace-nowrap text-center sm:text-left'>
				<span className='font-semibold'>1-10</span> из 100
			</p>
			<div className='flex justify-center sm:justify-start'>
				<ChevronLeft
					onClick={onClick ? () => onClick('prev') : undefined}
					className='text-[var(--secondary-text)] bg-[var(--bg-sidebar)] hover:bg-[var(--gray)] rounded-lg transition-all cursor-pointer'
					size={22}
				/>
				<ChevronRight
					onClick={onClick ? () => onClick('next') : undefined}
					className='text-[var(--secondary-text)] bg-[var(--bg-sidebar)] hover:bg-[var(--gray)] rounded-lg transition-all cursor-pointer ml-2'
					size={22}
				/>
			</div>
		</div>
	)
}

const RadioBtn = ({ options, title, required, name }) => {
	return (
		<div className='w-full inline-flex flex-col'>
			<div className='inline-flex items-center gap-[10px]'>
				<p className='text-[16px] md:text-[18px]'>{title}</p>
				{required && <CircleCheck color={'#008200'} size={16} />}
			</div>
			<div className='relative grid grid-cols-2 gap-2 p-1 text-sm md:grid-cols-2'>
				{options.map((item, index) => (
					<label
						key={index}
						className='flex-1 text-center select-none col-span-1'
					>
						<input
							type='radio'
							name={name}
							className='hidden peer'
							defaultChecked={index === 0}
						/>
						<span className='flex cursor-pointer items-center justify-center rounded-xl h-[45px] md:h-[50px] text-[#212121] border-1 border-[#212121] transition-all duration-150 ease-in-out peer-checked:bg-[#212121] peer-checked:text-white text-sm md:text-base'>
							{item}
						</span>
					</label>
				))}
			</div>
		</div>
	)
}

export {
	ToggleLangBtn,
	Button,
	BlueButton,
	RedButton,
	GreenButton,
	GrayButton,
	AltBlueButton,
	TransButton,
	WhiteButton,
	PrevNextButton,
	RadioBtn,
}