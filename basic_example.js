import React, {Component} from 'react'
import {render} from 'react-dom'
import {SortableContainer, SortableElement, arrayMove} from './src/index'

const Item = SortableElement(({ value }) =>
  <div>{ value }</div>);

const List = SortableContainer(({ items }) => {
  return (
    <div>
      { items.map(( value,index ) => {
        if ( value > 0 && value < 10 ) {
          return (
            <Item key   =  { `${Math.random()}` }
            index =  { index }
            value =  { value }
            collection = { value % 2 } />
          )
        }
        return <div key={ `${Math.random()}` }>{ value }</div>
      })}
    </div>
  )
}
);

class VeryBasic extends Component {
  state = {
    items: [1,3,5,'Elephant',2,4,6]
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  }

  render() {
    return (
      <List items     = {this.state.items}
            onSortEnd = {this.onSortEnd} />
    )
  }
}


render(<VeryBasic/>, document.getElementById('root'))
