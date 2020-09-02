import React from 'react';
import './InfoBar.css';
import onlineIcon from './online.png';
import closeIcon from './leave.png';

const InfoBar = () => {

  return (
    <div className='infoBar'>

      <div className='leftInnerContainer'>
        <img className='onlineIcon' src={onlineIcon} alt='online' />
        <h3>roomName</h3>
      </div>

      <div className='rightInnerContainer'>
        <a href='/'><img className='onlineIcon' src={closeIcon} alt='close' /></a>
      </div>

    </div>
  )
};

export default InfoBar;