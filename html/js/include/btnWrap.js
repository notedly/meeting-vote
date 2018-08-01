import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

class BtnWrap extends Component {
	constructor( props ) {
		super( props ) ;
		this.state = {
			btns : this.props.options
		}
	}

	clickHandler = (e) => {
		if( this.state.btns.onClick ) {
			e.preventDefault() ;
			this.state.btns.onClick() ;
		}
	}

	render () {

		let opts = this.state.btns
		,	 props = {
			onClick : this.clickHandler,
			className : opts.class
		}

		switch( this.state.btns.type ){
			case 'A' :
				return <a href={opts.href} {...props}>{opts.label}</a>
			break ;
			case 'BUTTON' :
				return <button type="button" {...props}>{opts.label}</button>
			break ;
			default :
				return <a href="">{opts.label}</a>
		}

	}
}

export { BtnWrap } ;