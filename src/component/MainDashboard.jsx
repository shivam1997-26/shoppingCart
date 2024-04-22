import React, { useCallback, useEffect, useState } from 'react'
import { getRequest } from '../util/httpsRequest'
import ItemCard from './ItemCard'
import SideNavbar from './SideNavbar'

const MainDashboard = () => {

    const [cateProd, setCateProd] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')

    const handleCategory = useCallback((data) => {
        setSelectedCategory(data)
    }, [selectedCategory])

    useEffect(() => {
        if (selectedCategory == 'all') {
            getRequest(`https://fakestoreapi.com/products`).then((data) => {
                setCateProd(data.data)
            })
        } else {
            getRequest(`https://fakestoreapi.com/products/category/${selectedCategory}`).then((data) => {
                setCateProd(data.data)
            })
        }
    }, [selectedCategory])


    return (
        <div className='container'>
            <div className='navMenu'>
                <SideNavbar handleCategory={handleCategory} />
            </div>

            <div className='mainItemContainer'>
                <ItemCard cateProd={cateProd} />
            </div>

        </div>
    )
}

export default MainDashboard