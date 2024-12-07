"use strict";

// tools I used:
// https://learnwebgl.brown37.net/08_projections/projections_perspective.html //for understanding the perspective() function
// https://rgbcolorpicker.com/ //for converting hex values to vec4 values
// for creating vertices on a 3D grid
// https://technology.cpm.org/general/3dgraph/?graph3ddata=____bHw7kw7kuRQKw7kw7kyweLw7kw7kw7kMw7kyLow7kHw7kvxgw7kIywewrUw7kJywexQOw7kKvMqxQOw7kLvMqwrUw7k

var canvas;
var gl;

// ------------------------------------------------------------------------
// set up the variables for the eye

var near = 0.1;
var far = 20.0;
var radius = 4.0;
var dr = 5.0 * Math.PI/180.0;

var  fovy = 45;  // Field-of-view in Y direction angle (in degrees)
var  aspect;       // Viewport aspect ratio

var modelViewMatrixLoc, projectionMatrixLoc;
var modelViewMatrix, projectionMatrix;
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 0.0, 1.0);

var myX = 2;
var myRotate = 0;
var upDown = 0;

// -----------------------------------------------------------
// setup the buffers

var cBuffer1;
var vBuffer1;

var cBuffer2;
var vBuffer2;

var cBuffer3;
var vBuffer3;

var cBuffer4;
var vBuffer4;

var cBuffer5;
var vBuffer5;

var cBuffer6;
var vBuffer6;

var cBuffer7;
var vBuffer7;

var cBuffer8;
var vBuffer8;

var cBuffer9;
var vBuffer9;

var cBuffer10;
var vBuffer10;

var cBuffer11;
var vBuffer11;

var cBuffer12;
var vBuffer12;

var positionLoc;
var program;

var numPosTetra= 12;
var posTetraArray1 = [];
var posTetraArray2 = [];
var posTetraArray3 = [];
var posTetraArray4 = [];
var posTetraArray5 = [];
var posTetraArray6 = [];
var posTetraArray7 = [];
var posTetraArray8 = [];
var posTetraArray9 = [];
var posTetraArray10 = [];
var posTetraArray11 = [];
var posTetraArray12 = [];

var colorsTetraArray1 = [];
var colorsTetraArray2 = [];
var colorsTetraArray3 = [];
var colorsTetraArray4 = [];
var colorsTetraArray5 = [];
var colorsTetraArray6 = [];
var colorsTetraArray7 = [];
var colorsTetraArray8 = [];
var colorsTetraArray9 = [];
var colorsTetraArray10 = [];
var colorsTetraArray11 = [];
var colorsTetraArray12 = [];

// --------------------------------------------------------------
// define vertices

var verticesTetra1 = [
        vec4(0.00000,0.00000,0.00000,1.0 ),
        vec4(-0.40000,-0.20000,0.00000,1.0 ),
        vec4(-0.40000,0.20000,0.00000,1.0 ),
        vec4(0.00000,0.00000,0.40000,1.0 )
        ];


var verticesTetra2 = [
        vec4(0.00000,0.00000,0.00000,1.0 ),
        vec4(-0.40000,0.20000,0.00000,1.0 ),
        vec4(0.00000,0.46667,0.00000,1.0 ),
        vec4(0.00000,0.00000,0.40000,1.0 )
        ];


var verticesTetra3 = [
        vec4(0.00000,0.00000,0.00000,1.0 ),
        vec4(0.00000,0.46667,0.00000,1.0 ),
        vec4(0.40000,0.20000,0.00000,1.0 ),
        vec4(0.00000,0.00000,0.40000,1.0 )
        ];


var verticesTetra4 = [
        vec4(0.00000,0.00000,0.00000,1.0 ),
        vec4(0.40000,0.20000,0.00000,1.0 ),
        vec4(0.40000,-0.20000,0.00000,1.0 ),
        vec4(0.00000,0.00000,0.40000,1.0 )
        ];


var verticesTetra5 = [
        vec4(0.00000,0.00000,0.00000,1.0 ),
        vec4(0.40000,-0.20000,0.00000,1.0 ),
        vec4(0.00000,-0.46667,0.00000,1.0 ),
        vec4(0.00000,0.00000,0.40000,1.0 )
        ];


var verticesTetra6 = [
        vec4(0.00000,0.00000,0.00000,1.0 ),
        vec4(0.00000,-0.46667,0.00000,1.0 ),
        vec4(-0.40000,-0.20000,0.00000,1.0 ),
        vec4(0.00000,0.00000,0.40000,1.0 )
        ];


