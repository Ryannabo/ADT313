import logo from './logo.svg';
import './App.css';
import UserInformation from './components/UserInformation/UserInformation';
import Name from './components/Name/Name';
import Section from './components/Section/Section';
import Description from './components/Description/Description';
import { useState } from 'react';

function App() {
  const [userInformation, setUserInformation] = useState({
    firstName: "Kim Ryan",
    middleInitial: "R.",
    lastName: "Nabo",
    section: "BSCS3A",
    description: "cuteness overload!"
  });

  function updateName() {
    userInformation.firstName = "Ryan";
    setUserInformation({ ...userInformation });
  }

  return (
    <div className="App">
      <Name 
      firstName={userInformation.firstName} 
      middleName={userInformation.middleInitial} 
      lastName={userInformation.lastName}
      />

      <Section 
      section={userInformation.section}
      />

      <Description 
      description={userInformation.description}
      />

      <button type='button' >Move Me!</button>
      <div className='moon'>
      </div>
      

      <button type='button' onClick={updateName}>
        Update Me
      </button>

    </div>
  );
}

export default App;
