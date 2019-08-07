let looping = true;
let keysActive = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/sketch";
// a shader variable
let gl;
let shaderProgram;
let vertices = [];
let drawCount = 0;
let drawIncrement = 0.00125;
let time;
let vertex_buffer;

// function preload() {
//     // load the shader
//     shaderProgram = loadShader('points.vert', 'points.frag');
// }

function setup() {
    socket = io.connect('http://localhost:8080');
    // shaders require WEBGL mode to work
    pixelDensity(1);
    cnvs = createCanvas(windowWidth, windowWidth * 9 / 16, WEBGL);
    canvasDOM = document.getElementById('defaultCanvas0');
    gl = canvas.getContext('webgl');

    // gl.cbf = gl.getExtension('WEBGL_color_buffer_float') || gl.getExtension('EXT_color_buffer_float');
    // gl.tf = gl.getExtension('OES_texture_float');

    gl.enable(gl.BLEND);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
    frameRate(20);
    noStroke();

    // Create an empty buffer object to store the vertex buffer
    vertex_buffer = gl.createBuffer();

    // Set the view port
    gl.viewport(0, 0, canvas.width, canvas.height);
}

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    // shader() sets the active shader with our shader
    // shader(shaderProgram);
    // texcoordShader.setUniform('time', frameCount);
    // rect gives us some geometry on the screen
    // rect(0, 0, width, height);
    // console.log("Drawing!");
    setBGShaders();
    gl.uniform1f(time, drawCount);
    drawBG();
    //     if (frameCount == 1) {
    setDotsShaders();
    //     }
    drawDots();
    //     setOverlayShaders();
    //     gl.uniform1f(time, drawCount);
    //     drawBG();
    drawCount += drawIncrement;
}

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }
// gl.clearColor(0.0, 0.0, 0.0, 1.0);

function keyPressed() {
    if (keysActive) {
        if (keyCode === 32) {
            if (looping) {
                noLoop();
                looping = false;
            } else {
                loop();
                looping = true;
            }
        }
        if (key == 'r' || key == 'R') {
            window.location.reload();
        }
        if (key == 'm' || key == 'M') {
            redraw();
        }
        if (key == 'p' || key == 'P') {
            frameExport();
        }
    }
}