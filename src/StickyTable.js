import React from 'react';
import ReactDOM from 'react-dom';
import { FixedSizeGrid, FixedSizeList } from 'react-window';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import { range } from 'lodash';
// import { Dropdown, Menu } from 'antd';
// import 'antd/dist/antd.css';
// import SimpleBar from 'simplebar/dist/simplebar';
// import 'simplebar/dist/simplebar.css';

const columnCount = 25;
const rowCount = 600;
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
class LeftSideElements extends React.PureComponent {
  render() {
    const { activeRowIndex } = this.props;
    console.log('render left side');
    return (
      range(rowCount).map(i => (
        <div
          key={i}
          className={`leftSideCell ${i === activeRowIndex ? 'active' : 'normal'}`}
          style={{ height: rowHeight }}
          data-row-index={i}
        >{i}</div>
      ))
    )
  }
}

export default class StickyTable extends React.Component {
  constructor(props) {
    super(props);
    this.headerList = React.createRef();
    this.leftList = React.createRef();
    this.dataGrid = React.createRef();
    this.dataGridOuter = React.createRef();
    this.dataGridInner = React.createRef();
  }

  componentDidMount() {
    const grid = this.dataGridInner.current;
    const el = document.createElement('div');
    el.className = 'leftSide';
    el.style.width = `${columnWidth}px`;
    grid.appendChild(el);
    // this.dataGrid.current.style.backgroundColor='red';
    // const dataGridInner = this.dataGridInner.current;
    ReactDOM.render(<LeftSideElements />, el);
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
        onScroll={({ scrollLeft }) =>
          {
            this.headerList.current.scrollTo(scrollLeft);
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

