import React from 'react';
import Icon from './Icon';

export default function Contact() {
  return (
    <section className="contact">
      <h1>SisíÀdìre</h1>
      <p>
        SisíÀdìre is always ready to give you the spice that brings out the credibility in your image.<br />
        You are welcome to call us anyday, anytime for your choice Àdìre wears.<br /> <br />
        Call us on: <a href="tel:08082935102">08082935102</a>
      </p>
      <div>
        <Icon type="whatsapp" src="https://api.whatsapp.com/send?phone=08082935102" />
        <Icon type="facebook" />
        <Icon type="twitter" />
        <Icon type="instagram" />
      </div>
    </section>
  )
}