import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;

class QuickMenu extends Component {
	constructor( props ) {
		super( props ) ;
	}

	dataReset() {
		console.log('데이터 초기화 할거야') ;
		localStorage.clear() ;
		location.href = '/';
	}

	render () {
		return (
			<div className="quick_menu">
				<ul>
					<li><a href="/">처음으로</a></li>
					<li><a href="#;" onClick={this.dataReset.bind(this)}>데이터 초기화</a></li>
				</ul>
			</div>
		) ;
	}
}

export default QuickMenu ;