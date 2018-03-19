import React, { Component } from 'react';
import Charts from './Charts';
import Import from './Import';

export default class Category extends Component {
  constructor(props) {
    super(props)
    this.click = this.click.bind(this);
    this.state = {
       
    }
  }
  
  click(ctg){
    let { items, actions, data, actions: {paginate} } = this.props;
    if(typeof ctg === "string"){
      const pool = [];
      for (const x in items) {
        if (items.hasOwnProperty(x) && items[x].ctg === ctg) {
          pool.push(items[x]);
        }
      }
      paginate(<Import name="Shop" items={pool} ctg={ctg} actions={actions} data={data} />);
    }
    else{
      paginate(<Import name="Item" i={ctg} actions={actions} cart={data.cart} data={data} />);
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
                  <Charts title={i.title} ctg={i.ctg} img={i.img} attr="chart" click={() => this.click(i)} tag={i.tag} key={e} />
                ) : null;
              })
            }
          </div>
          <footer>
            <a className="view-all" onClick={() => this.click(i.ctg)}>View All</a>
            <i className="material-icons">chevron_right</i>
          </footer>
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