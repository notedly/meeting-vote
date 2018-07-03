import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import DayPicker, { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';

console.log( 'in calendar' ) ;

class Calendar extends Component {
	constructor( props ) {
		super( props ) ;

		this.state = {
			selectedDays : [] ,
			selectedDaysConvert : this.props.selectedDaysConvert || []
		}

		console.log( this.state.selectedDaysConvert )

		this.handleDayClick = this.handleDayClick.bind(this);
		this.confirmClickHandler = this.confirmClickHandler.bind(this);

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

		// 변환
		let selectedDaysConvert = this.state.selectedDays.map((item) => select = { no : item.getTime(), month : item.getMonth() , day : day[ item.getDay() ] , date : item.getDate() }) ;

		// 날짜순 정렬
		selectedDaysConvert = selectedDaysConvert.sort((a, b) => a.no - b.no) ;

		this.setState({
			selectedDaysConvert : selectedDaysConvert
		})

		this.props.calendarUpadate({
			selectedDays : this.state.selectedDays ,
			calendarOpen : !this.props.calendarOpen
		}) ;

		console.log( '현재 선택된 달력 : ', selectedDaysConvert ) ;

	}

		/* 달력 기능 4. 선택한 날짜 노출 */
	selectListMakeHandler( days, idx ){
		console.log('888888888888888888888888888888888888') ;
		return(
			<li key={idx}>{days.month + 1 + '월 ' + days.date + '일 ' + days.day + '요일'}</li>
		)
	}

	render () {

		let style = {
			display: 'block'
		}
		return (
				<div>
					<div className="cal_area" style={style}>
						<DayPicker
							selectedDays={this.state.selectedDays}
							onDayClick={this.handleDayClick}
						/>
						<button type="button" className="btn_day_select" onClick={this.confirmClickHandler}>OK</button>
					</div>
					<ul className="lst_slt_days">{this.state.selectedDaysConvert.map( this.selectListMakeHandler , this )}</ul>
				</div>
		) ;
	}
}

export { Calendar } ;