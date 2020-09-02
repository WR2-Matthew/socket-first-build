import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
// import queryString from 'querystring';
import './Chat.css';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket

function Chat({ location }) {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  let history = useHistory();
  const ENDPOINT = 'localhost:3769';
  socket = io(ENDPOINT);

  useEffect(() => {
    //creating a socket instance

    if (location.state == undefined) {
      history.push('/')
    }
    else {
      setName(location.state.name)
      setRoom(location.state.room)
    }
    // return statement inside useEffect happens on dismounting of the component
    return () => {
      //this targets the event in the backend called 'disconnect'
      socket.emit('disconnect');

      //socket off turns the one instance of the client socket off.
      socket.off();
    }
  }, [location.state, ENDPOINT]);

  console.log(messages, message)

  useEffect(() => {
    if (location.state == undefined) {
      history.push('/')
    }
    else {
      //the event's name is called 'join'. We are sending an object with our name and room to the backend
      // its callback function parameters are coming from index.js socket.on 'join' event's callback function
      socket.emit('join', { name, room }, () => {
        // alert(error)
      });
    }
  }, [room, name]);



  useEffect(() => {
    if (location.state == undefined) {
      history.push('/')
    }
    else {
      socket.on('message', (message) => {
        // console.log(message)
        setMessages([...messages, message])
      })
    }
  }, [messages]);



  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  };


  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      {/* <TextContainer users={users} /> */}
    </div>
  );
};

export default Chat;



