"use strict";

var canvas;
var gl;

var cam_Fovy=45,red=1,green=0,blue=0,xPos=0,yPos=0,zPos=0,rotX=0,rotY=0,rotZ=0,sX=1,sY=1,sZ=1;

var camP = [0,0,5];
var camT = [0,0,0];
var UP = [0,1,0];

var bufferName, bufferSurname,bufferSquare, nameVertices, surnameVertices,squareVertices,poss;
var vPosition;
var transformationMatrix, transformationMatrixLoc,viewMatrix,viewMatrixLoc,projectionMatrix,projectionMatrixLoc;
var u_colorLocation,fColorLocation;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGLQ
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


		var translationLocation = gl.getUniformLocation(program, "u_translation");
		var rotationLocation = gl.getUniformLocation(program, "u_rotation");

    gl.uniform4f(fColorLocation, red, green, blue, 1); //default color

    // Make the letters
    nameVertices = [

				-0.5,-0.2,0,
				-0.4,-0.2,0,
				-0.5,0.2,0,

				-0.5,0.2,0,
				-0.4,-0.2,0,
				-0.4,0.2,0,

				-0.5,-0.2,0,
				-0.2,-0.2,0,
				-0.5,0,0,

				-0.1,-0.2,0,
				-0.4,-0.2,0,
				-0.1,0, 0,

				-0.2,-0.2,0,
				-0.1,-0.2,0,
				-0.2,0.2,0,

				-0.2,0.2,0,
				-0.1,-0.2,0,
				-0.1,0.2,0,

				-0.5,0.2,0,
				-0.2,0.2,0,
				-0.5,0,0,

				-0.1,0.2,0,
				-0.4,0.2,0,
				-0.1,0,0,

				-0.4,0.4,0,
				-0.3,0.3,0,
				-0.5,0.3,0,

				-0.2,0.4,0,
				-0.1,0.3,0,
				-0.3,0.3,0,
    ];

    surnameVertices = [

                -0.1,0.4,0,
				-0.1,0.3,0,
				-0.1,0.1,-0.2,


                -0.1,0.12,-0.2,
				-0.1,0.4,-0.4,
				-0.1,0.3,-0.43,


                -0.1,-0.2,-0.1,
				-0.1,0.13,-0.2,
				-0.1,-0.207,-0.35,

    ];


    squareVertices = [
        2,  -2,  2,
       -2,  -2,  2,
        2,  -2, -2,
       -2,  -2, -2,
    ];

    // Load the data into the GPU
    bufferName = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferName );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(nameVertices), gl.STATIC_DRAW );

    // Load the data into the GPU
    bufferSurname = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferSurname );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(surnameVertices), gl.STATIC_DRAW );

    // Load the data into the GPU
    bufferSquare = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferSquare );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(squareVertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    transformationMatrixLoc = gl.getUniformLocation( program, "transformationMatrix" );
	viewMatrixLoc = gl.getUniformLocation( program, "viewMatrix");
	projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix");

     u_colorLocation=gl.getUniformLocation(program,"FragColor");

    document.getElementById("cam_Fovy").oninput = function(event) {
			cam_Fovy = (document.getElementById("cam_Fovy").value);

    };

    document.getElementById("cam_pX").oninput = function(event) {
			camP[0] = (document.getElementById("cam_pX").value);
    };

    document.getElementById("cam_pY").oninput = function(event) {
			camP[1] = (document.getElementById("cam_pY").value);
    };

    document.getElementById("cam_pZ").oninput = function(event) {
			camP[2]  = (document.getElementById("cam_pZ").value);
    };

    document.getElementById("cam_tX").oninput = function(event) {
			camT[0] = (document.getElementById("cam_tX").value);
    };

    document.getElementById("cam_tY").oninput = function(event) {
			camT[1] = (document.getElementById("cam_tY").value);
    };

    document.getElementById("cam_tZ").oninput = function(event) {
			camT[2] = (document.getElementById("cam_tZ").value);
    };

    document.getElementById("inp_objX").oninput = function(event) {
			xPos = (document.getElementById("inp_objX").value);

    };
    document.getElementById("inp_objY").oninput = function(event) {
		 	yPos = (document.getElementById("inp_objY").value);
    };
    document.getElementById("inp_objZ").oninput = function(event) {
		 	zPos = (document.getElementById("inp_objZ").value);
    };

    document.getElementById("inp_obj_scaleX").oninput = function(event) {
        sX = (document.getElementById("inp_obj_scaleX").value);
    };
    document.getElementById("inp_obj_scaleY").oninput = function(event) {
        sY = (document.getElementById("inp_obj_scaleY").value);
    };
    document.getElementById("inp_obj_scaleZ").oninput = function(event) {
        sZ = (document.getElementById("inp_obj_scaleZ").value);
    };

    document.getElementById("inp_rotationX").oninput = function(event) {
       rotX  = (document.getElementById("inp_rotationX").value);
    };


    document.getElementById("inp_rotationY").oninput = function(event) {
       rotY  = (document.getElementById("inp_rotationY").value);
    };


    document.getElementById("inp_rotationZ").oninput = function(event) {
       rotZ  = (document.getElementById("inp_rotationZ").value);
    };


    document.getElementById("redSlider").oninput = function(event) {

        red = (document.getElementById("redSlider").value);
        console.log("RedValue:"+red);
    };
    document.getElementById("greenSlider").oninput = function(event) {
        green = (document.getElementById("greenSlider").value);
        console.log("GreenValue:"+green);
    };
    document.getElementById("blueSlider").oninput = function(event) {
        blue = (document.getElementById("blueSlider").value);
        console.log("BlueValue:"+blue);
    };



    render();

};


function render() {

    gl.clear( gl.COLOR_BUFFER_BIT );


    transformationMatrix = mat4();
    viewMatrix=mat4();
    projectionMatrix=mat4();


	transformationMatrix = mult(transformationMatrix, translate(xPos, yPos, zPos));
	transformationMatrix = mult(transformationMatrix, rotateX(rotX));
	transformationMatrix = mult(transformationMatrix, rotateY(rotY));
	transformationMatrix = mult(transformationMatrix, rotateZ(rotZ));
	transformationMatrix = mult(transformationMatrix, scalem(sX, sY, sZ));

    viewMatrix=lookAt(camP,camT,UP);
	projectionMatrix=perspective(cam_Fovy,1,1,20);

    gl.uniformMatrix4fv( transformationMatrixLoc, false, flatten(transformationMatrix) );;
    gl.uniformMatrix4fv( viewMatrixLoc, false, flatten(viewMatrix) );
	gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.uniform4fv(u_colorLocation, vec4(red, green, blue, 1.0));


    gl.bindBuffer( gl.ARRAY_BUFFER, bufferName );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLES, 0, 30 );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferSurname );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLES, 0, 9 );

	transformationMatrix=mat4();
	gl.uniformMatrix4fv( transformationMatrixLoc, false, flatten(transformationMatrix) );
	gl.uniform4fv(u_colorLocation, vec4(0.9, 0.9, 0.25, 0.7));

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferSquare );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    window.requestAnimFrame(render);
}
