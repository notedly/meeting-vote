import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

console.log( 'in InputWrap' ) ;

class InputWrap extends Component {
	constructor( props ) {
		super( props ) ;
		this.state = {
			opt : this.props.options ,
			value : this.props.options.value
		}
	}

	onChangeHandler = ( e ) => {
		this.setState({
			value : e.target.value
		}) ;
		this.state.opt.onChange( e.target.value ) ;
	}

	render () {

		let field = null
		, 	 opts = this.state.opt
		,	 props = {
			id : opts.id ,
			type : opts.type ,
			placeholder : opts.placeholder ,
			onChange : this.onChangeHandler ,
			value : this.state.value ,
			ref : opts.ref
		}

		switch( opts.type ){
			case 'text' :
				field = <input {...props} />
				break ;
			case 'textarea' :
				field = <textarea {...props} ></textarea>
				break ;
			default :
				field = <input type="text" className="default" />
		}

		return (
			<div className="field">
				<label htmlFor={opts.id}>{opts.label}</label>
				{ field }
			</div>
		) ;
	}
}

export { InputWrap } ;