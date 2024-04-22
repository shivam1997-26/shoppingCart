import React, { useEffect, useState } from 'react'
import { BsCart } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import { addCartItem } from '../redux/actions'
import { getRequest } from '../util/httpsRequest'
import SimilarProduct from './SimilarProduct'


const ProductDetails = () => {
    const { id, category } = useParams()
    const [prodDetails, setProdDetails] = useState({})
    const [similarProduct, setSimilarProduct] = useState([])
    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.cart.items)

    useEffect(() => {
        getRequest(`https://fakestoreapi.com/products/${id}`).then((data) => {
            setProdDetails(data.data)
        })
    }, [id, category])


    useEffect(() => {
        getRequest(`https://fakestoreapi.com/products`).then((data) => {
            const similar = data.data.filter((item) => {
                if (item.id != id && item.category == category) return item
            })
            setSimilarProduct(similar)
        })
    }, [id, category])

    const handleAddToCart = () => {
        const item = { ...prodDetails, quantity: 1 };


        dispatch(addCartItem(item));
    };
    return (
        <>
            <div className='row'>

                <div className='col-12 text-center mb-5 mt-5 fs-4 fw-bold'>Product Details

                    <div className='cartIcon1 mt-4 mb-2'>
                        <Link to='/showcart'>
                            <BsCart size={30} color='black' />
                            <span className='cartCount1'>{cartItem.length}</span>
                        </Link>
                    </div>

                    <hr className="horizontal-line" />



                </div>

                <div className='col-md-6 col-sm-12 text-center'>
                    <img src={prodDetails.image} alt='prodImag' height='400px' width='400px' />
                </div>
                <div className='col-md-6 col-sm-12 ps-5 pe-5'>

                    <h2>{prodDetails.title}</h2>
                    <span className='fs-6 fw-bold'>Category</span> : <span className='text-secondary'>{prodDetails.category}</span>


                    <div className='mt-4'>
                        <h3>₹  <span>{prodDetails.price}</span></h3>
                    </div>

                    <div className='ratingContainer'>
                        <span className='me-1 text-secondary fs-5'> {prodDetails?.rating?.rate} </span>
                        <StarRatings
                            rating={prodDetails?.rating?.rate}
                            starRatedColor="gold"
                            numberOfStars={5}
                            name='rating'
                            starDimension="20px"
                            starSpacing="2px"
                        />
                        <span className='fs-6 mt-1 ms-3' style={{ color: '#a6a6b1', fontSize: '16px' }}>{prodDetails?.rating?.count} ratings</span>
                    </div>

                    <div className='mt-4'>
                        <Link to='/' className='btn btn-md btn-light me-4 continueShoppingbtn'>Continue Shopping</Link>
                        <button className='btn btn-md btn-dark' onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                    <div>
                        <h6 className='mt-5' style={{ color: '#a6a6b1', fontSize: '15px', lineHeight: 1.7 }}>{prodDetails.description}</h6>
                    </div>
                </div>

                <div className='col-12 text-center mb-4 mt-4 fs-4 fw-bold'>Similar Product
                    <hr className="horizontal-line" />
                    <SimilarProduct similarProduct={similarProduct} />
                </div>
            </div>
        </>
    )
}

export default ProductDetails