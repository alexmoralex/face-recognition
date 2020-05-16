import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return(
    <nav style={{display: 'flex', justifyContent: 'space-between'}}>
      <h1 className="ml4">FACE RECOGNITION APP</h1>
      <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pointer mr4"> Sign Out</p>
    </nav>);
  } else {
    return(
    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pointer mr2"> Sign In</p>
      <p onClick={() => onRouteChange('register')} className="f3 link dim black underline pointer mr4"> Register</p>
    </nav>);
  }    
}

export default Navigation;