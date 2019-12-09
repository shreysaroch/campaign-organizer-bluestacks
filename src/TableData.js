import React, {Component} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { Table, Image, Header } from 'semantic-ui-react'
import CalendarModal from './CalendarModal'
import PriceModal from './PriceModal'
import { saveCampaign } from './helpers'

const moment = require('moment');

class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {
          openPricingModal: false,
          currentModalData: {}
        }
    }

    handleClickOnViewPricing = (item) => {
      this.setState({
        openPricingModal: true,
        currentModalData: item
      })
    }

    closeModal = () => {
      this.setState({
        openPricingModal: false,
        showCalendarModal: false
      })
    }

    handleCalenderClick = (item) => {
      this.setState({
        currentSelected: item,
        showCalendarModal: true,
      })
    }
    
    handleDateChange = date => {
      this.setState({
        startDate: date,
        showCalendarModal: false
      });
      const selectedDate = new Date(date);
      const selectedDateInMillis = selectedDate.getTime();
      let objToModify = this.state.currentSelected;
      objToModify.createdOn = selectedDateInMillis;
      // save the date to local storage
      this.props.saveData(this.props.activeTab, objToModify)
    };

    render() {
       const {openPricingModal, currentModalData, showCalendarModal} = this.state;
       const {locale} = this.props;
        return (
          <>
            <Table singleLine>
            <Table.Header>
              <Table.Row>
        <Table.HeaderCell>{locale.date}</Table.HeaderCell>
                <Table.HeaderCell>{locale.campaign}</Table.HeaderCell>
                <Table.HeaderCell>{locale.view}</Table.HeaderCell>
                <Table.HeaderCell>{locale.actions}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
                {
                this.props.currentTabData.data.map(item => {
                    return (
                        <Table.Row key={item.name+Math.random()}>
                            <Table.Cell>
                            <Moment format="MMM YYYY, DD">{item.createdOn}</Moment>
                            <div>
                            <Moment fromNow>{item.createdOn}</Moment>
                            </div>
                            </Table.Cell>
                            <Table.Cell>
                            <Header as='h4' image>
                              <Image src={item.thumbnail} rounded size='mini' />
                              <Header.Content>
                                {item.name}
                                <Header.Subheader>{item.region}</Header.Subheader>
                              </Header.Content>
                            </Header>
                              </Table.Cell>
                            <Table.Cell onClick={() => this.handleClickOnViewPricing(item)}>
                              <span>
                                <Image src={'/images/price.png'} size='mini' inline spaced={'right'} /><span className={'App-link'}>View Pricing</span>
                              </span>
                            </Table.Cell>
                            <Table.Cell>
                            <span className={'inline-item'}>
                                <a href={'https://shreysaroch-prod-assets.s3.ap-south-1.amazonaws.com/Bluestacks+Game+data.xlsx'} target={'_blank'}>
                                <Image src={'/images/file.png'} size='mini' inline spaced={'right'} /><span className={'App-link'}>CSV</span>
                                </a>
                            </span>
                              <span className={'inline-item'}>
                                  <a href={'https://shreysaroch-prod-assets.s3.ap-south-1.amazonaws.com/Bluestacks+Game+data.xlsx'} target={'_blank'}>
                                <Image src={'/images/statistics.png'} size='mini' inline spaced={'right'}/><span className={'App-link'}>Report</span>
                                  </a>
                              </span>
                              <span className={'inline-item'} onClick={() => this.handleCalenderClick(item)}>
                                <Image src={'/images/calendar.png'} size='mini' inline spaced={'right'} /><span className={'App-link'}>Schedule Again</span>
                              </span>
                              </Table.Cell>
                        </Table.Row>
                    )
                })
            }
            </Table.Body>
          </Table>
          <PriceModal showModal={openPricingModal} handleClose = {this.closeModal} data={currentModalData} />
          <CalendarModal showModal={showCalendarModal} handleClose = {this.closeModal} handleDateChange={this.handleDateChange} />

    </>
        )
    }

}

export default TableData;