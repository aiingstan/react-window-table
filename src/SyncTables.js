import React from 'react';
import { FixedSizeGrid, FixedSizeList } from 'react-window';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import _ from 'lodash';
// import { Dropdown, Menu } from 'antd';
// import 'antd/dist/antd.css';
// import SimpleBar from 'simplebar/dist/simplebar';
// import 'simplebar/dist/simplebar.css';

const columnCount = 25;
const rowCount = 200;
const columnWidth = 100;
const rowHeight = 40;

// const menu = (
//   <Menu>
//     <Menu.Item key="0">
//       <a href="http://www.alipay.com/">1st menu item</a>
//     </Menu.Item>
//     <Menu.Item key="1">
//       <a href="http://www.taobao.com/">2nd menu item</a>
//     </Menu.Item>
//     <Menu.Divider />
//     <Menu.Item key="3">3rd menu item</Menu.Item>
//   </Menu>
// );

export default class SyncTables extends React.Component {
  constructor(props) {
    super(props);
    this.headerList = React.createRef();
    this.leftList = React.createRef();
    this.dataGrid = React.createRef();
    this.dataGridOuter = React.createRef();
    this.dataGridInner = React.createRef();
  }

  componentDidMount() {
    const grid = this.dataGridOuter.current;
    // new SimpleBar(this.dataGridOuter.current);
    console.log(grid);
    const el = document.createElement('div');
    // el.style.width = `${columnWidth}px`;
    // el.style.height = '50%';
    // el.style.zIndex = 100;
    // el.style.opacity = 0.3;
    // el.style.background = 'white';
    // el.style.position = 'sticky';
    // el.style.bottom = 0;
    // el.style.left = 0;
    grid.appendChild(el);
    // this.dataGrid.current.style.backgroundColor='red';
    // const dataGridInner = this.dataGridInner.current;
  }

  _headerCell = ({index, style}) => (
    <div style={style}>
      {`Col-${index}`}
    </div>
  )

  _leftCellHof = activeRowIndex => ({index, style}) => (
    <div
      style={style}
      data-row-index={index}
      className={index === activeRowIndex ? 'active': 'normal'}
    >
      <div>{`S[${index}]`}</div>
      {/* {!isScrolling ?
        <div>{`S[${index}]`}</div> :
        <div>{'...'}</div>
      } */}
    </div>
  )

  _bodyCellHof = activeRowIndex => ({columnIndex, rowIndex, style, isScrolling}) => {
    // if (columnIndex === 0 && dataGrid) {
    //   style = Object.assign(
    //     {},
    //     style,
    //     {
    //       left: dataGrid.state.scrollLeft,
    //       backgroundColor: 'lightgrey'
    //     }
    //   )
    // }

    return (
      <div
        style={style}
        data-row-index={rowIndex}
        className={rowIndex === activeRowIndex ? 'active': 'normal'}
      >
        {`(${rowIndex}, ${columnIndex})`}
      </div>
    )
  }

  render() {
    const { width, height, activeRowIndex } = this.props;
    console.log('rendering all')
    return [
      <div
        style={{
          overflow: 'hidden',
          backgroundColor: 'yellow',
          position: 'absolute',
          color: 'black',
          textAlign: 'center',
          width: columnWidth,
          height: rowHeight,
        }}
        key="left-header-cell"
      >
        {`${width}x${height}`}
      </div>,

      // header
      <FixedSizeList
        direction="horizontal"
        initialScrollOffset={0}
        width={width - columnWidth}
        height={rowHeight}
        itemCount={columnCount}
        itemSize={columnWidth}
        ref={this.headerList}
        style={{
          overflow: 'hidden',
          backgroundColor: 'lightgray',
          position: 'absolute',
          left: columnWidth,
          top: 0,
        }}
        key="header-list"
      >
        {this._headerCell}
      </FixedSizeList>,

      // main data grid
      <FixedSizeGrid
        columnCount={columnCount}
        rowCount={rowCount}
        columnWidth={columnWidth}
        rowHeight={rowHeight}
        height={height - rowHeight}
        width={width + scrollbarSize()}
        ref={this.dataGrid}
        outerRef={this.dataGridOuter}
        innerRef={this.dataGridInner}
        useIsScrolling={true}
        // // When a scroll occurs in the body grid,
        // // synchronize the scroll position of the header grid
        onScroll={({ scrollLeft, scrollTop }) =>
          {
            // this.headerList.current.scrollTo(scrollLeft)
            // this.leftList.current.style.transform = `translate3d(0,-${scrollTop}px,0)`;
            // this.leftList.current.scrollTo(scrollTop)
            // this.leftList.current.style.top = `-${scrollTop}px`;
          }

        }
        style={{
          position: 'absolute',
          top: rowHeight,
        }}
        key="data-grid"
      >
        {this._bodyCellHof(activeRowIndex)}
      </FixedSizeGrid>
    ]

  }
}

