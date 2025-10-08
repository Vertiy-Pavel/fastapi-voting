import {
	Card,
	CardBody,
	CardHeader,
	Typography,
} from '@material-tailwind/react'
import Chart from 'react-apexcharts'

export const Chart1 = ({ series, colors }) => {
	const chartConfig = {
		type: 'line',
		height: 300, // Уменьшена высота для мобильных
		series: series,
		options: {
			chart: {
				toolbar: {
					show: false,
				},
				zoom: {
					enabled: false, // Отключено для мобильных
				},
			},
			title: {
				show: '',
			},
			dataLabels: {
				enabled: false,
			},
			colors: colors,
			stroke: {
				lineCap: 'butt',
				curve: 'straight',
				width: 2,
			},
			markers: {
				size: 4, // Уменьшен размер маркеров
			},
			xaxis: {
				axisTicks: {
					show: false,
				},
				axisBorder: {
					show: false,
				},
				labels: {
					style: {
						colors: '#000',
						fontSize: '12px', // Уменьшен размер шрифта
						fontFamily: 'inherit',
						fontWeight: 400,
					},
				},
				categories: [
					'8:00',
					'9:00',
					'10:00',
					'11:00',
					'12:00',
					'13:00',
					'14:00',
					'15:00',
					'16:00',
					'17:00',
					'18:00',
				],
				tickAmount: 6, // Ограничено количество меток на мобильных
			},
			yaxis: {
				min: 0,
				max: 100,
				tickAmount: 5, // Уменьшено количество делений
				labels: {
					style: {
						colors: '#000',
						fontSize: '12px', // Уменьшен размер шрифта
						fontFamily: 'inherit',
						fontWeight: 400,
					},
					formatter: function (val) {
						return val.toFixed(0)
					},
				},
			},
			grid: {
				show: true,
				borderColor: '#EEEEEE',
				strokeDashArray: 0,
				xaxis: {
					lines: {
						show: true,
					},
				},
				padding: {
					top: 0,
					right: 10, // Уменьшены отступы
					left: 10,
				},
			},
			fill: {
				opacity: 0.8,
			},
			legend: {
				position: 'bottom', // Перемещено вниз для мобильных
				horizontalAlign: 'center',
				markers: {
					radius: 6,
					width: 20,
					height: 4,
				},
				itemMargin: {
					horizontal: 5,
					vertical: 5, // Добавлен вертикальный отступ
				},
				fontSize: '12px', // Уменьшен размер шрифта
				fontFamily: 'inherit',
				fontWeight: 400,
			},
			responsive: [{ // Добавлена адаптивность
				breakpoint: 768,
				options: {
					legend: {
						position: 'bottom',
					},
					xaxis: {
						labels: {
							rotate: -45,
							rotateAlways: true,
						},
					},
				},
			}],
		},
	}
	return (
		<Card className='w-full'>
			<CardHeader
				floated={false}
				shadow={false}
				color='transparent'
				className='flex flex-col gap-4 rounded-none md:flex-row md:items-center'
			></CardHeader>
			<CardBody className='px-2 md:px-4 pb-0'>
				<Chart {...chartConfig} />
			</CardBody>
		</Card>
	)
}

export const Chart2 = ({ chartData, title, deadlines }) => {
	const chartConfig = {
		type: 'line',
		height: 80, // Уменьшена высота
		series: [
			{
				name: 'Series',
				data: chartData,
			},
		],
		options: {
			chart: {
				toolbar: {
					show: false,
				},
				zoom: {
					enabled: false,
				},
			},
			tooltip: {
				enabled: false,
			},
			title: {
				show: '',
			},
			dataLabels: {
				enabled: false,
			},
			colors: ['#000'],
			stroke: {
				lineCap: 'butt',
				curve: 'straight',
				width: 1,
			},
			markers: {
				size: 2, // Уменьшен размер маркеров
			},
			xaxis: {
				axisTicks: {
					show: false,
				},
				axisBorder: {
					show: true,
				},
				labels: {
					show: false,
				},
				categories: chartData.map((_, index) => index + 1),
			},
			yaxis: {
				show: false,
				min: 0,
				max: 10,
			},
			grid: {
				show: false,
			},
			fill: {
				opacity: 0.8,
			},
			legend: {
				show: false,
			},
		},
	}

	return (
		<Card className='h-full flex flex-col justify-between p-3 md:p-4 bg-transparent'>
			<p className='text-sm md:text-base font-normal text-[#212121]'>{title}</p>
			<CardBody className='p-0'>
				<Chart className='md:-my-5 -my-3' {...chartConfig} />
			</CardBody>
			<p className='text-xs md:text-base font-normal text-[#ccc]'>{deadlines}</p>
		</Card>
	)
}