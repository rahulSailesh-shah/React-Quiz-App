import React from 'react'

const Options = ({options, handleAnswer, showAnswers, correctAnswer}) => {
    const renderClassName = ( answer) => {
        const className = `${showAnswers ? (
            answer === correctAnswer ? 'text-green-500' : 'text-red-500'
        ) : 'text-gray-800'} bg-gray-50  px-6 py-3 rounded-md focus:outline-none hover:bg-gray-100`

        return className
    }

    return (
        <div className='grid grid-cols-2 gap-5 mt-5'>
            {
                options.map((answer) => (
                    <button
                        key={answer}
                        onClick={() => handleAnswer(answer)}
                        className={renderClassName(answer)}
                        dangerouslySetInnerHTML={{__html: answer}}
                    >
                    </button>                
                ))
            }
        </div>
    )
}

export default Options
