import React, { Fragment, Component } from 'react';
import Figure from './Figure';
import OverButton from './OverButton';

export default class MenuTab extends Component {
  constructor(props) {
    super(props)
    this.tabs = this.tabs.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, i){
    const { clientX: x, clientY: y } = e.nativeEvent;
    this.props.showBall({ x, y, ...i });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  

  tabs(){
    return this.props.slabs.map((i, o) => {
      const caption = (
        <Fragment>
          <h5>{i.title}</h5>
          <h5>By: <span>{i.author}</span></h5>
          <footer>{i.time} ago</footer>
        </Fragment>
      );
      return <Figure attr="menutab" img={i.image} alt="Blog photo" caption={caption} click={e => this.handleClick(e, i)} key={o} />
    })
  }

  render() {
    const slabs = this.props.slabs && this.props.slabs.length;
    return (
      <div className="menutab">
        <header className="menutab"><h4>Blog</h4></header>
        <main className={`menutab ${slabs < 1 && 'empty'}`}>{slabs > 0 ? this.tabs() : <OverButton icon="speaker_notes" />}</main>
      </div>
    )
  }
}