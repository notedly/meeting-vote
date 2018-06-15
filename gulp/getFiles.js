import fs from 'fs' ; 

let getFiles = ( pathStr ) => {
	console.log( 'pathStr : ' , pathStr ) ; 

	let fileNames = [] ; 
	let prom = new Promise( resolve => {
		fs.readdir( pathStr , ( err , fls ) => {
			console.log( 'fls : ' , fls ) ; 
			fls.forEach( fileName => {
				if ( !fs.statSync( `${pathStr}${fileName}` ).isDirectory() ) {					
					console.log( 'fileName : ' , fileName ) ; 
					fileNames.push( fileName ) ; 
					// resolve( fileName ) ; 
				}
			}) ; 

			console.log( ' ===> fileNames : ' , fileNames ) ; 
			console.log( ' =====> fileNames : ' , fileNames) ; 
			resolve( fileNames ) ; 
		}) ; 
	}) ; 

	return prom ; 
} ; 

export default getFiles ; 