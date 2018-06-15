import browserSync from 'browser-sync' ; 

import { PATH } from '../Dir' ; 

let DIR = PATH.DIR ; 

let browserSyncSet = () => {
	console.log( 'in browserSyncSet' ) ; 
	return new Promise( ( resolve , reject ) => {
		browserSync.init( null , {
			proxy : 'http://localhost:' + DIR.PORT , 
			port : 7005 
		}) ;  

		resolve () ; 
	}) ;  
} ; 

export default browserSyncSet ; 