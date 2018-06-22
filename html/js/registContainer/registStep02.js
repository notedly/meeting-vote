import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import DayPicker, { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';

/*
	STEP 02
	날짜 , 참여자
*/
class RegistStep02 extends Component {
	constructor( props ) {
		super( props ) ;

		let loadMeetDays = JSON.parse( localStorage.getItem('meetDays') ) ;

		this.state = {
			selectedDays: [],
			selectedDaysConvert : loadMeetDays || [],
			meetInfo : JSON.parse( localStorage.getItem('meetInfo') ) ,
			calendarOpen : false
		}

		this.handleDayClick = this.handleDayClick.bind(this);
		this.confirmClickHandler = this.confirmClickHandler.bind(this);

		console.log( this.state.meetInfo ) ;
	}

	/* 1. 달력 열기
	- 날짜 선택 버튼을 클릭했을때 발생한다. */

	openCalendar(){
		this.setState({ calendarOpen : !this.state.calendarOpen }) ;
	}

	/* 2. 날짜 선택
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

	/* 3. 날짜 선택 완료
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

	/* 4. 선택한 날짜 노출 */

	selectListMakeHandler( days, idx ){
		return(
			<li key={idx}>{days.month + 1 + '월 ' + days.date + '일 ' + days.day + '요일'}</li>
		)
	}


	render(){
		return(
			<div className="wrap_register">
				<div className="title"><h1>언제?누구와?</h1></div>
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
								<ul>
									<li>
										<input type="text" />
										<span className="btn_area">
											<button type="button">추가</button>
										</span>
									</li>
								</ul>
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
