import React from 'react';
import list from './list';
import TypeAhead from './TypeAhead';
import './App.css';

function App() {
  const set = new Array(new Set(list)), _list = [];
  let i = 0;
  set[0].forEach(item => {
    _list.push({id:i, name: item, lowerCase: item.toLowerCase()});
    i++;
  });

  return (
    <div className="App">
      <TypeAhead list={_list} />
      <footer className="App-footer">
        <p>By <a className="App-link" href="http://www.dlamdevelops.com" target="_blank" rel="noopener noreferrer">David Lam</a></p>
      </footer>
    </div>
  )

}

export default App;