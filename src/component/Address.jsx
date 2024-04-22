import { Box, Button, Container, TextField, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'

const Address = () => {

    const [formData, setFormData] = useState({})
    const [storedAddress, setStoredAddress] = useState([])
    const address = localStorage.getItem('shippingAddress')

    useEffect(() => {
        if (address) {
            setStoredAddress(JSON.parse(address))
        }
    }, [])

    const handleForm = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = () => {
        setStoredAddress([...storedAddress, formData])
    }

    useEffect(() => {
        localStorage.setItem('shippingAddress', JSON.stringify(storedAddress))
    }, [storedAddress])



    return (
        <>
            <Container>
            <Typography className='text-center mb-5 mt-3s'>Shipping Address</Typography>
                <Box component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField id="address" name='address' label="Address" value={formData.address} onChange={handleForm} variant="outlined" />
                    <TextField id="landsmark" name='landmark' value={formData.landsmark} onChange={handleForm} label="Landsmark" variant="outlined" />
                    <TextField id="city" name='city' value={formData.city} label="City" onChange={handleForm} variant="outlined" />
                    <TextField id="state" name='state' value={formData.state} label="State" onChange={handleForm} variant="outlined" />
                    <TextField id="pincode" name='pincode' value={formData.pincode} label="Pincode" onChange={handleForm} variant="outlined" />
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>

                <div className='row addressContainer' >
                    
                    {
                        storedAddress.length > 0 && storedAddress.map((item, id) => (
                            <div className='col-lg-5 col-md-6 col-sm-12 addressItem' key={id * 3}>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="defaultAddress" id="flexRadioDefault1" />
                                </div>
                                <Typography variant='h5'>{item.address}</Typography>
                                <Typography><span>Landmark-</span>{item.landmark}</Typography>
                                <Typography><span>City-</span>{item.city}</Typography>
                                <Typography><span>State-</span>{item.state} - {item.pincode}</Typography>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </>
    )
}

export default Address