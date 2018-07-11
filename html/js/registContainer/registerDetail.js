import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import DayPicker, { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { TopTitle } from '../include/title' ;
import { BtnWrap } from '../include/btnWrap' ;
import Register from './Register' ;

/*
	STEP 02
	날짜 , 참여자
*/
class RegisterDetail extends Component {
	constructor( props ) {
		super( props ) ;

		this.state = {
			meetPerson : this.props.meetPerson || [] ,
			selectedDaysConvert : this.props.meetDays || [],
			selectedDays: [],
			calendarOpen : false ,
			meetEmailValue : '' ,
			meetNameValue : '' ,
			meetEmailOriginValue : '' ,
			meetNameOriginValue : '' ,
			meetEmailModifyValue : '' ,
			meetNameModifyValue : '' ,
			modifyOpen : false
		}

		console.log( '참여자 : ', this.state.meetPerson )

		console.log( this.props.meetDaysOrigin ) ;
		console.log( '현재 선택된 날짜 :', this.state.selectedDays )

		/**
		[ props ]
		@meetPerson : 참여자 배열 리스트
		@selectedDaysConvert : 모임 날짜 배열 리스트 ( 변환 정보 )
		[ state ]
		@selectDays : 달력에서 선택한 날짜가 들어가는 배열리스트
		@calendarOpen : 달력 펼침/닫힘 유무
		@meetEmailValue : 이메일의 내용
		@meetEmailOriginValue :
		@meetEmailModifyValue :
		@modifyOpen : 수정 입력창 펼침/닫힘 유무
		*/

		this.register = new Register ;

		this.btns = [
			{
				type : 'A' ,	// A or BUTTON
				href : '#;' ,
				label : '이전' ,
				class : 'btn' ,
				handler : () => this.register.pageMove('prev')
			} ,
			{
				type : 'A' ,	// A or BUTTON
				href : '#;' ,
				label : '다음' ,
				class : 'btn' ,
				handler : () => this.register.pageMove('next')
			}
		] ;

		this.handleDayClick = this.handleDayClick.bind(this);
		this.confirmClickHandler = this.confirmClickHandler.bind(this);

		// let t = new Date(2017, 3, 12) ;
		// console.log( 't : ', t ) ;

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
		console.log( selectedDays ) ;
		this.setState({ selectedDays });
	}

	/* 달력 기능 3. 날짜 선택 완료
	- 달력 OK 버튼 클릭했을 때 발생한다.
	- 날짜 타입을 변형해서 새로 저장한다. */

	confirmClickHandler(){

		let day = [ '일', '월', '화', '수', '목', '금', '토' ]
		,	 select = null ;

		// console.log( this.state.selectedDaysConvert) ;
		// console.log( this.state.selectedDays) ;

		console.log( this.state.selectedDays ) ;

		// 변환
		let selectedDaysConvert = this.state.selectedDays.map(item => select = { no : item.getTime(), month : item.getMonth() , day : day[ item.getDay() ] , date : item.getDate() }) ;


		// 날짜순 정렬
		selectedDaysConvert = selectedDaysConvert.sort((a, b) => a.no - b.no) ;

		this.setState({
			selectedDaysConvert : selectedDaysConvert ,
			calendarOpen : !this.state.calendarOpen
		}) ;

		// // 선택한 날짜 로컬스토리지에 저장
		localStorage.setItem( 'meetDays' , JSON.stringify( selectedDaysConvert ) ) ;
		localStorage.setItem( 'meetDaysOrigin' , JSON.stringify( this.state.selectedDays ) ) ;

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
	nameInputChange( event ) {
		console.log(event.target.value)
		this.setState({ meetNameValue : event.target.value })
	}

	emailInputModifyChange( event )  {
		this.setState({ meetEmailModifyValue : event.target.value }) ;
	}
	nameInputModifyChange( event )  {
		this.setState({ meetNameModifyValue : event.target.value }) ;
	}

	/* 참여자 기능 1. 추가한 참여자 저장 */
	addMeetPerson( event ){

		let arrMeetPerson = this.state.meetPerson
		, 	 meetEmailValue = this.state.meetEmailValue
		,	 meetNameValue = this.state.meetNameValue ;

		if( meetNameValue == '' ) {
			alert('이름을 입력하세요') ;
		}else	if( !this.emailTypeCheck( meetEmailValue ) ){	// 이메일 형식 검사
			alert('이메일 형식에 맞지 않습니다') ;
		}else if( this.emailOverlapCheck( meetEmailValue )) {	// 이메일 중복 검사
			alert('중복된 이메일이 있습니다.') ;
		}else {

			// arrMeetPerson.push( meetEmailValue ) ;

			arrMeetPerson.push({
				name : meetNameValue ,
				email : meetEmailValue
			})

			this.setState({
				meetPerson : arrMeetPerson
			}) ;

			localStorage.setItem( 'meetPerson' , JSON.stringify( arrMeetPerson ) ) ;

			this.addEmail.value = '';
			this.addName.value = '';
		}

	}

	/* 참여자 기능 2. 추가한 참여자 마크업 생성 */
	meetParticipantListMakeHandler( person, idx ){
		return(
			<li key={idx} data-value={person.email}>
				<span>{person.name}</span>
				<span>{person.email}</span>
				<button type="button" className="btn btn_sm" onClick={this.removeParticipant.bind(this)}>삭제</button>
				<button type="button" className="btn btn_sm" onClick={this.modifyParticipant.bind(this)}>수정</button>
			</li>
		)
	}

	/* 참여자 기능 3. 삭제 버튼 클릭 */
	removeParticipant( event ){


		let removeEmail = event.target.closest('li').getAttribute('data-value')
		,	 arrMeetPerson = this.state.meetPerson ;
		let findRemovePerson = arrMeetPerson.filter((item) => item.email == removeEmail )[0] ;
		let findRemovePersonIndex = arrMeetPerson.findIndex(( x ) => Object.is( x , findRemovePerson ) ) ;
		arrMeetPerson.splice( findRemovePersonIndex, 1 ) ;
		this.setState({
			meetPerson : arrMeetPerson
		}) ;

		localStorage.setItem( 'meetPerson' , JSON.stringify( arrMeetPerson ) ) ;

	}

	/* 참여자 기능 4. 수정 버튼 클릭 */
	modifyParticipant( event ){

		console.log('수정 클릭!') ;

		if( this.state.modifyOpen ) return;

		let modifyEmail = event.target.closest('li').getAttribute('data-value')
		,	 arrMeetPerson = this.state.meetPerson ;

		let findModifyPerson = arrMeetPerson.filter((item) => item.email == modifyEmail )[0] ;

		console.log( '수정할 요소 :' ,findModifyPerson , findModifyPerson.name, findModifyPerson.email ) ;

		console.log( this.addEmailModify );

		this.addEmailModify.value = findModifyPerson.email ;
		this.addNameModify.value = findModifyPerson.name ;

		this.setState({
			modifyOpen : !this.state.modifyOpen ,
			meetEmailOriginValue : findModifyPerson.email ,
			meetEmailModifyValue : findModifyPerson.email ,
			meetNameOriginValue : findModifyPerson.name ,
			meetNameModifyValue : findModifyPerson.name
		}) ;

	}

	/* 참여자 기능 5. 수정 취소 버튼 클릭 */
	modifyCancelParticipant( event ){

		console.log('수정 취소') ;

		this.setState({
			modifyOpen : !this.state.modifyOpen ,
			meetEmailOriginValue : '' ,
			meetNameOriginValue : ''
		}) ;
	}

	/* 참여자 기능 6. 완료 버튼 클릭 */
	modifyCompleteParticipant( event ){

		if( this.state.meetNameModifyValue == '' ) {
			alert('이름을 입력하세요') ;
		}else	if( !this.emailTypeCheck( this.state.meetEmailModifyValue ) ){	// 이메일 형식 검사
			alert('이메일 형식에 맞지 않습니다') ;
		}else if( this.emailOverlapCheck( this.state.meetEmailModifyValue )) {	// 이메일 중복 검사
			alert('중복된 이메일이 있습니다.') ;
		}else {

			let meetPerson = this.state.meetPerson ;

			console.log( meetPerson ) ;


			let newMeetEmailArray = meetPerson.map(( item ) => {
				return item.email == this.state.meetEmailOriginValue ? { name : this.state.meetNameModifyValue , email : this.state.meetEmailModifyValue } : item
			}) ;

			console.log( newMeetEmailArray ) ;

			this.setState({
				meetPerson : newMeetEmailArray ,
				modifyOpen : !this.state.modifyOpen ,
				meetEmailOriginValue : '' ,
				meetNameOriginValue : ''
			}) ;

			localStorage.setItem( 'meetPerson' , JSON.stringify( newMeetEmailArray ) ) ;

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
		let arrMeetPerson = this.state.meetPerson
		,	 chkEmail = strValue ;
		return arrMeetPerson.some( item => item == chkEmail) ;
	}


	render(){

		let topTitleProps = {
			text : 'STEP 02. 언제?누구와?'
		}
		, makeBtns = ( btn, idx ) => {
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
									<button type="button" className="btn btn_day_select" onClick={this.confirmClickHandler}>날짜 선택완료</button>
								</div>
								<ul className="lst_slt_days">{this.state.selectedDaysConvert.map( this.selectListMakeHandler , this )}</ul>
							</li>
							<li>
								<label>참여자 : </label>
								<ul className="lst_person">
									{this.state.meetPerson.map( this.meetParticipantListMakeHandler , this )}
								</ul>
								<div>

									<div className={this.state.modifyOpen ? "ip_add_modify open" : "ip_add_modify" }>
										<input
											type="text"
											ref={ref => this.addNameModify = ref}
											onChange={this.nameInputModifyChange.bind(this)}
											value={this.state.meetNameModifyValue}
										/>
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
											type="text"
											ref={ref => this.addName = ref}
											placeholder="이름을 입력하세요"
											onChange={this.nameInputChange.bind(this)}
										/>
										<input
											type="email"
											ref={ref => this.addEmail = ref}
											placeholder="이메일을 입력하세요"
											onChange={this.emailInputChange.bind(this)}
										/>
										<span className="btn_area">
											<button type="button" className="btn btn_sm" onClick={this.addMeetPerson.bind(this)}>추가</button>
										</span>

									</div>

								</div>
							</li>
						</ul>
					</div>

				</div>
				<div className="btn_area">{ this.btns.map( makeBtns ) }</div>
			</div>
		)
	}
}

export { RegisterDetail } ;
