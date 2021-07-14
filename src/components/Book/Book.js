import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] =useState({
      checkInDate : new Date(),
      checkOutDate : new Date()
    });

    const handleCheckInDate = (date) => {
      const newDates = {...selectedDate}
      newDates.checkInDate = date;
      setSelectedDate(newDates);
    };
    const handleCheckOutDate = (date) => {
      const newDates = {...selectedDate}
      newDates.checkOutDate = date;
      setSelectedDate(newDates);
    };
    

    const handleBooking =()=>{
      const newBooking = {...loggedInUser , ...selectedDate};
      fetch('http://localhost:5000/addBookings',{
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body : JSON.stringify(newBooking)
      })
      .then(res => res.json())
      .then(data =>{
        // console.log(data);
      })

    }
    return (
        <div style={{textAlign:'center'}}>
            <h1>Let's book a {bedType} Room.{loggedInUser.name}</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <div style={{textAlign:'center', marginLeft:'30%',}}>

    <MuiPickersUtilsProvider utils={DateFnsUtils} >
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="check In Date"
          value={selectedDate.checkInDate}
          onChange={handleCheckInDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="check Out Date"
          format="dd/MM/yyyy"
          value={selectedDate.checkOutDate}
          onChange={handleCheckOutDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      
      </Grid>
    </MuiPickersUtilsProvider>
    <br />
  
    </div>
    <Button onClick={handleBooking} variant="contained" color="primary">
        Book Now
      </Button>


      <Bookings/>
    </div>

    );
};

export default Book;