var verticesTetra7 = [
        vec4(0.00000,0.00000,0.00000,1.0 ),
        vec4(-0.40000,-0.20000,0.00000,1.0 ),
        vec4(-0.40000,0.20000,0.00000,1.0 ),
        vec4(0.00000,0.00000,-0.66667,1.0 )
        ];


var verticesTetra8 = [
        vec4(0.00000,0.00000,0.00000,1.0 ),
        vec4(-0.40000,0.20000,0.00000,1.0 ),
        vec4(0.00000,0.46667,0.00000,1.0 ),
        vec4(0.00000,0.00000,-0.66667,1.0 )
        ];


var verticesTetra9 = [
        vec4(0.00000,0.00000,0.00000,1.0 ),
        vec4(0.00000,0.46667,0.00000,1.0 ),
        vec4(0.40000,0.20000,0.00000,1.0 ),
        vec4(0.00000,0.00000,-0.66667,1.0 )
        ];


var verticesTetra10 = [
        vec4(0.00000,0.00000,0.00000,1.0 ),
        vec4(0.40000,0.20000,0.00000,1.0 ),
        vec4(0.40000,-0.20000,0.00000,1.0 ),
        vec4(0.00000,0.00000,-0.66667,1.0 )
        ];


var verticesTetra11 = [
        vec4(0.00000,0.00000,0.00000,1.0 ),
        vec4(0.40000,-0.20000,0.00000,1.0 ),
        vec4(0.00000,-0.46667,0.00000,1.0 ),
        vec4(0.00000,0.00000,-0.66667,1.0 )
        ];


var verticesTetra12 = [
        vec4(0.00000,0.00000,0.00000,1.0 ),
        vec4(0.00000,-0.46667,0.00000,1.0 ),
        vec4(-0.40000,-0.20000,0.00000,1.0 ),
        vec4(0.00000,0.00000,-0.66667,1.0 )
        ];

// ---------------------------------------------------------------------------
// Define colors

var vertexTetraColors1 = [
        vec4(0.047, 0.796, 0.992, 0.2),
        vec4(0.718, 0.992, 0.996, 0.5), //outward facing face
        vec4(0.047, 0.796, 0.992, 0.2),
        vec4(0.718, 0.992, 0.996, 0.5)
        ];

var vertexTetraColors2 = [
        vec4(0.718, 0.992, 0.996, 0.2),
        vec4(0.047, 0.796, 0.992, 0.5), //outward facing face
        vec4(0.718, 0.992, 0.996, 0.2),
        vec4(0.047, 0.796, 0.992, 0.5)
        ];

var vertexTetraColors3 = [
        vec4(0.047, 0.796, 0.992, 0.2),
        vec4(0.718, 0.992, 0.996, 0.5), //outward facing face
        vec4(0.047, 0.796, 0.992, 0.2),
        vec4(0.718, 0.992, 0.996, 0.5)
        ];

var vertexTetraColors4 = [
        vec4(0.718, 0.992, 0.996, 0.2),
        vec4(0.047, 0.796, 0.992, 0.5), //outward facing face
        vec4(0.718, 0.992, 0.996, 0.2),
        vec4(0.047, 0.796, 0.992, 0.5)
        ];

var vertexTetraColors5 = [
        vec4(0.047, 0.796, 0.992, 0.2),
        vec4(0.718, 0.992, 0.996, 0.5), //outward facing face
        vec4(0.047, 0.796, 0.992, 0.2),
        vec4(0.718, 0.992, 0.996, 0.5)
        ];

var vertexTetraColors6 = [
        vec4(0.718, 0.992, 0.996, 0.2),
        vec4(0.047, 0.796, 0.992, 0.5), //outward facing face
        vec4(0.718, 0.992, 0.996, 0.2),
        vec4(0.047, 0.796, 0.992, 0.5)
        ];

var vertexTetraColors7 = [
        vec4(0.718, 0.992, 0.996, 0.2),
        vec4(0.047, 0.796, 0.992, 0.5), //outward facing face
        vec4(0.718, 0.992, 0.996, 0.2),
        vec4(0.047, 0.796, 0.992, 0.5)
        ];

var vertexTetraColors8 = [
        vec4(0.047, 0.796, 0.992, 0.2),
        vec4(0.718, 0.992, 0.996, 0.5), //outward facing face
        vec4(0.047, 0.796, 0.992, 0.2),
        vec4(0.718, 0.992, 0.996, 0.5)
        ];

