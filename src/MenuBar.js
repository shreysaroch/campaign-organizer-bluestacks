import React, {Component} from 'react';
import { Menu, Segment, Header, Dropdown } from 'semantic-ui-react'
import TableData from './TableData';
import {upcomingMockData} from './models/data/Mock'
import strings from './models/languageData/locales'
import {writeDataToLocalStorage, readDataFromLocalStorage, saveCampaign} from './helpers'
import tabDatamap from './constants'


   const options = [
    {
      key: 'en',
      text: 'English',
      value: 'en',
      content: 'English',
    },
    {
      key: 'it',
      text: 'Italian',
      value: 'it',
      content: 'Italian',
    },
  ]

class MenuBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: strings.UPCOMING,
            startDate: new Date()
        }
    }

    componentDidMount() {
      // cache the data in localStorage
      writeDataToLocalStorage();
      this.setState({
        currentTabData: readDataFromLocalStorage('upcomingMockData')
      })
    }

    handleItemClick = (e, { name }) => {
        let dataToDisplay;
        if(name === strings.UPCOMING) {
            dataToDisplay = readDataFromLocalStorage('upcomingMockData');
        } else if(name === strings.LIVE) {
            dataToDisplay = readDataFromLocalStorage('liveMockData');
        } else {
            dataToDisplay = readDataFromLocalStorage('pastMockData');
        }

        this.setState({ 
            activeItem: name,
            currentTabData: dataToDisplay
         })
    } 

    saveData = (activeTab, obj) => {
      this.setState({
        loading: true
      });

      saveCampaign(activeTab, obj);

      setTimeout(() => {
        this.setState({
          currentTabData: readDataFromLocalStorage(tabDatamap[activeTab]),
          loading: false
        });
      }, 1000)
        
    }

    handleChange = (e, { value }) => {
       this.changeLocale(value)
    }

    changeLocale = (lang) => {
        strings.setLanguage(lang);
        this.setState({
            activeItem: strings.UPCOMING,
        });
    }

    render() {
        const {activeItem, loading} = this.state;
        return (<>
        <div>
        <Header as={'h1'}>{strings.HEADING}</Header>
        <Dropdown
            className={'lang-selection-dropdown'}
            inline
            onChange={this.handleChange}
            header='Choose Language'
            options={options}
            defaultValue={options[0].value}
      />
        </div>
    <div>
        <Menu pointing secondary>
          <Menu.Item
            name={strings.UPCOMING}
            active={activeItem === strings.UPCOMING}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name={strings.LIVE}
            active={activeItem === strings.LIVE}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name={strings.PAST}
            active={activeItem === strings.PAST}
            onClick={this.handleItemClick}
          />
        </Menu>

        <Segment basic raised loading={loading}>
          { this.state.currentTabData &&
            <TableData currentTabData={this.state.currentTabData}
            locale={strings}
            activeTab={activeItem}
            saveData={this.saveData}
            />
          }
         
        </Segment>
    </div>
</>
        )
    }

}

export default MenuBar;