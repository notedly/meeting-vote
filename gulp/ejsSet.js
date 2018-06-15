import gulp from 'gulp' ; 

import { PATH } from '../Dir' ; 

let SRC = PATH.SRC , 
	DEST = PATH.DEST ; 

let ejsSet = () => {
	console.log( 'in ejsSet' ) ; 
	return gulp.src( SRC.EJS )
		.pipe( gulp.dest( DEST.EJS )) ; 
} ; 

export default ejsSet ; 