function drawBG() {
    let aspect = cnvs.width / cnvs.height;
    let vertices = new Float32Array([-1, 1, 1, 1, 1, -1, // Triangle 1
        -1, 1, 1, -1, -1, 1 // Triangle 2
    ]);
    let vbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    let itemSize = 2;
    let numItems = vertices.length / itemSize;

    // gl.useProgram(shaderProgram);

    // program.uColor = gl.getUniformLocation(program, "uColor");
    // gl.uniform4fv(program.uColor, [0.0, 0.3, 0.0, 1.0]);

    shaderProgram.aVertexPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.enableVertexAttribArray(shaderProgram.aVertexPosition);
    gl.vertexAttribPointer(shaderProgram.aVertexPosition, itemSize, gl.FLOAT, false, 0, 0);


    gl.drawArrays(gl.TRIANGLES, 0, numItems);
}


// logJavaScriptConsole(120 * 120);


oldArr = [];
for (let i = 0; i <  50 * 50; i++) {
    oldArr.push({ x: 1, y: 1 });
}
// oldArr = oldArr.fill({x: 1, y: 1}, 0, 50 * 50);
console.log("Yurp");
outer = Math.PI;
drawDots = function() {
    vertices = [];
    let amountX = 50;
    let amountY = 50;
    let amountOfFrames = 120;
    let inc = Math.PI * 2 / amountOfFrames;
    let t = outer;
    let a = 0.005 * sin(t * 0.05);
    let i = 0;
    for (let x = 0; x < amountX; x += 1) {
        for (let y = 0; y < amountY; y += 1) {
            let ox = x;
            let oy = y;
            let dx = cos(x * 0.8 * 0.5);
            let dy = sin(y * 0.5 * 0.5);
            let xx = x + pow(map(cos(dx + dy + t), -1, 1, 0, 1), 12) * 2;
            let yy = y + pow(map(sin(dx + t), -1, 1, 0, 1), 12) * 0;
//             xx += map(cos(x * t), -1, 1, 0.5, 0.4) * 2;
//             yy += map(sin(y * t), -1, 1, 0.5, 0.4) * 2;
            vertices.push(xx * 0.135 * 0.95 - 2.045 + 0.51, yy * 0.06 * 1.0 - 1.85, 0.0);
        }
    }
    outer += inc;
    if (outer > (Math.PI * 2)) {
        outer = 0;
    }
    // oldArr = newArr;
    // Create an empty buffer object to store the vertex buffer
    // var vertex_buffer = gl.createBuffer();
    //Bind appropriate array buffer to it
    // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    /*============= Drawing the primitive ===============*/
    // // Clear the canvas
    // gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Clear the color buffer bit
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, amountX * amountY);
}
// redraw();