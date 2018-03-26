import React from 'react';
import Icon from './Icon';

export default function Contact() {
  const phone = '2349095522828';
  return (
    <section className="contact">
      <h1>SisíÀdìre</h1>
      <p>
        <span>SisíÀdìre</span> is always ready to give you the spice that brings out the credibility in your image.
        We believe <span>ingenuity</span> comes from embracing the inner-self, our roots, our heritage, our culture.<br />
        SisíÀdìre is a first choice brand, <span>"made in Nigeria"</span> for professionals 
        and fashionistas, who like to feel good and indigenous without breaking the bank. 
        Our designs give you total charge of your image and professional outlook.<br /> 
        You are welcome to <span>call us</span> anyday, anytime for your choice Àdìre wears.
        We design fabrics and items with Adire. <br />
        All items are professionally crafted and available for order. <br />
        Call us on: <a href={`tel:${phone}`}>{phone}</a>
      </p>
      <span>Social Media: </span><div>
        <Icon type="whatsapp" src={`https://api.whatsapp.com/send?phone=${phone}&text=I%20want%20to%20make%20an%20order%20SisíÀdìre`} />
        <Icon type="facebook" src="https://web.facebook.com/Sisiadire_designs-1737221739901322" />
        <Icon type="twitter" />
        <Icon type="instagram" src="https://www.instagram.com/sisiadire_designs/" />
      </div>
    </section>
  )
}