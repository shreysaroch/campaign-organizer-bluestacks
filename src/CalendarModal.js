import React from 'react'
import {Modal, Image, Header, Grid, Button} from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarModal = (props) => {
    return (
        <Modal open={props.showModal} onClose={props.handleClose} size={'tiny'}>
            <Modal.Header>Select the date</Modal.Header>
            <Modal.Content>
            <DatePicker
                autoFocus={true}
                selected={props.startDate}
                onChange={props.handleDateChange}
            />
            </Modal.Content>
        </Modal>
    )
}

export default CalendarModal;