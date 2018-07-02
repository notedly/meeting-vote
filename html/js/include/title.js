import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

console.log( 'in title' ) ;

class TopTitle extends Component {
	constructor( props ) {
		super( props ) ;
		/**
		[ props ]
		[ state ]
		@text : 제목 내용
		*/

	}

	render () {


		return (
			<div className="title">
				<h1>{this.props.text}</h1>
			</div>
		) ;
	}
}

export { TopTitle } ;