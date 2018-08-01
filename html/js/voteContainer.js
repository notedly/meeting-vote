import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import common from './include/common' ;
import PromiseSetter from '../lib/common' ;
import VotePerson from './voteContainer/votePerson' ;
import VoteResult from './voteContainer/VoteResult' ;
import VoteDateField from './include/voteDateField' ;
import VoteCheckField from './include/voteCheckField' ;

class VotingContainer extends Component {
	constructor( props ){
		super( props ) ;

		let infoSummary = JSON.parse( localStorage.getItem('meetSummary') )
		,	 infoDays = JSON.parse( localStorage.getItem('meetDays') )
		,	 infoPerson = JSON.parse( localStorage.getItem('meetPerson') ) ;

		this.state = {
			name : null ,
			title : null ,
			loc : null ,
			memo : null ,
			meetDays : null ,
			meetPerson : null ,
			personData : null ,
			chkArr : [] ,
			checkedDays : [] ,
			crntPage : null
		}

		if( infoSummary ) {
			this.state.name = infoSummary.name ;
			this.state.title = infoSummary.title ;
			this.state.loc = infoSummary.loc ;
			this.state.memo = infoSummary.memo ;
		}

		if( infoDays ) {
			this.state.meetDays = infoDays ;
		}

		if( infoPerson ) {
			this.state.meetPerson = infoPerson ;
		}

		/*
		* 개별 주소 : http://localhost:7005/voting?page=vote&person=박지성
		* 결과 주소 : http://localhost:7005/voting?page=vote_result
		*/

		/* 파라메터 값 가져오기 */
		let url = new URL( location.href )
		,	 person = url.searchParams.get('person')
		, 	 crntPage = url.searchParams.get('page')
		, 	 personData = null
		,   daysNum = this.state.meetDays.map((item) => item.no) ;

		console.log( '##### 현재 페이지 - ', crntPage , ' #####') ;

		this.state.crntPage = crntPage ;

		/* 개별 페이지 일 경우 */
		if( crntPage === 'vote' ) {
			// personData = this.state.meetPerson.filter(item => item.name == person )[0] ;
			personData = this.state.meetPerson.filter(item => item.name == person ) ;
			this.state.personData = personData ? personData : [] ;
			this.state.checkedDays = personData ? personData[0].checkedDays : [] ;

			/* 선택한 날짜 인덱스를 저장해야한다.
			스토리지에 저장되어있는 선택된 날짜를 가져와서 indexOf로 어디에 위치했는지 찾아서 배열로 저장한다. */
			if( this.state.checkedDays ){
				this.state.checkedDays.forEach((item) => {
					let idx = daysNum.indexOf( item ) ;
					if( idx >= 0 ) this.state.chkArr.push( idx ) ;
				}) ;
			}

		}else {
			/* 결과 페이지 일 경우 */
			this.state.personData = this.state.meetPerson ;
		}

		console.log( 'personData :' , this.state.personData ) ;

		// console.log( 'person :' , person ) ;
		// console.log( 'meetPerson :' , this.state.meetPerson ) ;
		// console.log( 'page :' , page ) ;
		// console.log( '참여자 정보 : ', this.state.meetPerson ) ;
		// console.log( '투표 날짜 정보 : ', this.state.meetDays ) ;
		// console.log( '현재 페이지 : ', this.state.personData ) ;
		// console.log( '선택한 날짜 : ', this.state.checkedDays ) ;
	}

	sltCompleteHandler = () => {

		console.log( '투표 완료 했습니다.' ) ;

		// 최종 선택한 번호에 일치한 날짜를 가져와서 새로운 배열로 만든다.
		let checkedDays = this.state.chkArr.sort((a,b) => a-b).map( item => this.state.meetDays[item].no ) ;

		// 기존 참여자 데이터 객체에다가 선택한 날짜의 속성과 값을 추가한다.
		let resultMeetPerson = this.state.meetPerson.map((item) => {
			if( item.name === this.state.personData[0].name ) {
				item.checkedDays = checkedDays ;
			}
			return item ;
		}) ;

		// 로컬스토리지에 변경된 참여자 데이터를 업데이트한다.
		localStorage.setItem( 'meetPerson' , JSON.stringify( resultMeetPerson ) ) ;

		alert('투표 완료 했습니다') ;

	}

	chkboxHandler = ( crntIdx ) => {

		// console.log( crntIdx ) ;
		console.log( '체크 했어!' ) ;

		let chkArr = this.state.chkArr
		,   idxArr = chkArr.indexOf( crntIdx ) ;

		if( idxArr >= 0 ) {
			chkArr.splice( idxArr, 1 ) ;
		}else{
			chkArr.push( crntIdx ) ;
		}

		this.setState({
			chkArr : chkArr
		}) ;

		console.log( '현재 체크한 날짜 : ', this.state.chkArr ) ;

	}

	render () {

		if( this.state.crntPage == 'vote' ){

			let votePersonProps = {
				personData : this.state.personData ,
				title : this.state.title ,
				memo : this.state.memo ,
				days : this.state.meetDays ,
				checkedDays : this.state.checkedDays ,
				sltCompleteHandler : this.sltCompleteHandler ,
				handler : this.chkboxHandler
			} ;

			return (
				<VotePerson {...votePersonProps} />
			)

		} else {

			let voteResultProps = {
				title : this.state.title ,
				memo : this.state.memo ,
				days : this.state.meetDays ,
				personData : this.state.personData ,
				handler : this.chkboxHandler
			} ;

			return (
				<div>
					<VoteResult {...voteResultProps} />
				</div>
			)

		}
	}
}

window.addEventListener( 'load' , () => {
	let meetContainer = document.createElement( 'div' ) ;
	meetContainer.classList.add( 'wrapBox') ;
	render( <VotingContainer /> , meetContainer ) ;
	document.body.appendChild( meetContainer ) ;
}) ;

/*
<div className="wrap">
	<h1>{this.state.title + '날짜 투표!'}</h1>
	<p>{this.state.memo}</p>
	<table className="tb_voting">
		<VoteDateField {...dateFieldProps} />
		<tbody>
			<VoteCheckField {...personFieldProps} />
		</tbody>
	</table>
	<div className="btn_area">
		<a href="#;" className="btn" onClick={this.sltCompleteHandler.bind(this)}>선택 완료</a>
	</div>
	<div className="result">
		<p>최종 선택된 날짜는 <span>------</span>입니다.</p>
	</div>
</div>*/