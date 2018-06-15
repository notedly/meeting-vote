import gulp from 'gulp' ; 
import htmlmin from 'gulp-htmlmin' ; 

import { PATH } from '../Dir' ; 

let SRC = PATH.SRC , 
	DEST = PATH.DEST ; 

let htmlSet = () => {
	return gulp.src( SRC.HTML )
		.pipe( htmlmin({ collapceWhitespace : true }))
		.pipe( gulp.dest( DEST.HTML )) ; 
} ; 

export default htmlSet ; 