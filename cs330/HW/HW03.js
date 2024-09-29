"use strict";
var gl;

var delay = 1;

var arrayP = [];
var arrayQ = [];
var arrayT = [];
var colors = [];

var t = 0.0;
var tLoc;
var colorLoc;
var color;

init();
function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL isn't available" ); }


	//initialize arrays
	arrayP = [
			vec2(0,0.5),
			vec2(-0.5,0),
			vec2(0.5,0)
				];
				
	arrayQ = [
			vec2(-0.25,0.5),
			vec2(0.25, -0.5),
			vec2(-0.75, -0.75)
				];

	colors = [
			vec4(0.0, 0.0, 1.0, 1.0),
			vec4(0.0, 0.0, 1.0, 1.0),
			vec4(0.0, 0.0, 1.0, 1.0)
				];

	color = vec4(1.0, 0.0, 0.0, 1.0);

	//
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayP), gl.STATIC_DRAW ); //var

    // Associate out shader variables with our data buffer

    var iPositionLoc = gl.getAttribLocation( program, "iPosition" );
	var uPositionLoc = gl.getAttribLocation( program, "uPosition" );
	
    gl.vertexAttribPointer( iPositionLoc , 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( iPositionLoc );
	
    gl.vertexAttribPointer( uPositionLoc , 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( uPositionLoc );
	
	tLoc = gl.getUniformLocation( program, "t" );
	
	 //define the uniform variable in the shader, aColor

    colorLoc = gl.getUniformLocation( program, "aColor" );
/*
	// a color buffer is created and attached
    var cbufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cbufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW ); //var
    var colorLoc = gl.getAttribLocation( program, "aColor" );
    gl.vertexAttribPointer( colorLoc, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( colorLoc );
*/

	render();
};


function render() {

	gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(tLoc, t);

    gl.uniform4fv(colorLoc, color);

    gl.drawArrays(gl.LINE_LOOP, 0, 3);
	
	/*
	if (tLoc => 0.0) { //if t is equal to 0.0
		tLoc += 0.1;
	} else if (tLoc <= 1.0) { //if t is equal to 1.0
		tLoc -= 0.1;
	}
	*/
	
	/*
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.POINTS, 0, arrayT.length );
	gl.drawArrays( gl.LINE_LOOP, 0, arrayT.length );
	*/
	    setTimeout(
        function (){requestAnimationFrame(render);}, delay
    );
	
}

// earlier attempt at creating an array but this was being done in the html script
/*
	arrayT = [];
	//control t
	while (true){
		if (t == 0.0) { //if t is equal to 0.0
			t += 0.1;
		} else if (t == 1.0) { //if t is equal to 1.0
			t -= 0.1;
		}
			
		//create arrayT
		//conditions if i equals 0 or 1
		if (t == 0.0) {
			arrayT = arrayP;
		} else if (t == 1.0) {
			arrayT = arrayQ;
		} else { //if t is not 0 or 1
			//varT  t * P + (1-t) * Q 	is equivalent to	P + t * ( Q – P )
			for (var i = 0; i < arrayP.length; i++){
				var newPoint = add( mult(t, arrayP[i]), mult(1-t, arrayQ[i]));
				arrayT.push(newPoint);
			}
		}
	
	}
*/