//import React from 'react';
//import logo from './logo.svg';
//import './App.css';
//
//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.tsx</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}
//
//export default App;

import React from 'react';
import logo from './logo.svg';
import {WeaponStore} from './WeaponStore';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <img src={logo} alt="logo" />
      <h1>Hello TypeScript!</h1>
      <p>{WeaponStore.items[0].name}</p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default App;
