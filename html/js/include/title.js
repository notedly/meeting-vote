import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

class TopTitle extends Component {
	constructor( props ) {
		super( props ) ;
	}

	render () {
		return (
			<div className="title">
				<h1>{this.props.text}</h1>
				<span>{this.props.subText}</span>
			</div>
		) ;
	}
}

export { TopTitle } ;