import React from 'react';
import './App.css';
import MenuBar from './MenuBar';
import{Divider, Image} from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <div className="app-header">
        <Image src={'/images/app-icon.jpg'} size='small' inline spaced={'right'} />
      </div>
      <Divider hidden />
      <div className="body-container">
      <Divider hidden />
        <MenuBar />
      </div>
    </div>
  );
}

export default App;
