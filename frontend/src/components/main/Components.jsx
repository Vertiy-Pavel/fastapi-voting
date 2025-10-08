import { Check } from 'lucide-react'
import { useState } from 'react'

const LinkText = ({ title, size, width }) => {
	return (
		<>
			<div className='group inline-flex flex-col w-fit'>
				<p
					className={`${size ? size : 'text-base'} ${
						width ? width : 'font-light'
					} text-[#212121] select-none cursor-pointer md:text-base`}
				>
					{title}
				</p>
				<div className='h-[1px] w-0 group-hover:w-full bg-[#212121] transition-all duration-300'></div>
			</div>
		</>
	)
}

const CheckBox = ({ title }) => {
	const [checked, setChecked] = useState(false)

	return (
		<div className='flex gap-3 items-center'>
			<button
				type='button'
				className={`w-5 h-5 md:w-5 md:h-5 rounded-[4px] flex items-center justify-center transition-all duration-200 bg-[#212121] flex-shrink-0`}
				onClick={() => setChecked(!checked)}
			>
				<Check
					className={`${
						!checked ? 'opacity-0' : 'opacity-100'
					} text-white drop-shadow-sm w-4 h-4 transition-all duration-100`}
					strokeWidth={3}
				/>
			</button>
			<p className='text-sm md:text-base leading-tight'>{title}</p>
		</div>
	)
}

export { LinkText, CheckBox }