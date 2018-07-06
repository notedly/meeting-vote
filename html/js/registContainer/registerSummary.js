import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { TopTitle } from '../include/title' ;
import { InputWrap } from '../include/inputWrap' ;
import { BtnWrap } from '../include/btnWrap' ;

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

		/* 입력 폼 리스트 */
		this.field = [
			 {
			 	// direct : 0 : 1 , --> 0 일 경우 왼쪽 정렬 , 1 일 경우 오른쪽 정렬
				type : 'text' ,
				label : '주최자' ,
				placeholder : '주최자를 작성하여주십시오.' ,
				value : this.state.name ,
				handler : this.nameInputHandler ,
				ref : input => this.nameInput = input
			} ,
			{
				type : 'text' ,
				label : '모임명' ,
				placeholder : '모임명을 작성하여주십시오.' ,
				value : this.state.title ,
				handler : this.titleInputHandler ,
				ref : input => this.titleInput = input
			} ,
			{
				type : 'text' ,
				label : '위치' ,
				placeholder : '위치를 작성하여주십시오.' ,
				value : this.state.loc ,
				handler : this.locInputHandler ,
				ref : input => this.locInput = input
			} ,
			 {
			 	type : 'textarea' ,
			 	label : '메모' ,
			 	placeholder : '추가로 전달할 메모를 작성하여주십시오.' ,
				value : this.state.memo ,
				handler : this.memoInputHandler ,
				ref : textarea => this.memoInput = textarea
			}
		] ;

		this.btns = [
			{
				type : 'A' ,	// A or BUTTON
				href : '/' ,
				label : '이전' ,
				class : 'btn'
			} ,
			{
				type : 'A' ,	// A or BUTTON
				href : '#;' ,
				label : '다음' ,
				class : 'btn' ,
				handler : () => this.goToMeetDetailStep()
			} ,
			{
				type : 'A' ,	// A or BUTTON
				href : '#;' ,
				label : '초기화' ,
				class : 'btn' ,
				handler : () => this.goToMeetResetSummary()
			}
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

	// goToMeetHome = ( e ) => {
	// 	this.props.goToMeetHome() ;
	// }

	goToMeetHome = () => {
		location.href ='/' ;
	}

	goToMeetResetSummary = () => {
		console.log( 'go to meet reset' ) ;
		localStorage.removeItem('meetSummary');
		location.href ='/register?step=01' ;
	}

	render () {

		let topTitleProps = {
			text : 'STEP 01. 무슨 모임이야?'
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
					<div className="ct">{ this.field.map( makeField ) }</div>
				</div>

				<div className="btn_area">{ this.btns.map( makeBtns ) }</div>

			</div>
		) ;
	}
}

export { RegisterSummary } ;