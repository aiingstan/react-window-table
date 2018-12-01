import React from 'react';
import { FixedSizeGrid } from 'react-window';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import { Dropdown, Menu } from 'antd';
import 'antd/dist/antd.css';
// import SimpleBar from 'simplebar/dist/simplebar';
// import 'simplebar/dist/simplebar.css';

const columnCount = 25;
const rowCount = 1000;
const columnWidth = 100;
const rowHeight = 42;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

export default class SyncTables extends React.Component {
  constructor() {
    super();
    this.headerGrid = React.createRef();
    this.leftGrid = React.createRef();
    this.dataGrid = React.createRef();
    this.dataGridOuter = React.createRef();
    this.state = {
      activeRowIndex: null
    }
  }

  componentDidMount() {
    // const grid = this.dataGrid.current;
    // new SimpleBar(this.dataGridOuter.current);
    console.log(this.dataGridOuter.current);
    // this.dataGrid.current.style.backgroundColor='red';
  }

  setActiveRowIndex = rowIndex => {
    this.setState({
      activeRowIndex: rowIndex
    });
  }

  HeaderCell = ({columnIndex, style}) => (
    <div style={style}>
      {`Col-${columnIndex}`}
    </div>
  )

  BodyCell = ({columnIndex, rowIndex, style}) => (
    <div
      style={{ ...style, color: (rowIndex === this.state.activeRowIndex ? 'black' : 'white') }}
    >
      {`(${rowIndex}, ${columnIndex})`}
    </div>
  )

  render() {
    const { width, height } = this.props;

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
        >
          {`${width}x${height}`}
        </div>,

        // left side column
        <FixedSizeGrid
          columnCount={1}
          rowCount={rowCount}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          width={columnWidth}
          height={height - rowHeight - scrollbarSize()}
          ref={this.leftGrid}
          style={{
            overflow: 'hidden',
            backgroundColor: 'lightgray',
            position: 'absolute',
            top: rowHeight
          }}
          useIsScrolling={true}
        >
          {({rowIndex, style, isScrolling}) => (
            <div
              style={{ ...style, color: (rowIndex === this.state.activeRowIndex ? 'black' : 'white') }}
              onClick={this.setActiveRowIndex.bind(this, rowIndex)}
            >
              {!isScrolling ?
                <Dropdown
                  overlay={menu}
                  trigger={['click']}
                >
                  <div>{`S[${rowIndex}]`}</div>
                </Dropdown> :
                <div>{'...'}</div>
              }
            </div>
          )}
        </FixedSizeGrid>,

        // header
        <FixedSizeGrid
          columnCount={columnCount}
          rowCount={1}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          height={rowHeight}
          width={width - columnWidth}
          ref={this.headerGrid}
          style={{
            overflow: 'hidden',
            backgroundColor: 'lightgray',
            position: 'absolute',
            left: columnWidth
          }}
        >
          {this.HeaderCell}
        </FixedSizeGrid>,

        // main data grid
        <FixedSizeGrid
          columnCount={columnCount}
          rowCount={rowCount}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          height={height - rowHeight}
          width={width - columnWidth + scrollbarSize()}
          ref={this.dataGrid}
          outerRef={this.dataGridOuter}
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
          {this.BodyCell}
        </FixedSizeGrid>
      ]

  }
}

