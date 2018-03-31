import React, { Component } from 'react';
import Charts from './Charts';
import Import from './Import';

export default class Category extends Component {
  constructor(props) {
    super(props)
    this.click = this.click.bind(this);
  }
  
  click(ctg){
    let { items, actions, data, actions: {paginate} } = this.props;
    if(typeof ctg === "string"){
      const pool = [];
      for (const x in items) {
        if (items.hasOwnProperty(x) && items[x].category === ctg) {
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
      if (check.indexOf(i.category) > -1) return null;
      else check.push(i.category);
      return (
        <main key={o}>
          <h2>{i.category}</h2>
          <div>
            {
              u.map((a, e) => {
                return a.category === i.category ? (
                  <Charts title={i.title} ctg={i.category} img={i.picture_file} attr="chart" click={() => this.click(i)} tag={i.tag} key={e} />
                ) : null;
              })
            }
          </div>
          <footer>
            <a className="view-all" onClick={() => this.click(i.category)}>View All</a>
            <i className="material-icons">chevron_left</i>
          </footer>
        </main>
      )
    });
  }

  render() {
    if (this.props.items.length === 0) return null;
    return (
      <section className="category">
        <h1>Àdìre Store</h1>
        { this.charts() }
      </section>
    )
  }
}