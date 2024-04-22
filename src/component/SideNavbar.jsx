import React, { useEffect, useState } from 'react';
import { BsCart } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRequest } from '../util/httpsRequest';


const SideNavbar = (props) => {
    const [category, setCategory] = useState([])
    const [activeCategory, setActiveCategory] = useState('all');
    const { handleCategory } = props
    useEffect(() => {
        getRequest(`https://fakestoreapi.com/products/categories`).then((data) => {
            setCategory(data.data)
        })
    }, [])

    const cartItem = useSelector(state => state.cart.items)

    const handleSideNavItemClick = (item) => {
        handleCategory(item);
        setActiveCategory(item);
    };
    return (
        <div className='mainMenuContainer'>
            <div className='logoContainer'>
                <h2 className='logo'>Shopcart</h2>
            </div>
            <div className='menuItemContainer'>

                <div className={`sideNavItem ${activeCategory === 'all' && 'active'}`} onClick={() => handleSideNavItemClick('all')}>All</div>
                {
                    category.map((item) => (
                        <div className={`sideNavItem ${activeCategory === item && 'active'}`} onClick={() => handleSideNavItemClick(item)} key={item}>{item}</div>
                    ))
                }
            </div>
            <div className='cartContainer'>
                <Link to='/showcart'>
                    <div className='cartIcon'>
                        <BsCart size={30} color='black' />
                        <span className='cartCount'>{cartItem.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default SideNavbar