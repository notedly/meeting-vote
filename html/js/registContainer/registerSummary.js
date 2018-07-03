import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { TopTitle } from '../include/title' ;

/*
	STEP 01
	Title , Location , Memo
*/
class RegisterSummary extends Component {
	constructor( props ) {
		super( props ) ;

		this.state = {
			name : this.props.name || '' ,
			title : this.props.title || '' ,
			loc : this.props.loc || '' ,
			memo : this.props.memo || '' ,
		}

		/**
		[ props ]
		[ state ]
		@name : 모임 주최자 정보
		@title : 모임명
		@loc : 모임 위치
		@memo : 추가 내용
		*/

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

		let nameProps = {
			type : 'text' ,
			placeholder : '주최자를 작성하여주십시오.' ,
			value : this.state.name ,
			onChange : this.nameInputHandler ,
			ref : input => this.nameInput = input
		}

		let titleProps = {
			type : 'text' ,
			placeholder : '모임명을 작성하여주십시오.' ,
			value : this.state.title ,
			onChange : this.titleInputHandler ,
			ref : input => this.titleInput = input
		}

		let locProps = {
			type : 'text' ,
			placeholder : '위치를 작성하여주십시오.' ,
			value : this.state.loc ,
			onChange : this.locInputHandler ,
			ref : input => this.locInput = input
		}

		let memoProps = {
			onChange : this.memoInputHandler ,
			value : this.state.memo
		}

		let topTitleProps = {
			text : 'STEP 01. 무슨 모임이야?'
		}

		return (
			<div className="wrap_register">
				<TopTitle {...topTitleProps} />
				<div className="form">

					<div className="ct">
						<ul>
							<li><label>주최자 : <input {...nameProps} /></label></li>
							<li><label>모임명 : <input {...titleProps} /></label></li>
							<li><label>위치 : <input {...locProps} /></label></li>
							<li><label>메모 : <textarea {...memoProps}></textarea></label></li>
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

export { RegisterSummary } ;