import React, { Component } from 'react';
import './App.css';
import { Grid, AutoSizer, ScrollSync} from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';

function handleScrollEvent({scrollLeft, scrollTop}) {
  console.log(scrollLeft, scrollTop);
}

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      columnWidth: 75,
      columnCount: 25,
      height: 300,
      overscanColumnCount: 25,
      overscanRowCount: 0,
      rowHeight: 42,
      rowCount: 150,
    };

    this._renderBodyCell = this._renderBodyCell.bind(this);
    this._renderHeaderCell = this._renderHeaderCell.bind(this);
    this._renderLeftSideCell = this._renderLeftSideCell.bind(this);
  }

  render() {
    const {
      columnCount,
      columnWidth,
      height,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
    } = this.state;

    return (
      <div className="App">
        <ScrollSync>
          {({
            clientHeight,
            clientWidth,
            onScroll,
            scrollHeight,
            scrollLeft,
            scrollTop,
            scrollWidth,
          }) => {
            return (
              <div className={'GridRow'}>
                <div
                  className={'LeftSideGridContainer'}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                  }}>
                  <Grid
                    cellRenderer={this._renderLeftHeaderCell}
                    className={'HeaderGrid'}
                    width={columnWidth}
                    height={rowHeight}
                    rowHeight={rowHeight}
                    columnWidth={columnWidth}
                    rowCount={1}
                    columnCount={1}
                  />
                </div>
                <div
                  className={'LeftSideGridContainer'}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: rowHeight,
                  }}>
                  <Grid
                    overscanColumnCount={overscanColumnCount}
                    overscanRowCount={overscanRowCount}
                    cellRenderer={this._renderLeftSideCell}
                    columnWidth={columnWidth}
                    columnCount={1}
                    className={'LeftSideGrid'}
                    height={height - scrollbarSize()}
                    rowHeight={rowHeight}
                    rowCount={rowCount}
                    scrollTop={scrollTop}
                    width={columnWidth}
                    />
                </div>
                <div className={'GridColumn'}>
                  <AutoSizer disableHeight>
                    {({width}) => (
                      <div>
                        <div
                          style={{
                            height: rowHeight,
                            width: width - scrollbarSize(),
                          }}>
                          <Grid
                            className={'HeaderGrid'}
                            columnWidth={columnWidth}
                            columnCount={columnCount}
                            height={rowHeight}
                            overscanColumnCount={overscanColumnCount}
                            cellRenderer={this._renderHeaderCell}
                            rowHeight={rowHeight}
                            rowCount={1}
                            scrollLeft={scrollLeft}
                            width={width - scrollbarSize()}
                            />
                        </div>
                        <div
                          style={{
                            height,
                            width,
                          }}>
                          <Grid
                            handleScrollEvent={handleScrollEvent}
                            className={'BodyGrid'}
                            columnWidth={columnWidth}
                            columnCount={columnCount}
                            height={height}
                            onScroll={onScroll}
                            overscanColumnCount={overscanColumnCount}
                            overscanRowCount={overscanRowCount}
                            cellRenderer={this._renderBodyCell}
                            rowHeight={rowHeight}
                            rowCount={rowCount}
                            width={width}
                          />
                        </div>
                      </div>
                    )}
                  </AutoSizer>
                </div>
              </div>
            );
          }}
        </ScrollSync>
      </div>
    );
  }

  _renderBodyCell({columnIndex, key, rowIndex, style, isScrolling}) {
    if (columnIndex < 1) {
      return;
    }

    return this._renderLeftSideCell({columnIndex, key, rowIndex, style, isScrolling});
  }

  _renderHeaderCell({columnIndex, key, rowIndex, style, isScrolling}) {
    console.log('rendering left header cell', isScrolling)
    if (columnIndex < 1) {
      return;
    }

    return this._renderLeftHeaderCell({columnIndex, key, rowIndex, style});
  }

  _renderLeftHeaderCell({columnIndex, key, style}) {
    return (
      <div key={key} style={style}>
        {`C${columnIndex}`}
      </div>
    );
  }

  _renderLeftSideCell({columnIndex, key, rowIndex, style, isScrolling}) {
    const rowClass =
      rowIndex % 2 === 0
        ? columnIndex % 2 === 0 ? 'evenRow' : 'oddRow'
        : columnIndex % 2 !== 0 ? 'evenRow' : 'oddRow';
    const classNames = rowClass;

    return (
      <div className={classNames} key={key} style={style}>
        {isScrolling ?
          'light' :
          `R${rowIndex}, C${columnIndex}`}
      </div>
    );
  }
}

export default App;
