import React from 'react'

const Question = ({question}) => {
    return (
        <div dangerouslySetInnerHTML={{__html: question}}  className='bg-gray-700 px-14 py-8 text-xl rounded-md shadow-md text-center text-gray-50'>
        </div>
    )
}

export default Question
