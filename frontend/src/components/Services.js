import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const result = await axios.get('http://localhost:5001/api/services');
            setServices(result.data);
        };
        fetchServices();
    }, []);

    return (
        <div>
            <h2>Services</h2>
            <ul>
                {services.map(service => (
                    <li key={service._id}>
                        <h3>{service.name}</h3>
                        <p>{service.address}</p>
                        <p>{service.description}</p>
                        <p>Contact: {service.contact}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Services;
