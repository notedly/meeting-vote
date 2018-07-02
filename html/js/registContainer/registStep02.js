import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import DayPicker, { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { TopTitle } from '../include/title' ;

/*
	STEP 02
	날짜 , 참여자
*/
class RegistStep02 extends Component {
	constructor( props ) {
		super( props ) ;

		this.state = {
			meetEmail : this.props.meetEmail || [] ,
			selectedDaysConvert : this.props.meetDays || [],
			selectedDays: [],
			calendarOpen : false ,
			meetEmailValue : '' ,
			meetEmailOriginValue : '' ,
			meetEmailModifyValue : '' ,
			modifyOpen : false
		}

		/**
		[ props ]
		@meetEmail : 참여자 이메일 배열 리스트
		@selectedDaysConvert : 모임 날짜 배열 리스트 ( 변환 정보 )

		[ state ]
		@selectDays : 달력에서 선택한 날짜가 들어가는 배열리스트
		@calendarOpen : 달력 펼침/닫힘 유무
		@meetEmailValue : 이메일의 내용
		@meetEmailOriginValue :
		@meetEmailModifyValue :
		@modifyOpen : 수정 입력창 펼침/닫힘 유무
		*/

		this.handleDayClick = this.handleDayClick.bind(this);
		this.confirmClickHandler = this.confirmClickHandler.bind(this);

	}

	/* 달력 기능 1. 달력 열기
	- 날짜 선택 버튼을 클릭했을때 발생한다. */

	openCalendar(){
		this.setState({ calendarOpen : !this.state.calendarOpen }) ;
	}

	/* 달력 기능 2. 날짜 선택
	- 달력에서 날짜를 클릭했을 때 발생한다. */

	handleDayClick(day, { selected }) {
		const { selectedDays } = this.state;
		// 이미 선택되어 있다면 삭제
		if (selected) {
			const selectedIndex = selectedDays.findIndex(selectedDay =>
				DateUtils.isSameDay(selectedDay, day)
			);
			selectedDays.splice(selectedIndex, 1);
		} else {
			selectedDays.push(day);
		}
		this.setState({ selectedDays });
	}

	/* 달력 기능 3. 날짜 선택 완료
	- 달력 OK 버튼 클릭했을 때 발생한다.
	- 날짜 타입을 변형해서 새로 저장한다. */

	confirmClickHandler(){

		let day = [ '일', '월', '화', '수', '목', '금', '토' ]
		,	 select = null ;

		// 변환
		let selectedDaysConvert = this.state.selectedDays.map((item) => select = { no : item.getTime(), month : item.getMonth() , day : day[ item.getDay() ] , date : item.getDate() }) ;

		// 날짜순 정렬
		selectedDaysConvert = selectedDaysConvert.sort((a, b) => a.no - b.no) ;

		this.setState({
			selectedDaysConvert : selectedDaysConvert ,
			calendarOpen : !this.state.calendarOpen
		}) ;

		// 선택한 날짜 로컬스토리지에 저장
		localStorage.setItem( 'meetDays' , JSON.stringify( selectedDaysConvert ) ) ;

	}

	/* 달력 기능 4. 선택한 날짜 노출 */

	selectListMakeHandler( days, idx ){
		return(
			<li key={idx}>{days.month + 1 + '월 ' + days.date + '일 ' + days.day + '요일'}</li>
		)
	}


	/*
		참여자 추가  필요 기능
		- 추가 버튼
		- 삭제 버튼
		- 수정 버튼
		- 추가 시 중복 체크
		- 추가 시 이메일 형식 체크
	*/

	emailInputChange( event )  {
		this.setState({ meetEmailValue : event.target.value }) ;
	}

	emailInputModifyChange( event )  {
		this.setState({ meetEmailModifyValue : event.target.value }) ;
	}

	/* 참여자 기능 1. 추가한 참여자 저장 */
	addMeetEmail( event ){

		let arrMeetEmail = this.state.meetEmail
		, 	 meetEmailValue = this.state.meetEmailValue ;

		if( !this.emailTypeCheck( meetEmailValue ) ){	// 이메일 형식 검사
			alert('이메일 형식에 맞지 않습니다') ;
		}else if( this.emailOverlapCheck( meetEmailValue )) {	// 이메일 중복 검사
			alert('중복된 이메일이 있습니다.') ;
		}else {

			arrMeetEmail.push( meetEmailValue ) ;
			this.setState({
				meetEmail : arrMeetEmail
			}) ;

			localStorage.setItem( 'meetEmail' , JSON.stringify( arrMeetEmail ) ) ;

			this.addEmail.value = '';
		}

	}

	/* 참여자 기능 2. 추가한 참여자 마크업 생성 */
	meetParticipantListMakeHandler( email, idx ){
		return(
			<li key={idx} data-value={email}>
				<span>{email}</span>
				<button type="button" className="btn btn_sm" onClick={this.removeParticipant.bind(this)}>삭제</button>
				<button type="button" className="btn btn_sm" onClick={this.modifyParticipant.bind(this)}>수정</button>
			</li>
		)
	}

	/* 참여자 기능 3. 삭제 버튼 클릭 */
	removeParticipant( event ){

		let removeEmail = event.target.closest('li').getAttribute('data-value')
		,	 arrMeetEmail = this.state.meetEmail ;

		arrParticipant.splice( arrParticipant.indexOf( removeEmail ), 1 ) ;

		this.setState({
			meetEmail : arrParticipant
		}) ;

		localStorage.setItem( 'meetEmail' , JSON.stringify( arrParticipant ) ) ;

	}

	/* 참여자 기능 4. 수정 버튼 클릭 */
	modifyParticipant( event ){

		console.log('수정 시작') ;

		if( this.state.modifyOpen ) return;

		let modifyEmail = event.target.closest('li').getAttribute('data-value')
		,	 arrParticipant = this.state.meetEmail ;
		this.addEmailModify.value = modifyEmail ;

		this.setState({
			modifyOpen : !this.state.modifyOpen ,
			meetEmailOriginValue : modifyEmail ,
			meetEmailModifyValue : modifyEmail
		}) ;

	}

	/* 참여자 기능 5. 수정 취소 버튼 클릭 */
	modifyCancelParticipant( event ){

		console.log('수정 취소') ;

		this.setState({
			modifyOpen : !this.state.modifyOpen ,
			meetEmailOriginValue : ''
		}) ;
	}

	/* 참여자 기능 6. 완료 버튼 클릭 */
	modifyCompleteParticipant( event ){

		if( !this.emailTypeCheck( this.state.meetEmailModifyValue ) ){	// 이메일 형식 검사
			alert('이메일 형식에 맞지 않습니다') ;
		}else if( this.emailOverlapCheck( this.state.meetEmailModifyValue )) {	// 이메일 중복 검사
			alert('중복된 이메일이 있습니다.') ;
		}else {

			let meetEmailArray = this.state.meetEmail ;
			let newMeetEmailArray = meetEmailArray.map(( item ) => item == this.state.meetEmailOriginValue ? this.state.meetEmailModifyValue : item ) ;

			this.setState({
				meetEmail : newMeetEmailArray ,
				modifyOpen : !this.state.modifyOpen ,
				meetEmailOriginValue : ''
			}) ;

			localStorage.setItem( 'meetEmail' , JSON.stringify( newMeetEmailArray ) ) ;
		}
	}

	// 이메일 형식 검사
	emailTypeCheck( strValue ){

		var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
		//입력을 안했으면
		if(strValue.lenght == 0){
			return false;
		}else if (!strValue.match(regExp)){
			//이메일 형식에 맞지않으면
			return false;
		}else{
			return true;
		}
	}

	// 이메일 중복 검사
	emailOverlapCheck( strValue ){
		let arrMeetEmail = this.state.meetEmail
		,	 chkEmail = strValue ;
		return arrMeetEmail.some( item => item == chkEmail) ;
	}


	render(){

		let topTitleProps = {
			text : 'STEP 02. 언제?누구와?'
		}

		return(
			<div className="wrap_register">

				<TopTitle {...topTitleProps} />

				<div className="form">

					<div className="ct">
						<ul>
							<li>
								<button type="button" onClick={this.openCalendar.bind(this)}>날짜선택</button>
								<div className={this.state.calendarOpen ? 'cal_area open' : 'cal_area'}>
									<DayPicker
										selectedDays={this.state.selectedDays}
										onDayClick={this.handleDayClick}
									/>
									<button type="button" className="btn_day_select" onClick={this.confirmClickHandler}>OK</button>
								</div>
								<ul className="lst_slt_days">{this.state.selectedDaysConvert.map( this.selectListMakeHandler , this )}</ul>
							</li>
							<li>
								<label>참여자 : </label>
								<ul className="lst_person">
									{this.state.meetEmail.map( this.meetParticipantListMakeHandler , this )}
								</ul>
								<div>

									<div className={this.state.modifyOpen ? "ip_add_modify open" : "ip_add_modify" }>
										<input
											type="email"
											ref={ref => this.addEmailModify = ref}
											onChange={this.emailInputModifyChange.bind(this)}
											value={this.state.meetEmailModifyValue}
										/>
										<span className="btn_area">
											<button type="button" className="btn btn_sm" onClick={this.modifyCompleteParticipant.bind(this)}>완료</button>
											<button type="button" className="btn btn_sm" onClick={this.modifyCancelParticipant.bind(this)}>취소</button>
										</span>
									</div>

									<div className={this.state.modifyOpen ? "ip_add close" : "ip_add" }>
										<input
											type="email"
											ref={ref => { this.addEmail = ref }}
											onChange={this.emailInputChange.bind(this)}
										/>
										<span className="btn_area">
											<button type="button" className="btn btn_sm" onClick={this.addMeetEmail.bind(this)}>추가</button>
										</span>
									</div>

								</div>
							</li>
						</ul>
					</div>

				</div>
				<div className="btn_area">
					<a href="/register?step=01" className="btn">이전</a>
					<a href="/register?step=03" className="btn">다음</a>
				</div>
			</div>
		)
	}
}

export { RegistStep02 } ;
