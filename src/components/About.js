import React from 'react';
import Frames from './Frames';

export default function About() {
  const x = {
    title: "Sisí Àdìre is...",
    figures: [{
      title: "camera",
      phrase: "FASHIONABLE",
    },{
      phrase: "PROFESSIONAL",
      title: "person_add"
    },{
      title: "access_alarm",
      phrase: "TIMELY",
    },{
      title: "star_border",
      phrase: "AMAZING",
    }]
  }
  
  return (
    <section className="about">
      <h1>{x.title}</h1>
      <Frames x={x} attr="about-frame" />
    </section>
  )
}
