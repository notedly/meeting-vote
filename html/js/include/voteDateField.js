import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

class VoteDateField extends Component {
	constructor( props ) {
		super( props ) ;
	}
	makeDaysMarkup( item, idx ) {
		return <th scope="col" key={idx}>
			{
				item.month + 1 + '월 '
				+ item.date + '일'
				+ '(' + item.day + ')'
			}
		</th>
	}
	render(){
		return(
			<thead>
				<tr>
					<th scope="col">날짜!</th>
					{this.props.days.map( this.makeDaysMarkup, this )}
				</tr>
			</thead>
		)
	}
}

export default VoteDateField ;