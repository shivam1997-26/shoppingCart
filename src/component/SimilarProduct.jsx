import React from 'react'
import { Link } from 'react-router-dom'

const SimilarProduct = ({similarProduct}) => {

 
    return (
       <div className='container similarProduct'>
        {
            similarProduct?.map((item,id) => (
                <div className='mb-4 me-4 itemContainer' key={id*4}>
                    <div className='card border-0 itemCard'>

                        <div className='card-body border-2 text-center'>
                            <img src={item.image} height='100px' width='50%' alt='logo' />
                            <h6 className='mt-5'>{item.title.slice(0, 25)}</h6>
                            <div> <h6>Rs. {item.price}</h6></div>
                            <Link to={`/product/${item.category}/${item.id}`} className='btn btn-md btn-dark text-light mt-4 ' >View Details</Link>
                        </div>
                    </div>
                </div>
            ))
        }
       </div>
    )
}

export default SimilarProduct