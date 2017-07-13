import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items, secondItemList}) => {
	return (
		<ul>
			{items.map((value, index) =>
                <SortableItem key={`item-${index}`} index={index} value={value} />
            )}
			<div>List Two</div>
			{secondItemList.map((value, index) =>
                <SortableItem key={`item-${index}`} index={index} value={value} />
            )}
		</ul>

	);
});

class SortableComponent extends Component {
    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
				secondItemList: ['Chocolate', 'Jason\'s Sweater']
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
    };
    render() {
        return (
						<SortableList secondItemList={this.state.secondItemList} items={this.state.items} onSortEnd={this.onSortEnd} />
        )
    }
}

render(<SortableComponent/>, document.getElementById('root'));
