import {upcomingMockData, pastMockData, liveMockData} from './models/data/Mock'
import tabData from './constants'

const writeDataToLocalStorage = () => {
    localStorage.setItem("upcomingMockData", JSON.stringify(upcomingMockData));
    localStorage.setItem("pastMockData", JSON.stringify(pastMockData));
    localStorage.setItem("liveMockData", JSON.stringify(liveMockData));
}

const readDataFromLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key));
} 

const saveCampaign = (key, obj) => {
    const objToModify = JSON.parse(localStorage.getItem(tabData[key]));
    objToModify.data.unshift(obj);
    Promise.resolve(localStorage.setItem(tabData[key], JSON.stringify(objToModify)));
}


export {
    writeDataToLocalStorage,
    readDataFromLocalStorage,
    saveCampaign
}