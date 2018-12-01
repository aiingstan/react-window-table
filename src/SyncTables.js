import React from 'react';
import { FixedSizeGrid } from 'react-window';

const columnCount = 25;
const rowCount = 1000;
const columnWidth = 100;
const rowHeight = 42

export default class SyncTables extends React.Component {
  constructor() {
    super();
    this.headerGrid = React.createRef();
    this.leftGrid = React.createRef();
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <FixedSizeGrid
          columnCount={1}
          rowCount={1}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          width={columnWidth}
          height={rowHeight}
          style={{
            overflow: 'hidden',
            backgroundColor: 'lightgray',
            position: 'absolute',
          }}
        >
          {() => (<div>Symbol</div>)}
        </FixedSizeGrid>

        <FixedSizeGrid
          columnCount={1}
          rowCount={rowCount}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          width={columnWidth}
          height={560}
          ref={this.leftGrid}
          style={{
            overflow: 'hidden',
            backgroundColor: 'lightgray',
            position: 'absolute',
            top: rowHeight
          }}
          useIsScrolling={true}
        >
          {({rowIndex, style, isScrolling}) => (<div style={style}>{`${isScrolling?'...':'S'}[${rowIndex}]`}</div>)}
        </FixedSizeGrid>

        <FixedSizeGrid
          columnCount={columnCount}
          rowCount={1}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          height={rowHeight}
          width={600}
          ref={this.headerGrid}
          style={{
            overflow: 'hidden',
            backgroundColor: 'lightgray',
            position: 'absolute',
            left: columnWidth
          }}
        >
          {HeaderCell}
        </FixedSizeGrid>

        <FixedSizeGrid
          columnCount={columnCount}
          rowCount={rowCount}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          height={560}
          width={600}
          // When a scroll occurs in the body grid,
          // synchronize the scroll position of the header grid
          onScroll={({ scrollLeft, scrollTop }) =>
            {
              this.headerGrid.current.scrollTo({ scrollLeft })
              this.leftGrid.current.scrollTo({ scrollTop })
            }

          }
          style={{
            position: 'absolute',
            left: columnWidth,
            top: rowHeight,
          }}
        >
          {BodyCell}
        </FixedSizeGrid>
      </div>
    )
  }
}

const HeaderCell = ({columnIndex, style}) => (
  <div style={style}>
    {`Col-${columnIndex}`}
  </div>
)

const BodyCell = ({columnIndex, rowIndex, style}) => (
  <div style={style}>
    {`(${rowIndex}, ${columnIndex})`}
  </div>
)