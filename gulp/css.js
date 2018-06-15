import gulp from 'gulp' ; 
import Cache from 'gulp-file-cache' ; 
import sass from 'gulp-sass' ; 
import cleanCSS from 'gulp-clean-css' ; 

import { PATH } from '../Dir' ; 

let DIR = PATH.DIR , 
	SRC = PATH.SRC , 
	cache = new Cache() , 
	DEST = PATH.DEST ; 

gulp.task( 'css:sass' , () => {
	console.log( 'in sass' ) ; 
	return gulp.src( DIR.SRC + '/scss/*.scss' )
		.pipe( cache.filter() )
		.pipe( sass() )
		.pipe( cache.cache() )
		.pipe( gulp.dest( DIR.SRC + '/css' ) ) ; 
})

gulp.task( 'css:css' , () => {
	console.log( 'in css' ) ; 
	return gulp.src( SRC.CSS )
		.pipe( cache.filter() )
		.pipe( cleanCSS({ compatibility : 'ie8' }))
		.pipe( cache.cache() )
		.pipe( gulp.dest( DEST.CSS ) ) ; 
})

let css = gulp.series( 'css:sass' , 'css:css' ) ; 

export default css; 