var vertexTetraColors9 = [
        vec4(0.718, 0.992, 0.996, 0.2),
        vec4(0.047, 0.796, 0.992, 0.5), //outward facing face
        vec4(0.718, 0.992, 0.996, 0.2),
        vec4(0.047, 0.796, 0.992, 0.5)
        ];

var vertexTetraColors10 = [
        vec4(0.047, 0.796, 0.992, 0.2),
        vec4(0.718, 0.992, 0.996, 0.5), //outward facing face
        vec4(0.047, 0.796, 0.992, 0.2),
        vec4(0.718, 0.992, 0.996, 0.5)
        ];

var vertexTetraColors11 = [
        vec4(0.718, 0.992, 0.996, 0.2),
        vec4(0.047, 0.796, 0.992, 0.5), //outward facing face
        vec4(0.718, 0.992, 0.996, 0.2),
        vec4(0.047, 0.796, 0.992, 0.5)
        ];

var vertexTetraColors12 = [
        vec4(0.047, 0.796, 0.992, 0.2),
        vec4(0.718, 0.992, 0.996, 0.5), //outward facing face
        vec4(0.047, 0.796, 0.992, 0.2),
        vec4(0.718, 0.992, 0.996, 0.5)
        ];

// ----------------------------------------------------------------------
// functions

function triangle(a, b, c, colorLoc, verticesTetra, posTetraArray, colorsTetraArray, vertexTetraColors) {
     posTetraArray.push(verticesTetra[a]);
     colorsTetraArray.push(vertexTetraColors[colorLoc]);
     posTetraArray.push(verticesTetra[b]);
     colorsTetraArray.push(vertexTetraColors[colorLoc]);
     posTetraArray.push(verticesTetra[c]);
     colorsTetraArray.push(vertexTetraColors[colorLoc]);
}

function colorTetra(verticesTetra, posTetraArray, colorsTetraArray, vertexTetraColors)
{
    triangle(0 , 1 , 2 , 0, verticesTetra, posTetraArray, colorsTetraArray, vertexTetraColors);
    triangle(3 , 2 , 1, 1, verticesTetra, posTetraArray, colorsTetraArray, vertexTetraColors);
    triangle(0 , 3 , 1, 2, verticesTetra, posTetraArray, colorsTetraArray, vertexTetraColors);
    triangle(0 , 2 , 3, 3, verticesTetra, posTetraArray, colorsTetraArray, vertexTetraColors);
}

// ------------------------------------------------------------------

init();

