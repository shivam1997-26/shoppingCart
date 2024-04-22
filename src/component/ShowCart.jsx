import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decrementCartItem, incrementCartItem, removeCartItem } from '../redux/actions';


const ShowCart = () => {

    const cartItem = useSelector(state => state.cart.items)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (cartItem.length < 1){
    //         navigate('/')
    //     }
    // }, [cartItem])

    const totalPrice = cartItem.reduce((acc, curr) => {
        return acc + (curr.price * curr.quantity)
    }, 0)

    const handleRemoveFromCart = (itemId) => {
        dispatch(removeCartItem(itemId));
    };


    const handleIncrementQuantity = (itemId) => {
        dispatch(incrementCartItem(itemId));
    };

    const handleDecrementQuantity = (itemId) => {
        dispatch(decrementCartItem(itemId));
    };

    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51P7fVJSFcMhM4rjkqXdYEPDUqu5imF3AzTMSn1PC2tnDhDNNdREsEEWmavJ6Yo92Z030hbwPUBlaho1D0ap7P0mJ00QvBUtDgh')

        const body = {
            products: cartItem
        }

        const headers = {
            "Content-Type": "application/json"
        }

        const response = await fetch('http://localhost:7000/api/create-checkout-session', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)

        });

        const session = await response.json()

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error)
        }
    }
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 text-center mt-5'>
                        <h2>Cart Details</h2>

                        <div className='mt-3 mb-3'>
                            <Link to='/' className='btn btn-md btn-light me-4 continueShoppingbtn'>Continue Shopping</Link>
                        </div>
                        <hr className='horizontal-line'></hr>

                    </div>
                    {
                        cartItem.length > 0 && <>
                            <div className='col-12'>
                                <table className="table table-responsive">
                                    <thead>
                                        <tr>
                                            <th scope="col">Image</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartItem.map((item, id) => {

                                                return (

                                                    <tr key={id * 2}>
                                                        <th scope="row"><img src={item.image} alt='productImg' height='60px' width='50px' /></th>
                                                        <td><span style={{ fontSize: '18px' }}>{item.title}</span></td>
                                                        <td><span style={{ fontSize: '18px' }}>&#8377; {item.price}</span></td>
                                                        <td><CiSquarePlus size={40} onClick={() => handleIncrementQuantity(item.id)} /> <span className='fs-5'>{item.quantity}</span> <CiSquareMinus size={40} onClick={() => handleDecrementQuantity(item.id)} /></td>
                                                        <td><FaTrashAlt size={25} color='red' onClick={() => handleRemoveFromCart(item.id)} /></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-12 mt-5'>
                                <div className='totalSummary'>
                                    <h3 className='text-center'>Total</h3>
                                    <h4 className='text-center mt-3 mb-4'>Rs. {totalPrice.toFixed(2)}</h4>
                                    {/* <Link to='/address'>  <button className='btn btn-md btn-dark'>Checkout</button></Link> */}
                                    <button className='btn btn-md btn-dark' onClick={makePayment}>Checkout</button>
                                </div>

                            </div>
                        </>
                    }

                    {
                        cartItem.length < 1 && <>
                            <h5 className='text-center mt-5'>Currently no item available in the cart please clik on continue shopping button for the shopping</h5>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default ShowCart