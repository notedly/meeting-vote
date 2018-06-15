import gulp from 'gulp' ; 

import chkEvtFunc from './chkEvtFunc' ; 
import { PATH } from '../Dir' ; 

let DIR = PATH.DIR , 
	SRC = PATH.SRC , 
	DEST = PATH.DEST ; 

let watch_lib = () => {
	return new Promise( ( resolve , reject ) => {
		gulp.watch( SRC.LIB ).on( 'all' , ( evt , path , stats ) => {
			let chkInfo = chkEvtFunc( evt , path ) ; 
			if ( chkInfo.bln ) {
				gulp.src( chkInfo.path )
					.pipe( gulp.dest( DEST.LIB ) ) ; 
			}
		}) ; 
		
		resolve() ; 
	}) ; 
} ; 

export default watch_lib ; 