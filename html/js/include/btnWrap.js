import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

console.log( 'in btnWrap' ) ;

class BtnWrap extends Component {
	constructor( props ) {
		super( props ) ;
	}
	render () {
		return (
			<div className="btn_area">
				버튼영역입니다.
			</div>
		) ;
	}
}

export { BtnWrap } ;