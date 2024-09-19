"use strict";
var gl;
var points;
var colors;
var sliderVal = 0;

init();
function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL isn't available" ); }
		
	points=[
    vec2(-1.0,0.0),
    vec2(1.0,0.0)
    ];

	colors=[
	vec4(1.0,0.0,0.0,1.0),
	vec4(1.0,0.0,0.0,1.0)
	]	
	
	document.getElementById("slider").onchange = function(event) {
	sliderVal = parseInt(event.target.value);

	var height = 1;
	switch(sliderVal) {
		case 0:
			points=[
			vec2(-1.0,0.0),
			vec2(1.0,0.0),
			];

			colors=[
			vec4(1.0,0.0,0.0,1.0),
			vec4(1.0,0.0,0.0,1.0)
			]	
			break;
		case 1:
			points=[
			vec2(-1.0,0.0),
			vec2(-0.33,0.0),
			vec2(0.0,height),
			vec2(0.33,0.0),
			vec2(1.0,0.0)
			];

			colors=[];	
			for(var i = 0; i < 5; i++) {
				colors.push(vec4(1.0,0.0,0.0,1.0));
			}
			break;
		case 2:
			points=[
			vec2(-1.0,0.0),
			vec2(-0.7722, 0),
			vec2(-0.66165, height/2),
			vec2(-0.5511, 0),
			vec2(-0.33,0.0),
			vec2(0.0,height),
			vec2(0.33,0.0),
			vec2(0.5511, 0),
			vec2(0.66165, height/2),
			vec2(0.7722, 0),
			vec2(1.0,0.0)
			];

			colors=[];
			for(var i = 0; i < 11; i++) {
				colors.push(vec4(1.0,0.0,0.0,1.0));
			}
			break;
		case 3:
			points=[
			vec2(-1.0,0.0),
			vec2(-0.922548, 0),
			vec2(-0.884961, height/3),
			vec2(-0.847374, 0),
			vec2(-0.7722, 0),
			vec2(-0.66165, height/2),
			vec2(-0.5511, 0),
			vec2(-0.402963, 0),
			vec2(-0.4394445, height /3),
			vec2(-0.475926, 0),
			vec2(-0.33,0.0),
			vec2(0.0,height),
			vec2(0.33,0.0),
			vec2(0.402963, 0), 
			vec2(0.4394445, height /3),
			vec2(0.475926, 0),
			vec2(0.5511, 0),
			vec2(0.66165, height/2),
			vec2(0.7722, 0),
			vec2(0.847374, 0),
			vec2(0.884961, height/3),
			vec2(0.922548, 0),
			vec2(1.0,0.0)
			];

			colors=[];
			for(var i = 0; i < 23; i++) {
				colors.push(vec4(1.0,0.0,0.0,1.0));
			}
			break;
		case 4:
			points=[
			vec2(-1.0,0.0),
			vec2(-0.97366632, 0),
			vec2(-0.96088674, height/4),
			vec2(-0.94810716, 0),
			vec2(-0.922548, 0),
			vec2(-0.884961, height/3),
			vec2(-0.847374, 0),
			vec2(-0.82181484, 0),
			vec2(-0.80941113, height /4),
			vec2(-0.79700742, 0),
			vec2(-0.7722, 0),
			vec2(-0.66165, height/2),
			vec2(-0.5511, 0),
			vec2(-0.52554084,0),
			vec2(-0.51313713, height/4),
			vec2(-0.50073342,0),
			vec2(-0.402963, 0),
			vec2(-0.4394445, height /3),
			vec2(-0.475926, 0),
			vec2(-0.37815558, 0),
			vec2(-0.366116685, height/4),
			vec2(-0.35407779, 0),
			vec2(-0.33,0.0),
			vec2(0.0,height),
			vec2(0.33,0.0),
			vec2(0.35407779, 0),
			vec2(0.366116685, height/4),
			vec2(0.37815558, 0),
			vec2(0.402963, 0), 
			vec2(0.4394445, height /3),
			vec2(0.475926, 0),
			vec2(0.50073342,0),
			vec2(0.51313713, height/4),
			vec2(0.52554084,0),
			vec2(0.5511, 0),
			vec2(0.66165, height/2),
			vec2(0.7722, 0),
			vec2(0.79700742, 0),
			vec2(0.80941113, height /4),
			vec2(0.82181484, 0),
			vec2(0.847374, 0),
			vec2(0.884961, height/3),
			vec2(0.922548, 0),
			vec2(0.94810716, 0),
			vec2(0.96088674, height/4),
			vec2(0.97366632, 0),
			vec2(1.0,0.0)
			];

			colors=[];
			for(var i = 0; i < 47; i++) {
				colors.push(vec4(1.0,0.0,0.0,1.0));
			}
			break;
} 

	// -----------------------------------------------------------------------

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
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( positionLoc , 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( positionLoc );

	// a color buffer is created and attached
    var cbufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cbufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    var colorLoc = gl.getAttribLocation( program, "aColor" );
    gl.vertexAttribPointer( colorLoc, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( colorLoc );

	render();
	}

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
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( positionLoc , 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( positionLoc );

	// a color buffer is created and attached
    var cbufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cbufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    var colorLoc = gl.getAttribLocation( program, "aColor" );
    gl.vertexAttribPointer( colorLoc, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( colorLoc );

	render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.POINTS, 0, points.length );
	gl.drawArrays( gl.LINE_STRIP, 0, points.length );
}