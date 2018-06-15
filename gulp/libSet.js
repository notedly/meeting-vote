import gulp from 'gulp' ; 

import { PATH } from '../Dir' ; 

let SRC = PATH.SRC , 
	DEST = PATH.DEST ; 

let libSet = () => {
	console.log( 'in libSet' ) ; 
	return gulp.src( SRC.LIB )
		.pipe( gulp.dest( DEST.LIB )) ; 
} ; 

export default libSet ; 