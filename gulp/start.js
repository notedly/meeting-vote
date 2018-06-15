import 'babel-polyfill';
import gulp from 'gulp' ; 
import babel from 'gulp-babel' ; 
import nodemon from 'gulp-nodemon' ; 

import { PATH } from '../Dir' ; 

let DIR = PATH.DIR , 
	SRC = PATH.SRC , 
	DEST = PATH.DEST ; 

gulp.task( 'start:babel' , () => {
	console.log( 'in babel')
	return new Promise( ( resolve , reject ) => {
	gulp.src( SRC.SERVER )
		.pipe( babel({
			"presets" : ['es2015', 'es2017', 'stage-3'],
			"plugins" : [
				'transform-decorators-legacy', 
				'transform-class-properties' ,
				'transform-async-to-generator' , 
				'transform-object-assign' , 
				'transform-regenerator' , 
				["transform-runtime", {
					"helpers": false, // defaults to true 
					"polyfill": false, // defaults to true 
					"regenerator": true, // defaults to true 
					"moduleName": "babel-runtime" // defaults to "babel-runtime" 
				}]
			],
		}))
		.pipe( gulp.dest( DEST.SERVER ) ) ; 
		resolve () ; 
	}) ;
}) ; 

gulp.task( 'start:nodemon' , () => {
	return new Promise( ( resolve , reject ) => {
		console.log( 'in nodemon')
		nodemon({
			script : DEST.SERVER + '/app.js' , 
			watch : DEST.SERVER 
		}) ; 

		resolve () ; 
	}) ;
}) ; 

let start = gulp.series( 'start:babel' , 'start:nodemon' ) ; 

export default start ; 