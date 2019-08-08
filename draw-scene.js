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

drawDots = function() {
    vertices = [];
    let amountX = 50;
    let amountY = 50;
    let t = (frameCount + 0) * 0.2;
    let i = 0;
    let ix = 1, iy = 1;
    let sosc = function(i, min, max) {
      return map(Math.sin(i), -1, 1, min, max);
    };
    let cosc = function(i, min, max) {
      return map(Math.cos(i), -1, 1, min, max);
    };
    for (let x = 0; x < amountX; x += 1) {
        for (let y = 0; y < amountY; y += 1) {
            let dx = map(abs(x - 25), 0, 25, 0, 1);
            let dy = map(abs(y - 25), 0, 25, 0, 1);
            let a = atan2(y - abs(y - 50), x - abs(x - 50));
            let xx = x - 25 + tan(cos(y + t) * sin(a)) * cos(x * 100);
            let yy = y - 25 + tan(sin(x + t) * sin(a)) * cos(x * 100);
//          
            let ranX = Math.random() * 0.025 * 0.5;
            let ranY = Math.random() * 0.025 * 0.5;
//          
            xx = (xx + ranX) * 0.05 * 0.88 + 0.05;
            yy = (yy + ranY) * 0.05 * 0.88 + 0.025;
            vertices.push(xx, yy, 0.0);
            i++;
//             ix++;
        }
    }
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