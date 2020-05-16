import React from 'react';

const Profile = ({ name, entries, joined, showProfile, displayProfile }) => {
  let date = new Date(joined);
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let day = date.getDate();
  let display, sign;

  if (showProfile){
    display = 'block';
    sign = '-';
  } else {
    display = 'none';
    sign = '+';
  }

  return(
    <div>
      <label className="mr2">PROFILE</label>
      <button onClick={displayProfile} className="link white bg-gray ml2">{sign}</button>
      <div className="black f4 ma2" style={{display}}>
        <p>{name},</p>
        <p>You joined {month}/{day}/{year}</p>
        <p>Your current entry count is {entries}</p>
      </div>
    </div>
  );
}

export default Profile;