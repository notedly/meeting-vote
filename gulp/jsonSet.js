import gulp from 'gulp' ; 

import { PATH } from '../Dir' ; 

let SRC = PATH.SRC , 
	DEST = PATH.DEST ; 

let jsonSet = () => {
	console.log( 'in jsonSet' ) ; 
	return gulp.src( SRC.JSON )
		.pipe( gulp.dest( DEST.JSON )) ; 
} ; 

export default jsonSet ; 