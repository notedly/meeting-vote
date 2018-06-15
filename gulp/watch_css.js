import gulp from 'gulp' ; 
import cleanCSS from 'gulp-clean-css' ; 
import Cache from 'gulp-file-cache' ; 

import chkEvtFunc from './chkEvtFunc' ; 
import { PATH } from '../Dir' ; 

let DIR = PATH.DIR , 
	SRC = PATH.SRC , 
	cache = new Cache() , 
	DEST = PATH.DEST ; 

let watch_css = () => {
	return new Promise( ( resolve , reject ) => {
		gulp.watch( SRC.CSS ).on( 'all' , ( evt , path , stats ) => {
			let chkInfo = chkEvtFunc( evt , path ) ; 
			if ( chkInfo.bln ) {
				gulp.src( chkInfo.path )
					.pipe( cache.filter() )
					.pipe( cleanCSS({ compatibility : 'ie8' }) )
					.pipe( cache.cache() )
					.pipe( gulp.dest( DEST.CSS ) ) ; 
			}
		}) ; 

		resolve() ; 
	}) ; 
} ; 

export default watch_css ; 