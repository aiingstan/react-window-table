import React from 'react';
import { FixedSizeList } from 'react-window';

class List extends React.Component {
  render() {
    return (
      <div>
        <FixedSizeList
          width={200}
          height={500}
          itemCount={1000}
          itemSize={36}
          direction='horizontal'
        >
        {({index, style}) => (
          <div style={style}>
            {'test'}
          </div>
        )}
        </FixedSizeList>
      </div>
    )
  }
}

export default List;