function init() {

    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available" );

    gl.viewport(0, 0, canvas.width, canvas.height);

    aspect =  canvas.width/canvas.height;

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // define vertices for color tetrahderon
    colorTetra(verticesTetra1, posTetraArray1, colorsTetraArray1, vertexTetraColors1);
	// assign color buffer and vertex buffer for color tetrahderon
    cBuffer1 = gl.createBuffer();
    vBuffer1 = gl.createBuffer();
	
	colorTetra(verticesTetra2, posTetraArray2, colorsTetraArray2, vertexTetraColors2);
	// assign color buffer and vertex buffer for color tetrahderon
    cBuffer2 = gl.createBuffer();
    vBuffer2 = gl.createBuffer();
	
	colorTetra(verticesTetra3, posTetraArray3, colorsTetraArray3, vertexTetraColors3);
	// assign color buffer and vertex buffer for color tetrahderon
    cBuffer3 = gl.createBuffer();
    vBuffer3 = gl.createBuffer();
	
	colorTetra(verticesTetra4, posTetraArray4, colorsTetraArray4, vertexTetraColors4);
	// assign color buffer and vertex buffer for color tetrahderon
    cBuffer4 = gl.createBuffer();
    vBuffer4 = gl.createBuffer();
	
	colorTetra(verticesTetra5, posTetraArray5, colorsTetraArray5, vertexTetraColors5);
	// assign color buffer and vertex buffer for color tetrahderon
    cBuffer5 = gl.createBuffer();
    vBuffer5 = gl.createBuffer();
	
	colorTetra(verticesTetra6, posTetraArray6, colorsTetraArray6, vertexTetraColors6);
	// assign color buffer and vertex buffer for color tetrahderon
    cBuffer6 = gl.createBuffer();
    vBuffer6 = gl.createBuffer();
	
	colorTetra(verticesTetra7, posTetraArray7, colorsTetraArray7, vertexTetraColors7);
	// assign color buffer and vertex buffer for color tetrahderon
    cBuffer7 = gl.createBuffer();
    vBuffer7 = gl.createBuffer();
	
	colorTetra(verticesTetra8, posTetraArray8, colorsTetraArray8, vertexTetraColors8);
	// assign color buffer and vertex buffer for color tetrahderon
    cBuffer8 = gl.createBuffer();
    vBuffer8 = gl.createBuffer();
	
	colorTetra(verticesTetra9, posTetraArray9, colorsTetraArray9, vertexTetraColors9);
	// assign color buffer and vertex buffer for color tetrahderon
    cBuffer9 = gl.createBuffer();
    vBuffer9 = gl.createBuffer();
	
	colorTetra(verticesTetra10, posTetraArray10, colorsTetraArray10, vertexTetraColors10);
	// assign color buffer and vertex buffer for color tetrahderon
    cBuffer10 = gl.createBuffer();
    vBuffer10 = gl.createBuffer();
	
	colorTetra(verticesTetra11, posTetraArray11, colorsTetraArray11, vertexTetraColors11);
	// assign color buffer and vertex buffer for color tetrahderon
    cBuffer11 = gl.createBuffer();
    vBuffer11 = gl.createBuffer();
	
	colorTetra(verticesTetra12, posTetraArray12, colorsTetraArray12, vertexTetraColors12);
	// assign color buffer and vertex buffer for color tetrahderon
    cBuffer12 = gl.createBuffer();
    vBuffer12 = gl.createBuffer();

    modelViewMatrixLoc = gl.getUniformLocation(program, "uModelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");

	document.getElementById("sliderRotate").onchange = function(event) {
        myRotate = parseFloat(event.target.value);
        render();
    };
	
		document.getElementById("sliderUpDown").onchange = function(event) {
        upDown = parseFloat(event.target.value);
        render();
    };
	
		document.getElementById("sliderX").onchange = function(event) {
        myX = parseFloat(event.target.value);
        render();
    };


    render();
}

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	eye = vec3(myX, myRotate, upDown);
	
	var Tx = translate(0,0,0);
    var S = scale(1, 1, 1);

	//enable blending so that the diamond can be transparent
	gl.enable(gl.BLEND)
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // ==== color buffer for tretrahedron ==== 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsTetraArray1), gl.STATIC_DRAW);
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    // ==== bind and send vertex info for tretrahedron to vertex shader ====
	projectionMatrix = perspective(fovy, aspect, near, far); //define perspective
    modelViewMatrix = lookAt(eye, at , up);
    modelViewMatrix = mult(modelViewMatrix,Tx);
    modelViewMatrix = mult(modelViewMatrix,S);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(posTetraArray1), gl.STATIC_DRAW);
    positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    // loop thru three vertices for each face/triangle of the tetrahedron
    for( var i=0; i<12; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3 );
	
	// ==== color buffer for tretrahedron ==== 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsTetraArray2), gl.STATIC_DRAW);
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    // ==== bind and send vertex info for tretrahedron to vertex shader ====
    modelViewMatrix = lookAt(eye, at , up);
    modelViewMatrix = mult(modelViewMatrix,Tx);
    modelViewMatrix = mult(modelViewMatrix,S);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(posTetraArray2), gl.STATIC_DRAW);
    positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    // loop thru three vertices for each face/triangle of the tetrahedron
    for( var i=0; i<12; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3 );
	
	// ==== color buffer for tretrahedron ==== 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsTetraArray3), gl.STATIC_DRAW);
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    // ==== bind and send vertex info for tretrahedron to vertex shader ====
    modelViewMatrix = lookAt(eye, at , up);
    modelViewMatrix = mult(modelViewMatrix,Tx);
    modelViewMatrix = mult(modelViewMatrix,S);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(posTetraArray3), gl.STATIC_DRAW);
    positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    // loop thru three vertices for each face/triangle of the tetrahedron
    for( var i=0; i<12; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3 );
	
	// ==== color buffer for tretrahedron ==== 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsTetraArray4), gl.STATIC_DRAW);
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    // ==== bind and send vertex info for tretrahedron to vertex shader ====
    modelViewMatrix = lookAt(eye, at , up);
    modelViewMatrix = mult(modelViewMatrix,Tx);
    modelViewMatrix = mult(modelViewMatrix,S);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(posTetraArray4), gl.STATIC_DRAW);
    positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    // loop thru three vertices for each face/triangle of the tetrahedron
    for( var i=0; i<12; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3 );
	
	// ==== color buffer for tretrahedron ==== 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsTetraArray5), gl.STATIC_DRAW);
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    // ==== bind and send vertex info for tretrahedron to vertex shader ====
    modelViewMatrix = lookAt(eye, at , up);
    modelViewMatrix = mult(modelViewMatrix,Tx);
    modelViewMatrix = mult(modelViewMatrix,S);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(posTetraArray5), gl.STATIC_DRAW);
    positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    // loop thru three vertices for each face/triangle of the tetrahedron
    for( var i=0; i<12; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3 );
	
	// ==== color buffer for tretrahedron ==== 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsTetraArray6), gl.STATIC_DRAW);
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    // ==== bind and send vertex info for tretrahedron to vertex shader ====
    modelViewMatrix = lookAt(eye, at , up);
    modelViewMatrix = mult(modelViewMatrix,Tx);
    modelViewMatrix = mult(modelViewMatrix,S);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(posTetraArray6), gl.STATIC_DRAW);
    positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    // loop thru three vertices for each face/triangle of the tetrahedron
    for( var i=0; i<12; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3 );
	
	// ==== color buffer for tretrahedron ==== 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsTetraArray7), gl.STATIC_DRAW);
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    // ==== bind and send vertex info for tretrahedron to vertex shader ====
    modelViewMatrix = lookAt(eye, at , up);
    modelViewMatrix = mult(modelViewMatrix,Tx);
    modelViewMatrix = mult(modelViewMatrix,S);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(posTetraArray7), gl.STATIC_DRAW);
    positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    // loop thru three vertices for each face/triangle of the tetrahedron
    for( var i=0; i<12; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3 );
	
	// ==== color buffer for tretrahedron ==== 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsTetraArray8), gl.STATIC_DRAW);
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    // ==== bind and send vertex info for tretrahedron to vertex shader ====
    modelViewMatrix = lookAt(eye, at , up);
    modelViewMatrix = mult(modelViewMatrix,Tx);
    modelViewMatrix = mult(modelViewMatrix,S);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(posTetraArray8), gl.STATIC_DRAW);
    positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    // loop thru three vertices for each face/triangle of the tetrahedron
    for( var i=0; i<12; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3 );
	
	// ==== color buffer for tretrahedron ==== 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsTetraArray9), gl.STATIC_DRAW);
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    // ==== bind and send vertex info for tretrahedron to vertex shader ====
    modelViewMatrix = lookAt(eye, at , up);
    modelViewMatrix = mult(modelViewMatrix,Tx);
    modelViewMatrix = mult(modelViewMatrix,S);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(posTetraArray9), gl.STATIC_DRAW);
    positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    // loop thru three vertices for each face/triangle of the tetrahedron
    for( var i=0; i<12; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3 );
	
	// ==== color buffer for tretrahedron ==== 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsTetraArray10), gl.STATIC_DRAW);
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    // ==== bind and send vertex info for tretrahedron to vertex shader ====
    modelViewMatrix = lookAt(eye, at , up);
    modelViewMatrix = mult(modelViewMatrix,Tx);
    modelViewMatrix = mult(modelViewMatrix,S);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(posTetraArray10), gl.STATIC_DRAW);
    positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    // loop thru three vertices for each face/triangle of the tetrahedron
    for( var i=0; i<12; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3 );
	
	// ==== color buffer for tretrahedron ==== 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsTetraArray11), gl.STATIC_DRAW);
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    // ==== bind and send vertex info for tretrahedron to vertex shader ====
    modelViewMatrix = lookAt(eye, at , up);
    modelViewMatrix = mult(modelViewMatrix,Tx);
    modelViewMatrix = mult(modelViewMatrix,S);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(posTetraArray11), gl.STATIC_DRAW);
    positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    // loop thru three vertices for each face/triangle of the tetrahedron
    for( var i=0; i<12; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3 );
	
	// ==== color buffer for tretrahedron ==== 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsTetraArray12), gl.STATIC_DRAW);
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    // ==== bind and send vertex info for tretrahedron to vertex shader ====
    modelViewMatrix = lookAt(eye, at , up);
    modelViewMatrix = mult(modelViewMatrix,Tx);
    modelViewMatrix = mult(modelViewMatrix,S);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(posTetraArray12), gl.STATIC_DRAW);
    positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    // loop thru three vertices for each face/triangle of the tetrahedron
    for( var i=0; i<12; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3 );
}
