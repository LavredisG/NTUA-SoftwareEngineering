import './App.css';
import React from 'react';
import Charges from "./Charges";
// import Identity from "./Identity";



class App extends React.Component
{
  constructor(props)  //props->properties
  {	  
	  super(props);
	  this.state = { user : props.user };
  }
  render()        /*This will return the required html page*/
  {
    // let userName = this .state.user === null ? "<anonymous>" : this.state.user;
    return(
      <>
        <div className="main_title">
          <h1>Welcome to <em>Highway Interoperability System</em></h1>
        </div>
        {/* <Identity /> */}
        <Charges />
        {/* <Stats /> */}
        {/* <ul>
          <li>Choose for amount required to pay/receive</li>
          <li><a target = "_blank" href = "https://9gag.com/">Choose for data and statistics</a></li>
        </ul> */}
        {/* <p>USERNAME: {userName}</p>  */}
      </>
    );
  }
}

export default App;










// ===================================================
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// ==================================================