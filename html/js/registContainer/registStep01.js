import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

/*
	STEP 01
	Title , Location , Memo
*/
class RegistStep01 extends Component {
	constructor( props ) {
		super( props ) ;

		this.state = {
			name : this.props.name || '' ,
			title : this.props.title || '' ,
			loc : this.props.loc || '' ,
			memo : this.props.memo || '' ,
		}

	}

	nameInputHandler = ( e ) => {
		this.setState({
			name : e.target.value ,
		}) ;
	}

	titleInputHandler = ( e ) => {
		this.setState({
			title : e.target.value ,
		}) ;
	}

	locInputHandler = ( e ) => {
		this.setState({
			loc : e.target.value ,
		}) ;
	}

	memoInputHandler = ( e ) => {
		this.setState({
			memo : e.target.value ,
		}) ;
	}

	goToNextStep = ( e ) => {
		e.preventDefault() ;
		let { name, title, loc, memo } = this.state ;
		this.props.goToNextStep({ name, title, loc, memo });
	}

	render () {
		return (
			<div className="wrap_register">
				<div className="title"><h1>STEP 01. 무슨 모임이야?</h1></div>
				<div className="form">

					<div className="ct">
						<ul>
							<li>
								<label>주최자 : <input type="text" onChange={this.nameInputHandler} value={this.state.name} /></label>
							</li>
							<li>
								<label>모임명 : <input type="text" onChange={this.titleInputHandler} value={this.state.title} /></label>
							</li>
							<li>
								<label>위치 : <input type="text" onChange={this.locInputHandler} value={this.state.loc} /></label>
							</li>
							<li>
								<label>메모 : <textarea onChange={this.memoInputHandler} value={this.state.memo}></textarea></label>
							</li>
						</ul>
					</div>

				</div>
				<div className="btn_area">
					<a href="http://naver.com" className="btn" onClick={this.goToNextStep}>다음</a>
					{/*<a href="/register?step=02" className="btn" onClick={this.goToNextStep}>다음</a>*/}
				</div>
			</div>
		) ;
	}
}

export { RegistStep01 } ;