import React from 'react';
export default ({ type, id, src = "#" }) => {
  let icon = "";
  switch (type) {
    case 'facebook':
      icon = "fa fa-facebook-square"
      break;
    case 'twitter':
      icon = "fa fa-twitter-square"
      break;
    case 'instagram':
      icon = "fa fa-instagram"
      break;  
    case 'phone':
      icon = "fa fa-phone-square"
      break;  
    case 'whatsapp':
      icon = "fa fa-whatsapp"
      break;  
    default:
      icon = "fa fa-check"
    break;
  }
  return (
    <main>
      <a href={src}>
        <i className={icon} />
      </a>
    </main>
  )
}
