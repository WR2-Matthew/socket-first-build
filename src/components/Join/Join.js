import React, { useState, useEffect } from 'react';
import './Join.css';
import { Link } from 'react-router-dom';

function Join(props) {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [url, setUrl] = useState(false);

  useEffect(() => {
    if (name && room) {
      setUrl(true)
    }
  }, [name, room])

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input value={name} placeholder="Name" className="joinInput" type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <input value={room} placeholder="Room" className="joinInput mt-20" type="text" onChange={(e) => setRoom(e.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={{ pathname: `/chat`, state: { name, room, url } }} >
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;


// to={{ pathname: `/chat?name=${name}&room=${room}`, state: { name, room } }}
// to={`/chat?name=${name}&room=${room}`}