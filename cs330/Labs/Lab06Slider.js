"use strict";
var gl;
var points;
var colors;
var sliderVal = 1;

init();

function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL isn't available" ); }

    points=[
    vec2(-0.95,0.95),
    vec2(0,0.95),
    vec2(0.95,0.95),
    vec2(-0.95,0.0),
    vec2(0,0.0),
    vec2(0.95,0.0),
    vec2(-0.95,-0.95),
    vec2(0.0,-0.95),
    vec2(0.95,-0.95)
    ];

    colors=[
    vec4(0.859, 0.451, 0.588, 1.0 ),
    vec4(0.051, 0.522, 0.11, 1.0 ),
    vec4(1, 0.922, 0.384, 1.0 ),
    vec4(0.333, 0.78, 0.745, 1.0 ),
    vec4(0.212, 0.22, 0.522, 1.0 ),
    vec4(0.859, 0.176, 0.176, 1.0 ),
    vec4(0.518, 0.322, 0.541, 1.0 ),
    vec4(0.02, 1, 0.984, 1.0 ),
    vec4(0.486, 1, 0.545, 1.0 )
    ];
    
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
    gl.vertexAttribPointer( positionLoc, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( positionLoc );

    // a color buffer is created and attached
    var cbufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cbufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    var colorLoc = gl.getAttribLocation( program, "aColor" );
    gl.vertexAttribPointer( colorLoc, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( colorLoc );

    // slider event listener
	render();
	
	document.getElementById("slider").onchange = function(event) {
		sliderVal = parseInt(event.target.value);
		render();
	};
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    // use the variable from the slider event listener to determine how many
    // points to render

    gl.drawArrays( gl.POINTS, 0, sliderVal);
}