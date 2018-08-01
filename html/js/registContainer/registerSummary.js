import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { TopTitle } from '../include/title' ;
import { InputWrap } from '../include/inputWrap' ;
import { BtnWrap } from '../include/btnWrap' ;
import Register from './Register' ;

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

		this.register = new Register ;

		/**
		[ props ]
		[ state ]
		@name : 모임 주최자 정보
		@title : 모임명
		@loc : 모임 위치
		@memo : 추가 내용
		*/

		/* 입력 폼 리스트 */
		this.field = [
			 {
			 	// direct : 0 : 1 , --> 0 일 경우 왼쪽 정렬 , 1 일 경우 오른쪽 정렬
				type : 'text' ,
				label : '주최자' ,
				placeholder : '주최자' ,
				value : this.state.name ,
				important : true ,
				handler : this.nameInputHandler ,
				ref : input => this.nameInput = input
			} ,
			{
				type : 'text' ,
				label : '모임명' ,
				placeholder : '모임명' ,
				value : this.state.title ,
				important : true ,
				handler : this.titleInputHandler ,
				ref : input => this.titleInput = input
			} ,
			{
				type : 'text' ,
				label : '위치' ,
				placeholder : '모임 장소' ,
				value : this.state.loc ,
				important : false ,
				handler : this.locInputHandler ,
				ref : input => this.locInput = input
			} ,
			 {
			 	type : 'textarea' ,
			 	label : '메모' ,
			 	placeholder : '메모' ,
				value : this.state.memo ,
				important : false ,
				handler : this.memoInputHandler ,
				ref : textarea => this.memoInput = textarea
			}
		] ;

		this.btns = [
			{
				type : 'A' ,	// A or BUTTON
				href : '#;' ,
				label : '다음' ,
				class : 'btn bot' ,
				handler : () => this.goToMeetDetailStep()
				// handler : () => this.register.pageMove('next')
			} ,
			/*{
				type : 'A' ,
				href : '#;' ,
				label : 'Prev' ,
				class : 'btn' ,
				handler : () => this.register.pageMove('prev')
			} ,
			{
				type : 'A' ,	// A or BUTTON
				href : '#;' ,
				label : 'Reset' ,
				class : 'btn' ,
				handler : () => this.goToMeetResetSummary()
			}*/
		] ;

	}

	nameInputHandler = ( data ) => {
		this.setState({
			name : data ,
		}) ;
	}

	titleInputHandler = ( data ) => {
		this.setState({
			title : data ,
		}) ;
	}

	locInputHandler = ( data ) => {
		this.setState({
			loc : data ,
		}) ;
	}

	memoInputHandler = ( data ) => {
		this.setState({
			memo : data ,
		}) ;
	}

	goToMeetDetailStep = ( e ) => {
		let { name, title, loc, memo } = this.state ;
		this.props.goToMeetDetailStep({ name, title, loc, memo });
	}

	goToMeetResetSummary = () => {
		localStorage.removeItem('meetSummary');
		location.href ='/register?step=1' ;
	}

	render () {

		let topTitleProps = {
			text : '기본 정보를 입력하세요.' ,
			subText : '1단계 작성'
		} ,
		makeField = ( field, idx ) => {
			let props = {
				key : `field${idx}` ,
				options : {
					id : `field${idx}` ,
					type : field.type ,
					label : field.label ,
					placeholder : field.placeholder ,
					value : field.value ,
					important : field.important ,
					onChange : field.handler ,
					ref : field.ref
				}
			}
			return <InputWrap {...props} />
		} ,
		makeBtns = ( btn, idx ) => {
			let props = {
				key : `btn${idx}` ,
				options : {
					type : btn.type ,
					href : btn.href ,
					label : btn.label ,
					onClick : btn.handler ,
					class : btn.class
				}
			}
			return <BtnWrap {...props} />
		}

		return (
			<div className="wrap_register">

				<TopTitle {...topTitleProps} />

				<div className="form">
					<div className="txt_important">(주최자, 모임명은 필수 입력 사항입니다.)</div>
					<div className="ct">{ this.field.map( makeField ) }</div>
				</div>

				<div className="btn_area">{ this.btns.map( makeBtns ) }</div>

			</div>
		) ;
	}
}

export { RegisterSummary } ;