import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

class VoteCheckField extends Component {
	constructor( props ) {
		super( props ) ;

		console.log( '[VoteCheckField.js] 가져온 참여자 데이터 : ', this.props.personData ) ;
		console.log( '[VoteCheckField.js] 가져온 참여자 데이터 수 : ', this.props.personData.length ) ;
		console.log( '[VoteCheckField.js] 가져온 선택값 : ', this.props.checkedDays ) ;

		this.state = {
			chk : false ,
			checkedArr : []
		}
		this.handleChkChange = this.handleChkChange.bind(this);


		/* 결과 페이지인 경우 */
		if( this.props.personData.length > 1 ){

			let chkArr = this.props.personData.map( item => item.checkedDays ) ;

			this.state.checkedArr = chkArr.map( item => {
				return this.props.days.map( elem => item.indexOf( elem.no ) > -1 ? true : false ) ;
			}) ;

			console.log( '[VoteCheckField.js] 선택 날짜만 분류 : ', chkArr ) ;


		}else{
		/* 개별 페이지인 경우 */

			/* 선택한 날짜가 있을 경우 */
			if( this.props.checkedDays ) {
				this.state.checkedArr = this.props.days.map( item => this.props.checkedDays.indexOf( item.no ) > -1 ? true : false ) ;

			/* 선택한 날짜가 없을 경우 */
			}else{
				this.state.checkedArr = [ false , false , false ]
			}
		}

		console.log( '[VoteCheckField.js] 전달 받은 선택한 날짜 boolean값으로 :', this.state.checkedArr ) ;
	}

	handleChkChange( event ) {

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

	makeChkbox( item, idx, arr ){
		console.log( 'item : ', item , 'idx : ', idx , 'arr : ', arr );
		return (
			<td key={idx}>
				<input type="checkbox" defaultChecked={
					this.props.personData.length > 1 ? this.state.checkedArr[0][idx] : this.state.checkedArr[idx]
				} onChange={this.handleChkChange} />
			</td>
		)
	}

	makePerson( item, idx ) {
		return(
			<tr key={idx}>
				<td>{item.name}</td>
				{this.props.days.map( this.makeChkbox , this )}
			</tr>
		)
	}

	render(){
		return(
			<tbody>
				{ this.props.personData.map( this.makePerson , this ) }
			</tbody>
		)
	}
}

export default VoteCheckField ;
			// <tr>
			// 	<td>{this.props.name}</td>
			// 	{this.props.days.map( this.makeChkbox, this )}
			// </tr>

			// {this.props.days.map( this.makeChkbox , this )}
