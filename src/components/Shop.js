import React, { Component, Fragment } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Charts from '../components/Charts';
import Import from './Import';

export default class Shop extends Component {
  constructor(props) {
    super(props)
    this.clicke = this.clicke.bind(this);
    this.showOne = this.showOne.bind(this);
    this.showAll = this.showAll.bind(this);
    this.state = {
      view: this.showAll(),
      title: "Àdìre Store"
    }
  }

  componentDidMount () {
    document.getElementsByTagName('html')[0].scrollIntoView();
  }

  clicke(i){
    const { actions, actions: { paginate } } = this.props;
    paginate(<Import name="Item" i={i} actions={actions} />);
  }

  showOne(i, o){
    return(
      <div key={o}>
        <Charts title={i.title} ctg={i.ctg} img={i.img} i={i} click={() => this.clicke(i)} attr="chart" tag={i.price} />
      </div>
    )
  }

  showAll(){
    const { items } = this.props;
    if(items){
      return items.map((i, o) => this.showOne(i, o));
    }
    else{
      return null;
    }
  }

  render() {
    return (
      <Fragment>
        <Nav type={false} click={this.props.actions.back} />
        <section className="shop">
          <h1>{this.props.ctg}</h1>
          <main>
            { this.state.view }
          </main>
        </section>    
        <Footer />
      </Fragment>
    )
  }
}