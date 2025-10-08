import { AlignRight, ChartColumn } from 'lucide-react'
import { useState, useParams, useEffect } from 'react'
import { getVotingResults } from '../../services/api'
// import { Button, GrayButton } from '../../../components/Buttons'

const ResultsBlock= ({ title, description, children, buttons = true, results }) => {
  const [resultStyle, setResultStyle] = useState('list')

	return (
		<div className='bg-white shadow-sm rounded-[20px] p-6'>
			<p className='text-base font-bold'>{title}</p>
			<div className='flex justify-between mb-4'>
				<p className='text-base font-normal text-[#ccc]'>{description}</p>
				{buttons && (
					<div className='flex items-center gap-3'>
						<ChartColumn
							color={resultStyle === 'chart' ? 'white' : '#212121'}
							className={`p-2 rounded-lg w-[36px] h-[36px] cursor-pointer ${resultStyle === 'chart' ? 'bg-[#212121]' : 'bg-[#f4f4f4]'}`}
              onClick={() => setResultStyle('chart')}
						/>
						<AlignRight
							color={resultStyle === 'list' ? 'white' : '#212121'}
							className={ `p-2 rounded-lg w-[36px] h-[36px] cursor-pointer ${resultStyle === 'list' ? 'bg-[#212121]' : 'bg-[#f4f4f4]'}`}
              onClick={() => setResultStyle('list')}
						/>
					</div>
				)}
			</div>
			{children}
      		{resultStyle === 'list' ? <ResultsStyle1 results={results} /> : <ResultsStyle3 results={results} />}
		</div>
	)
}

export const ResultsForAdmin = ({ votingId }) => {
	

	const [results, setResults] = useState([]);



	useEffect(() => {
			const fetchData = async () => {
				try {

					// Запрос на результаты
					const results = await getVotingResults(votingId)
					setResults(results)
				} catch (e) {
					console.error("Ошибка при получении данных:", e);
				}
			};
	 
			if (votingId) {
				fetchData();
			}
		}, [votingId]);

	const questions = results?.questions || [];
	return (
		<>
			<div className='flex flex-col gap-3'>
				<div className='bg-white shadow-sm rounded-[20px] p-6'>
					<p className='text-xl font-bold'>Результаты голосования</p>
				</div>
				{questions.map((question, index) => (
                    <ResultsBlock
                        key={question.id} // Важно использовать уникальный ключ
                        title={`№${index + 1} ${question.title}`}
                        description={`Вопрос ${question.type === "single_choice" ? 'одним вариантом ответа' : 'несколькими вариантами ответов'}`}
                        results={question}
                    />
                ))}
 			</div>
 		</>
	)
}

const ResultsStyle1 = ({ results }) => {

	const optionsArray = results.options
	const VotingMass = optionsArray.map(item => ({
        option: item.option,
        result: item.vote_count
    }))
	const AllVotingPoints = optionsArray.reduce((sum, item) => sum + item.vote_count, 0);

	const sortedVotingMass = [...VotingMass].sort((a, b) => a.result - b.result)

	const maxResult = Math.max(...sortedVotingMass.map(item => item.result))

	return (
		<>
			<div className='grid grid-cols-5 gap-2'>
				<div className='col-span-3'>
					<p className='text-start text-[#ccc] text-base'>Вариант ответа</p>
					<div className='flex flex-col-reverse gap-2'>
						{sortedVotingMass.map((item, index) => (
							<div
								key={index}
								className='flex items-center p-3 rounded-lg bg-[#D2F0FF]'
							>
								<p className='text-start font-medium text-[#2E4550]'>
									{item.option}
								</p>
							</div>
						))}
					</div>
				</div>
				<div className='col-span-2 gap-2'>
					<p className='text-start text-[#ccc] text-base'>Результат</p>
					<div className='flex flex-col-reverse gap-2'>
						{sortedVotingMass.map((item, index) => {
							const percentage = (item.result / AllVotingPoints) * 100
							const isMaxResult = item.result === maxResult

							return (
								<div
									key={index}
									className={`overflow-hidden rounded-lg border-1 ${
										isMaxResult ? 'border-[#E6FFDD]' : 'border-[#f4f4f4]'
									} `}
								>
									<div className='relative p-[11px] rounded-lg flex items-center'>
										<div
											className={`absolute top-0 left-0 h-full rounded-lg ${
												isMaxResult ? 'bg-[#E6FFDD]' : 'bg-[#f4f4f4]'
											}`}
											style={{ width: `${percentage}%` }}
										/>
										<div className='relative z-10 w-full'>
											<p className='text-start font-medium text-[#212121]'>
												{item.result}
											</p>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</>
	)
}

export const BeforeResults = () => {
	return (
		<div className="w-full h-auto bg-white rounded-[20px] shadow-lg overflow-hidden p-8 flex items-center justify-center">
                <div className="flex flex-col items-center gap-6 max-w-md text-center">
                  <img className="w-80 h-80 max-w-full" src="/src/assets/images/detaliAndMain/Detali4.svg" alt="Processing" />
                  <div className="text-neutral-800 text-base">
                    Результаты голосования пока в обработке.
                    <br />
                    Посетите раздел позднее
                  </div>
                </div>
    		</div>	
	)
}

const ResultsStyle3 = ({ results }) => {
	const optionsArray = results.options
	const VotingMass = optionsArray.map(item => ({
        option: item.option,
        result: item.vote_count
    }))

	const maxResult = Math.max(...VotingMass.map(item => item.result))
	const AllVotingPoints = maxResult

	return (
		<div className='grid grid-cols-5 gap-2'>
			<div className='col-span-3'>
				<div className='py-6 px-10 flex justify-between h-[313px]  border-1 border-[#f4f4f4] rounded-xl'>
					{VotingMass.map((item, index) => {
						const percentage = (item.result / AllVotingPoints) * 100

						return (
							<div
								key={index}
								className='flex flex-col items-center col-span-1'
							>
								<div className='relative rounded-xl h-full w-22 flex flex-col justify-end overflow-hidden'>
									<div
										className={`w-full rounded-t-xl transition-all duration-500 `}
										style={{
											height: `${percentage}%`,
											backgroundColor: `#EE5B5B`,
										}}
									/>
								</div>
								<div className='text-center w-full flex justify-center'>
									<p className='text-base font-normal text-[#ccc]'>
										{item.option}
									</p>
								</div>
							</div>
						)
					})}
				</div>
			</div>
			<div className='col-span-2 flex flex-col gap-3 justify-center h-full'>
				{VotingMass.map((item, index) => {
					return (
						<p
							key={index}
							className='border-l-3 px-3 py-1'
							style={{
								borderColor: `${item.color}`,
							}}
						>
							{item.option}
						</p>
					)
				})}
			</div>
		</div>
	)
}






