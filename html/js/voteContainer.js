import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import common from './include/common' ;
import PromiseSetter from '../lib/common' ;

// https://www.zerocho.com/category/HTML/post/5b3ae84fb3dabd001b53b9ab

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
			chkArr : []
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

		/* 파라메터 값 가져오기 */
		let url = new URL( location.href ) ;
		let person = url.searchParams.get('person') ;
		let personData = this.state.meetPerson.filter(item => item.name == person )[0] ;
		this.state.personData = personData ? personData : [] ;

		console.log( this.state.meetPerson ) ;

	}

	componentDidMount(){
		// console.log( 'this.state.chkArr : ', this.state.chkArr ) ;
	}

	componentDidUpdate(){
		// console.log( 'componentDidUpdate :', this.state.chkArr ) ;
		this.watchChkArr() ;
	}

	watchChkArr() {
		let crntChkArr = this.state.chkArr ;
		// console.log( 'watchChkArr in------> ', crntChkArr ) ;
		/*let result = crntChkArr.filter((item, idx) => {
			console.log( item ) ;
		}) ;*/

		/*let result = crntChkArr.map((item) => {
			return item.reduce((a, b) => a+b) ;
		}, []) ;
		console.log( result ) ;*/
		/*let result = crntChkArr.map((item, idx) => item[idx] ) ;
		console.log( 'result :', result ) ;*/

		/*let result = [] ;
		result = crntChkArr.map((item, idx) => {

		}) ;
		console.log( result ) ;*/

	}


	/*handleChkChange = ( n1, n2 ) => {
		let crntChkArr = this.state.chkArr ;
		crntChkArr[n1][n2] = !crntChkArr[n1][n2] * 1;
		this.setState({
			chkArr : crntChkArr
		}) ;
	}*/

	sltCompleteHandler(){
		let chkDays = this.state.chkArr.sort((a,b) => a-b).map( item => this.state.meetDays[item].no ) ;

		let resultMeetPerson = this.state.meetPerson.map((item) => {
			if( item.name === this.state.personData.name ) {
				item.chkDays = chkDays ;
			}
			return item ;
		})
		localStorage.setItem( 'meetPerson' , JSON.stringify( resultMeetPerson ) ) ;

	}

	chkboxHandler = ( crntIdx ) => {
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

	}

	render () {

		let dateFieldProps = {
			days : this.state.meetDays
		} ,
		personFieldProps = {
			name : this.state.personData.name ,
			email : this.state.personData.email ,
			days : this.state.meetDays ,
			handler : this.chkboxHandler
		} ;

		/*makeChkField = ( person , idx ) => {
			let props = {
				key : `chk${idx}` ,
				options : {
					no : `row${idx}` ,
					email : person.name ,
					days : this.state.meetDays
				} ,
				handler : this.handleChkChange
			}
			return <MakeCheckField {...props} />
		}*/

		return (
			<div className="wrap">
				<h1>{this.state.title + '날짜 투표!'}</h1>
				<p>{this.state.memo}</p>
				<table className="tb_voting">
					<MakeDateField {...dateFieldProps} />
					<tbody>
						<MakeCheckField {...personFieldProps} />
					</tbody>
					{/*<tbody>
						{this.state.meetPerson.map( makeChkField )}
					</tbody>*/}
				</table>
				<div className="btn_area">
					<a href="#;" className="btn" onClick={this.sltCompleteHandler.bind(this)}>선택 완료</a>
				</div>
				{/*<div className="result">
					<p>최종 선택된 날짜는 <span>------</span>입니다.</p>
				</div>*/}
			</div>
		)
	}
}

class MakeDateField extends Component {
	constructor( props ) {
		super( props ) ;
		// console.log( this.props )
	}
	makeDaysMarkup( item, idx ) {
		return <th scope="col" key={idx}>
			{
				item.month + 1 + '월 '
				+ item.date + '일'
				+ '(' + item.day + ')'
			}
		</th>
	}
	render(){
		return(
			<thead>
				<tr>
					<th scope="col">날짜!</th>
					{this.props.days.map( this.makeDaysMarkup, this )}
				</tr>
			</thead>
		)
	}
}

class MakeCheckField extends Component {
	constructor( props ) {
		super( props ) ;
		this.state = {
			chk : false ,
			chkArr : [ true, false, false ]
		}
		this.handleChkChange = this.handleChkChange.bind(this);
	}

	handleChkChange( event ) {

		console.log( 'click in' ) ;

		let tg = event.target
		,	 tgParent = tg.closest('tr')
		,	 tgChkRow = tgParent.getAttribute('data-chk-row')
		, 	 allChk = tgParent.querySelectorAll('input')
		,	 crntIdx = [].indexOf.call( allChk, tg ) ;

		this.props.handler( crntIdx ) ;

		/* 넘겨야할 정보는
		현재 클릭한 chk의 인덱스(자기 그룹안에서)
		현재 클릭한 부모의 인덱스
		이중배열 접근을 위해서임. */

		// this.props.handler( Number( tgChkRow.slice(3) ) , crntIdx ) ;
	}

	makeChkbox( item, idx ){
		return (
			<td key={idx}>
				<input type="checkbox" onChange={this.handleChkChange} />
			</td>
		)
	}

	render(){
		return(
			<tr>
				<td>{this.props.name}</td>
				{this.props.days.map( this.makeChkbox, this )}
			</tr>
		)
	}
}



window.addEventListener( 'load' , () => {
	let meetContainer = document.createElement( 'div' ) ;
	meetContainer.classList.add( 'wrapBox') ;
	render( <VotingContainer /> , meetContainer ) ;
	document.body.appendChild( meetContainer ) ;
}) ;