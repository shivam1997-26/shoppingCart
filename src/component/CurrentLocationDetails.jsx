import React, { useEffect, useState } from 'react';

const CurrentLocationDetails = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                        try {
                            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=YOUR_API_KEY`);
                            if (!response.ok) {
                                throw new Error('Failed to fetch address details.');
                            }
                            const data = await response.json();
                            const addressComponents = data.results[0].address_components;
                            const formattedAddress = data.results[0].formatted_address;
                            const city = addressComponents.find(component => component.types.includes('locality')).long_name;
                            const state = addressComponents.find(component => component.types.includes('administrative_area_level_1')).long_name;
                            const pincode = addressComponents.find(component => component.types.includes('postal_code')).long_name;
                            setAddress(formattedAddress);
                            setCity(city);
                            setState(state);
                            setPincode(pincode);
                        } catch (error) {
                            setError(error.message);
                        }
                    },
                    (error) => {
                        setError(error.message);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        };

        getLocation();
    }, []);

    return (
        <div>
            <p>Address: {address}</p>
            <p>City: {city}</p>
            <p>State: {state}</p>
            <p>Pincode: {pincode}</p>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default CurrentLocationDetails;
