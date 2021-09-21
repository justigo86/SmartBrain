import React from 'react'

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f3'>
                {`Way to go, ${name}! This means your entry count is...`}
            </div>
            <div className='white f1'>
                {entries}
            </div>
        </div>
    )
}

export default Rank
