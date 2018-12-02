import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import SyncTables from './SyncTables';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeRowIndex: null
    };
  }

  onLeftGridClick = e => {
    const { rowIndex } = e.target.dataset;
    this.setState({
      activeRowIndex: parseInt(rowIndex),
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          background: 'white',
          zIndex: 50,
        }}
      >
        <div style={{ textAlign: 'center' }}>Header</div>
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexBasis: 120,
            }}
          >
            Sidebar
          </div>
          <div style={{ flex: '1 1 auto' }}>
            <AutoSizer>
              {({ width, height }) => (
                <div
                  style={{
                    display: 'relative',
                    width,
                    height,
                    backgroundColor: 'coral',
                    color: 'rgba(255,255,255,0.9)',
                  }}
                  onClick={this.onLeftGridClick}
                >
                  <SyncTables
                    width={width}
                    height={height}
                    activeRowIndex={this.state.activeRowIndex}
                  />
                </div>
              )}
            </AutoSizer>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexBasis: 120,
            }}
          >
            Sidebar
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>Footer</div>
      </div>
    )
  }
}
