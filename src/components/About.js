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
  
  const y = {
    title: "The Designs are",
    figures: [{
      icon: "fa fa-check-square",
      phrase: "CLASSY",
    },{
      icon: "fa fa-check-square",
      phrase: "FITTING",
    }, {
      icon: "fa fa-check-square",
      phrase: "AWESOME",
    }, {
      icon: "fa fa-check-square",
      phrase: "STYLISH",
    }]
  }

  return (
    <section className="about">
      <Frames x={x} attr="about-frame" />
      <Frames x={y} attr="about-frame" />
    </section>
  )
}
