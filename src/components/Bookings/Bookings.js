import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const[loggedInUser, setLoggedInUser] = useContext(UserContext)
    useEffect(() =>{
        fetch('http://localhost:5000/bookings?email=' + loggedInUser.email,{
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
    },[])
    return (
        <div>
            <h3> You have bookings {bookings.length}</h3>
            {
                bookings.map(book => <li>{book.name}-- from :{(new Date(book.checkInDate).toDateString('dd/MM/YYYY'))} --to ---{(new Date(book.checkOutDate).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;