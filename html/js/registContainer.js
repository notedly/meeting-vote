import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import { RegisterSummary } from './registContainer/registerSummary' ;
import { RegisterDetail } from './registContainer/registerDetail' ;
import { RegisterPreview } from './registContainer/registerPreview' ;
import common from './include/common' ;
import PromiseSetter from '../lib/common' ;
import Register from './registContainer/Register' ;

class RegisterContainer extends Component {
	constructor( props ){
		super( props ) ;

		this.register = new Register ;

		let infoSummary = JSON.parse( localStorage.getItem('meetSummary') )
		,	 infoDays = JSON.parse( localStorage.getItem('meetDays') )
		, 	 infoDaysOrigin = JSON.parse( localStorage.getItem('meetDaysOrigin') )
		,	 infoPerson = JSON.parse( localStorage.getItem('meetPerson') ) ;

		this.state = {
			pageStep : this.register.getParameter('step') ,
			name : null ,
			title : null ,
			loc : null ,
			memo : null ,
			meetDays : null ,
			meetDaysOrigin : null ,
			meetPerson : null
		}

		if( infoSummary ) {
			this.state.name = infoSummary.name ;
			this.state.title = infoSummary.title ;
			this.state.loc = infoSummary.loc ;
			this.state.memo = infoSummary.memo ;
		}

		if( infoDays ) {
			this.state.meetDays = infoDays ;
			this.state.meetDaysOrigin = infoDaysOrigin ;
		}

		if( infoPerson ) {
			this.state.meetPerson = infoPerson ;
		}

	}

	/*

		아래 스위치문을 위에서 처리해서 값 하나만 넘긴다?
		render(){
			return(
				valiable
			)
		}

	*/

	update = ( data ) => {
		localStorage.setItem( 'meetSummary' , JSON.stringify( data ) ) ;
		return true ;
	}

	meetSummaryValidationChk = ( data ) => {

		let { name , title, loc, memo } = data;

		if ( name == '' || name == undefined ) {
			alert( '주최자를 적어주세요.' ) ;
			this.registerContents.nameInput.focus() ;
			return false;
		}
		if ( title == '' || title == undefined ) {
			alert( '모임명을 적어주세요.' ) ;
			this.registerContents.titleInput.focus() ;
			return false;
		}

		return this.update( data );

	}

	goToMeetDetailStep = ( data ) => {

		let chk = this.meetSummaryValidationChk( data ) ;
		if( chk ) {
			location.href = '/register?step=2' ;
		}

	}

	registerComplete = () => {
		location.href = '/complete' ;
	}

	render () {

		let regSummaryProps = {
			name : this.state.name ,
			title : this.state.title ,
			loc : this.state.loc ,
			memo : this.state.memo ,
			goToMeetDetailStep : this.goToMeetDetailStep ,
			ref : registerContents => this.registerContents = registerContents
		}

		let regDetailProps = {
			meetDays : this.state.meetDays ,
			meetDaysOrigin : this.state.meetDaysOrigin ,
			meetPerson : this.state.meetPerson ,
		}

		let regPreviewProps = {
			name : this.state.name ,
			title : this.state.title ,
			loc : this.state.loc ,
			memo : this.state.memo ,
			meetDays : this.state.meetDays ,
			meetPerson : this.state.meetPerson ,
			registerComplete : this.registerComplete
		}

		switch( this.state.pageStep ){
			case '1' :
				return ( <RegisterSummary {...regSummaryProps} /> ) ;
			break ;
			case '2' :
				return ( <RegisterDetail {...regDetailProps} /> ) ;
			break ;
			case '3' :
				return ( <RegisterPreview {...regPreviewProps} /> ) ;
			break ;
		}


	}
}

window.addEventListener( 'load' , () => {
	let meetContainer = document.createElement( 'div' ) ;
	meetContainer.classList.add( 'wrapBox') ;
	render( <RegisterContainer /> , meetContainer ) ;
	document.body.appendChild( meetContainer ) ;
}) ;