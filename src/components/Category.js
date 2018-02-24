import React, { Component } from 'react';
import Charts from './Charts';
import image from "../files/demo.jpg";
import Import from './Import';

export default class Category extends Component {
  constructor(props) {
    super(props)
    this.click = this.click.bind(this);
    this.state = {
       
    }
  }
  
  click(ctg){
    let { items, actions, actions: {paginate}} = this.props;
    if(typeof ctg === "string"){
      const pool = [];
      for (const x in items) {
        if (items.hasOwnProperty(x) && items[x].ctg === ctg) {
          pool.push(items[x]);
        }
      }
      paginate(<Import name="Shop" items={pool} ctg={ctg} actions={actions} />);
    }
    else{
      paginate(<Import name="Item" i={ctg} actions={actions} />);
    }
  }

  charts(){
    const { items } = this.props, check = [];
    return items.map((i, o, u) => {
      if (check.indexOf(i.ctg) > -1) return null;
      else check.push(i.ctg);
      return (
        <main key={o}>
          <h2>{i.ctg}</h2>
          <div>
            {
              u.map((a, e) => {
                return a.ctg === i.ctg ? (
                  <Charts title={i.title} ctg={i.ctg} i={i} img={i.img} attr="chart" click={() => this.click(i)} tag={i.tag} key={e} />
                ) : null;
              })
            }
          </div>
          <a className="view-all" onClick={() => this.click(i.ctg)}>View All</a>
        </main>
      )
    });
  }

  render() {
    return (
      <section className="category">
        <h1>Àdìre Store</h1>
        { this.charts() }
      </section>
    )
  }
}

const desc = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque architecto, tempore quia quaerat facilis quae ullam dolorum.";

Category.defaultProps = {
  items: [
    {
      title: "Aso Ebi",
      ctg: "blouses",
      price: 10000,
      tag: "10K",
      desc,
      img: image
    },
    {
      title: "Iro Pupa",
      ctg: "gowns",
      price: 5000,
      tag: "5K",
      desc,
      img: image
    },
    {
      title: "Fila Ode",
      ctg: "caps",
      price: 7000,
      tag: "7K",
      desc,
      img: image
    },
    {
      title: "Vintage",
      ctg: "male shirts",
      price: 7000,
      tag: "7K",
      desc,
      img: image
    },
    {
      title: "Fila Abete",
      ctg: "caps",
      price: 1000,
      tag: "1K",
      desc,
      img: image
    },
    {
      title: "Ewu Oko",
      ctg: "gowns",
      price: 5000,
      tag: "5K",
      desc,
      img: image
    },
    {
      title: "Aso Opa",
      ctg: "blouses",
      price: 7000,
      tag: "7K",
      desc,
      img: image
    },
    {
      title: "Fila Abete",
      ctg: "caps",
      price: 1000,
      tag: "1K",
      desc,
      img: image
    },
    {
      title: "Ewu Oko",
      ctg: "gowns",
      price: 5000,
      tag: "5K",
      desc,
      img: image
    },
    {
      title: "Aso Opa",
      ctg: "blouses",
      price: 7000,
      tag: "7K",
      desc,
      img: image
    }
  ]
}