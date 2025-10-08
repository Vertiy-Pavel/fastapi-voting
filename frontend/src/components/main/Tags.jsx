const GrayTag = ({ children, px }) => {
	return (
		<div
			className={`bg-[#F4F4F4] text-[#212121] font-medium rounded-lg py-2 ${
				px ? px : 'px-3'
			} inline-flex items-center justify-center w-fit gap-2`}
		>
			{children}
		</div>
	)
}

const GreenTag = ({ children, px }) => {
	return (
		<div
			className={`bg-[#E6FFDD] text-[#135617] font-medium rounded-lg py-2 ${
				px ? px : 'px-3'
			} inline-flex items-center justify-center w-fit gap-1`}
		>
			{children}
		</div>
	)
}

const YellowTag = ({ children, wfull, px }) => {
	return (
		<div
			className={`bg-[#FFFBD0] text-[#564E13] font-medium rounded-lg py-2  inline-flex items-center justify-center ${
				!wfull ? 'w-fit' : 'w-full'
			} ${px ? px : 'px-3'} gap-1`}
		>
			{children}
		</div>
	)
}

const RedTag = ({ children }) => {
	return (
		<div className='bg-[#FFE3E3] text-[#5E2424] font-medium rounded-lg py-2 px-3 inline-flex items-center justify-center w-fit gap-2'>
			{children}
		</div>
	)
}

const BlueTag = ({ children, wfull }) => {
	return (
		<div
			className={`bg-[#D2F0FF] text-[#2E4550] font-medium rounded-lg py-2 px-3 inline-flex items-center justify-center ${
				!wfull ? 'w-fit' : 'w-full'
			} gap-2`}
		>
			{children}
		</div>
	)
}

export { GreenTag, YellowTag, GrayTag, RedTag, BlueTag }
