import gulp from 'gulp' ; 
import fs from 'fs' ; 
import spritesmith from 'gulp.spritesmith' ; 
import mergeStream from 'merge-stream' ; 
import mustache from 'mustache' ; 

import { PATH } from '../Dir' ; 

let DIR = PATH.DIR , 
	DEST = PATH.DEST , 
	SRC = PATH.SRC ; 

let images = () => {
	console.log( 'in images' ) ; 
	return new Promise( ( resolve , reject ) => {
		gulp.src( [SRC.IMAGES , '!' + SRC + '/images/sprite' ] )
			.pipe( gulp.dest( DEST.IMAGES )) ; 
			resolve() ; 
		}) ; 
} ; 

let imagesSprite = () => {
	console.log( 'in imagesSprite' ) ; 
	let createSpriteOptions = function ( dirName ) {
		let mustacheTemplate = './template/sp-mosaic.mustache' ; 
		let spriteOptions = {
			cssOpts : {
				zerounit : function () {
					return function ( text , render ) {
						let value = render(text) ; 
						// return value ; 
						return '0px' === value ? '0' : value ; 
					}
				}
			} , 
			padding : 4 , 
			algorithm : 'binary-tree' , 
			cssTemplate : function ( params ) {
				let template = fs.readFileSync(mustacheTemplate, { encoding : "utf-8" });
				return mustache.render(template, params);
			} , 
			imgPath : '../images/sprite/' + '/sp-' + dirName + '.png' , 
			imgName : 'sp-' + dirName + '.png' , 
			cssName : 'sp-' + dirName + '.scss' , 
			cssSpritesheetName : 'sp-' + dirName  
		} ; 
		return spriteOptions ; 
	} ; 

	return new Promise( ( resolve , reject ) => {
		fs.readdir( SRC.SPRITE + '/' , ( err , fls ) => {
			let arr = [] ; 

			fls.forEach(( dirName ) => {
				let spriteData = gulp.src( SRC.SPRITE + '/' + dirName + '/*.png' )
					.pipe( spritesmith( createSpriteOptions( dirName ) ) ) ; 

				let imgStream = spriteData.img
					.pipe( gulp.dest( 'html_build/images/sprite' ) ) ; 

				let cssStream = spriteData.css
					.pipe( gulp.dest( DIR.SRC + '/scss/ui/sprite' ) ) ; 

				resolve( mergeStream( imgStream , cssStream ) ) ; 
			}) ;  
		}) ; 
	}) ; 
}

let copyImages = gulp.series( images , imagesSprite ) ; 

export default copyImages ; 