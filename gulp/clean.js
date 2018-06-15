import del from 'del' ; 
import { PATH } from '../Dir' ; 

let DIR = PATH.DIR ; 

let clean = () => {
	console.log( 'in clean' ) ; 
	return new Promise( ( resolve , reject ) => {
		resolve( del.sync( DIR.DEST ) ) ; 
	}) ; 	
} ; 

export default clean ; 