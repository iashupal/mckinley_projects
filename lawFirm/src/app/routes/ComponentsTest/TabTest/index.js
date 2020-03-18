import React, { Component } from 'react';
import Tab from 'components/Tab';

class TabTest extends Component {
  state = {
    tab: '',
  };

  changeTab = tab => {
    this.setState({
      tab,
    });
  };

  render() {
    const { tab } = this.state;
    return (
      <div style={{ textAlign: 'left' }}>
        <Tab text="A" onClick={() => this.changeTab(0)} selected={tab === 0} />
        <Tab text="B" onClick={() => this.changeTab(1)} selected={tab === 1} />
        <Tab text="C" onClick={() => this.changeTab(2)} selected={tab === 2} />
        <Tab text="D" onClick={() => this.changeTab(3)} selected={tab === 3} />
        <Tab text="E" onClick={() => this.changeTab(4)} selected={tab === 4} />
        <Tab text="F" onClick={() => this.changeTab(5)} selected={tab === 5} />
        <Tab text="G" onClick={() => this.changeTab(6)} selected={tab === 6} />
        <Tab text="H" onClick={() => this.changeTab(7)} selected={tab === 7} />
        <Tab text="I" onClick={() => this.changeTab(8)} selected={tab === 8} />
        <Tab text="J" onClick={() => this.changeTab(9)} selected={tab === 9} />
        <Tab text="K" onClick={() => this.changeTab(10)} selected={tab === 10} />
        <Tab text="L" onClick={() => this.changeTab(11)} selected={tab === 11} />
        <Tab text="L" onClick={() => this.changeTab(12)} selected={tab === 12} />
        <Tab text="L" onClick={() => this.changeTab(13)} selected={tab === 13} />
        <Tab text="L" onClick={() => this.changeTab(14)} selected={tab === 14} />
        <Tab text="L" onClick={() => this.changeTab(15)} selected={tab === 15} />
        <Tab text="L" onClick={() => this.changeTab(16)} selected={tab === 16} />
        <Tab text="L" onClick={() => this.changeTab(17)} selected={tab === 17} />
        <Tab text="L" onClick={() => this.changeTab(18)} selected={tab === 18} />
        <Tab text="L" onClick={() => this.changeTab(19)} selected={tab === 19} />
        <Tab text="L" onClick={() => this.changeTab(20)} selected={tab === 20} />
        <Tab text="L" onClick={() => this.changeTab(21)} selected={tab === 21} />
      </div>
    );
  }
}

export default TabTest;
