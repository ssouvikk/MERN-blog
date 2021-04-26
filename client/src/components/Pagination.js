import React from 'react'

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav className="m-4" >
            <ul className="pagination">
                {pageNumbers.map(num => (
                    <li key={num} className="page-item">
                        <button onClick={() => paginate(num)} className="page-link">
                            {num}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
