import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

class VoteDateField extends Component {
	constructor( props ) {
		super( props ) ;
	}
	makeDaysMarkup( item, idx ) {
		return <th scope="col" key={idx}>
			<span className="month">{item.month + 1 + '월 '}</span>
			<span className="date">{item.date + '일'}</span>
			<span className="day">{'('+item.day+')'}</span>
		</th>
	}
	render(){
		return(
			<thead>
				<tr>
					<th scope="col"></th>
					{this.props.days.map( this.makeDaysMarkup, this )}
				</tr>
			</thead>
		)
	}
}

export default VoteDateField ;