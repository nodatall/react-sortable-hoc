import React, {Component} from 'react'
import {render} from 'react-dom'
import {SortableContainer, SortableElement, arrayMove, arrayCollectionMove} from './src/index'
import map from 'lodash/map'
import flatten from 'lodash/flatten'

const Item = SortableElement(({ value }) =>
  <div>{ value }</div>);

const List = SortableContainer(({ lists }) => {
  const allItems = map( lists, ( list, listName ) => {
      return (
        list.map(( item, index ) => {
          return (
            <Item key = {`${listName}-${index}`}
              index = { index }
              value = { item }
              collection = { listName } />
          )
        })
      )
    })
    // console.log('lists:', lists)

	return (
		<div>
      <div> Animals: </div>
      { allItems[0] }
      <br/>
      <div> Chocolates: </div>
      { allItems[1] }
		</div>
	)
}
);

class VeryBasic extends Component {
	state = {
		animals: ['elephant','giraffe','mouse'],
		chocolates: ['camelMilk','hundredPercent','twentyDollar']
	}

	onSortEnd = ({oldIndex, newIndex, newCollection, oldCollection }) => {
		console.log("Old index:", oldIndex, "oldcollection:", oldCollection);
		console.log("new index:", newIndex, "newcollection:", newCollection);
    const returnedCollections = arrayCollectionMove(this.state, oldIndex, newIndex, oldCollection, newCollection)
    console.log('returnedCollections:', returnedCollections)
    const {animals, chocolates} = returnedCollections
		this.setState({
      animals: animals,
      chocolates: chocolates
			// [newCollection]: arrayMove(this.state.animals, oldIndex, newIndex)
		});
	}

	render() {
		return (
 			<List lists     = {this.state}
						onSortEnd = {this.onSortEnd} />
		)
	}
}


render(<VeryBasic/>, document.getElementById('root'))
