import React , { Component } from 'react' ;
import ReactDOM , { render } from 'react-dom' ;
import index_sub1 from './index/index_sub1' ;
import common from './include/common' ;
import PromiseSetter from '../lib/common' ;

console.log( index_sub1 );

class IndexContainer extends Component {
	render () {
		return (
			<div className="intro">
				<h1>Hello, meeting.</h1>
				<a href="/register?step=01" className="btn">Meet</a>
			</div>
		) ;
	}
}

window.addEventListener( 'load' , () => {
	let elem_blogContainer = document.createElement( 'div' ) ;
	elem_blogContainer.classList.add( 'wrapBox') ;
	render( <IndexContainer /> , elem_blogContainer ) ;
	document.body.appendChild( elem_blogContainer ) ;
}) ;