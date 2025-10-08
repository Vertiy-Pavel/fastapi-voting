export const ProgressCircle = ({ progress }) => {
	// Нормализуем прогресс (0-100)
	const normalizedProgress = Math.min(100, Math.max(0, progress))
	// Рассчитываем параметры для SVG circle
	const radius = 45
	const circumference = 2 * Math.PI * radius
	const strokeDashoffset = circumference * (1 - normalizedProgress / 100)

	return (
       <div className='w-full h-full flex justify-center items-center p-4'>
            <div className='relative flex justify-center items-center w-full max-w-[250px] aspect-square'>
                <div className='absolute w-full h-full border-4 border-dashed rounded-full border-[#f4f4f4]'></div>
                
                <div
                    className={`absolute w-full h-full drop-shadow-xl ${
                        progress <= 25
                            ? 'drop-shadow-[#EE5B5B50] stroke-[#EE5B5B]'
                            : progress <= 50
                            ? 'drop-shadow-[#FFa05a50] stroke-[#FFa05a]'
                            : progress <= 75
                            ? 'drop-shadow-[#FFD17D50] stroke-[#FFD17D]'
                            : 'drop-shadow-[#5BC25B50] stroke-[#5BC25B]'
                    } transition-all duration-500`}
                >
                    <svg className='w-full h-full' viewBox='0 0 100 100' transform='scale(-1, 1)'>
                        <circle
                            cx='50'
                            cy='50'
                            r={radius}
                            fill='none'
                            strokeWidth='10'
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            transform='rotate(-90 50 50)'
                        />
                    </svg>
                </div>

                <div className='flex flex-col items-center absolute'>
                    <p className='font-black text-2xl sm:text-3xl lg:text-4xl text-neutral-800'>
                        {Math.round(normalizedProgress)}%
                    </p>
                    <p className='font-normal text-sm sm:text-base text-neutral-400 text-center'>Времени осталось</p>
                </div>
            </div>
        </div>
	)
}

export const StatisticCircle = ({
	totalPeople,
	registeredCount,
	votedCount,
}) => {
	// Рассчитываем проценты
	const registeredPercent = registeredCount / totalPeople
	const votedPercent = votedCount / totalPeople
	const notVotedPercent = registeredPercent - votedPercent

	// Проверка на валидность данных
	// if (registeredCount > totalPeople) {
	// 	console.error(
	// 		'Количество зарегистрированных не может быть больше общего количества людей'
	// 	)
	// 	return null
	// }

	// if (votedCount > registeredCount) {
	// 	console.error(
	// 		'Количество проголосовавших не может быть больше зарегистрированных'
	// 	)
	// 	return null
	// }

	// Функция для создания дуги
	const describeArc = (x, y, radius, startAngle, endAngle) => {
		const start = polarToCartesian(x, y, radius, endAngle)
		const end = polarToCartesian(x, y, radius, startAngle)
		const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
		return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
	}

	const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
		const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
		return {
			x: centerX + radius * Math.cos(angleInRadians),
			y: centerY + radius * Math.sin(angleInRadians),
		}
	}

	// Рассчитываем углы для каждой дуги
	const fullCircle = 360
	const registeredStartAngle = 0
	const registeredEndAngle =
		registeredStartAngle + fullCircle * registeredPercent

	const votedStartAngle = 0
	const votedEndAngle = votedStartAngle + fullCircle * votedPercent

	const notVotedStartAngle = votedEndAngle
	const notVotedEndAngle = notVotedStartAngle + fullCircle * notVotedPercent

	return (
		<div className='w-full h-full flex justify-center items-center'>
			<div className='relative flex justify-center items-center'>
				<div>
					<svg className='w-full h full' width='360' height='360' viewBox='0 0 360 360' fill='none'>
						<path
                            d={describeArc(180, 180, 145, 0, 359.99)}
                            stroke='#FFD17D'
                            strokeWidth='40'
                        />

						{/* Внутренний круг: Проголосовавшие и непроголосовавшие */}
                        {votedCount === registeredCount ? (
                            <path
                                d={describeArc(180, 180, 165, 0, 359.99)}
                                stroke='#5BC25B'
                                strokeWidth='20'
                            />
                        ) : (
                            <>
                                <path
                                    d={describeArc(180, 180, 165, votedStartAngle, votedEndAngle)}
                                    stroke='#5BC25B'
                                    strokeWidth='20'
                                />
                                <path
                                    d={describeArc(180, 180, 165, notVotedStartAngle, notVotedEndAngle)}
                                    stroke='#EE5B5B'
                                    strokeWidth='20'
                                />
                            </>
                        )}
					</svg>
				</div>

				<div className='flex flex-col items-center absolute'>
					<p className='font-semibold text-xl'>{registeredCount}</p>
					<p className='font-normal text-base text-[#ccc]'>Зарегистрировано</p>
					<p className='font-semibold text-xl mt-5'>{votedCount}</p>
					<p className='font-normal text-base text-[#ccc]'>Проголосовало</p>
				</div>
			</div>
		</div>
	)
}
