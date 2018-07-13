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
			chkArr : [] ,
			checkedDays : []
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

		this.state.checkedDays = personData ? personData.checkedDays : [] ;


		console.log( '참여자 정보 : ', this.state.meetPerson ) ;
		console.log( '투표 날짜 정보 : ', this.state.meetDays ) ;

		// console.log( '현재 페이지 : ', this.state.personData ) ;
		console.log( '선택한 날짜 : ', this.state.checkedDays ) ;


		/* 선택한 날짜 인덱스를 저장해야한다.
		스토리지에 저장되어있는 선택된 날짜를 가져와서 indexOf로 어디에 위치했는지 찾아서 배열로 저장한다. */

		let daysNum = this.state.meetDays.map((item) => item.no) ;

		console.log( '투표 날짜 NO : ', daysNum ) ;


		if( this.state.checkedDays ){
			this.state.checkedDays.forEach((item) => {
				let idx = daysNum.indexOf( item ) ;
				if( idx >= 0 ) this.state.chkArr.push( idx ) ;
			}) ;
		}

		console.log( '선택한 날짜 인덱스 :' ,this.state.chkArr ) ;

	}

	componentDidMount(){
		// console.log( 'this.state.chkArr : ', this.state.chkArr ) ;
	}

	componentDidUpdate(){
		// console.log( 'componentDidUpdate :', this.state.chkArr ) ;
		// this.watchChkArr() ;
	}

	sltCompleteHandler(){

		console.log( '투표 완료 했습니다.' ) ;

		// 최종 선택한 번호에 일치한 날짜를 가져와서 새로운 배열로 만든다.
		let checkedDays = this.state.chkArr.sort((a,b) => a-b).map( item => this.state.meetDays[item].no ) ;

		// 기존 참여자 데이터 객체에다가 선택한 날짜의 속성과 값을 추가한다.
		let resultMeetPerson = this.state.meetPerson.map((item) => {
			if( item.name === this.state.personData.name ) {
				item.checkedDays = checkedDays ;
			}
			return item ;
		}) ;

		// 로컬스토리지에 변경된 참여자 데이터를 업데이트한다.
		localStorage.setItem( 'meetPerson' , JSON.stringify( resultMeetPerson ) ) ;

	}
	chkboxHandler = ( crntIdx ) => {

		console.log( crntIdx ) ;

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

		let dateFieldProps = {
			days : this.state.meetDays
		} ,
		personFieldProps = {
			name : this.state.personData.name ,
			email : this.state.personData.email ,
			days : this.state.meetDays ,
			checkedDays : this.state.checkedDays ,
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
			checkedArr : []
		}
		this.handleChkChange = this.handleChkChange.bind(this);

		console.log( '전달 받은 선택한 날짜 : ', this.props.checkedDays ) ;

		if( this.props.checkedDays ) {
			console.log( '------> 선택한 날짜가 있다!' ) ;
			this.state.checkedArr = this.props.days.map( item => this.props.checkedDays.indexOf( item.no ) > -1 ? true : false ) ;
		}else{
			this.state.checkedArr = [ false , false , false ]
		}

		console.log( '전달 받은 선택한 날짜 boolean값으로 :', this.state.checkedArr ) ;
	}

	handleChkChange( event ) {

		console.log( '체크!' ) ;

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
				<input type="checkbox" defaultChecked={this.state.checkedArr[idx]} onChange={this.handleChkChange} />
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