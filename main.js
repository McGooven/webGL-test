let keys = {
    'ArrowUp':-1,
    'ArrowDown':1,
    'ArrowLeft':-1,
    'ArrowRight':1
}

function setGeometry(gl){
    gl.bufferData(
        gl.ARRAY_BUFFER, 
        new Float32Array([
            // left column
            0, 0,
            30, 0,
            0, 150,
            0, 150,
            30, 0,
            30, 150,

            // top rung
            30, 0,
            100, 0,
            30, 30,
            30, 30,
            100, 0,
            100, 30,

            // middle rung
            30, 60,
            67, 60,
            30, 90,
            30, 90,
            67, 60,
            67, 90,
        ]), 
        gl.STATIC_DRAW
    );
}

async function main(){
    // --- Código de inicializacion ---

    /** @type {HTMLCanvasElement} */
    var canvas = document.getElementById('myCanvas');;
    /** @type {WebGLRenderingContext} */
    var gl = canvas.getContext("webgl");

    if(!gl){
        console.error('no webgl para ti');
    }

    // tomar los shaders strings
    var vertexShaderSource = await loadTextFile('./vertexShader.glsl');
    var fragmentShaderSource = await loadTextFile('./fragmentShader.glsl');

    // crear GLSL shaders, subir el codigo fuente, compilar los shaders
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // enlazar los dos shaders en un programa
    var program = createProgram(gl, vertexShader, fragmentShader);

    // donde la data de vertices debe ir.
    var positionLocation = gl.getAttribLocation(program, "a_position");

    // obtener uniforms
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    var colorLocation = gl.getUniformLocation(program, 'u_color');
    var translationLocation = gl.getUniformLocation(program, 'u_translation');
    var rotationLocation = gl.getUniformLocation(program, "u_rotation");

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // pensar en "gl.ARRAY_BUFFER" = positionBuffer
    setGeometry(gl);

    var translation = [135, 135];
    var rotation = [0, 1];
    var color = [Math.random(), Math.random(), Math.random(), 1];

    drawScene();
    
    window.addEventListener("keydown", (event) =>{
        // console.log(event.code,' / ',translation);
        if(event.code=='ArrowUp' || event.code=='ArrowDown'){
            translation[1] += keys[event.code];
        }

        if(event.code=='ArrowLeft' || event.code=='ArrowRight'){
            translation[0] += keys[event.code];
        }
        
        drawScene();
    });

    document.getElementById("myRange").oninput = function(e) {
        document.getElementById("angleValue").innerHTML = e.target.value;
        var angleInDegrees = 360 - e.target.value;
        var angleInRadians = angleInDegrees * Math.PI / 180;
        rotation[0] = Math.sin(angleInRadians);
        rotation[1] = Math.cos(angleInRadians);
        drawScene();
    }

    function drawScene() {
        initResize(gl.canvas)
        resizeCanvasToDisplaySize(gl.canvas);
    
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
        // Clear the canvas.
        gl.clear(gl.COLOR_BUFFER_BIT);
    
        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);
    
        // Turn on the attribute
        gl.enableVertexAttribArray(positionLocation);
    
        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 2;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            positionLocation, size, type, normalize, stride, offset);
    
        // setear la resolution
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
    
        // setear el color
        gl.uniform4fv(colorLocation, color);

        // setear la translacion
        gl.uniform2fv(translationLocation, translation);

        // setear la rotacion.
        gl.uniform2fv(rotationLocation, rotation);
    
        // Draw the rectangle.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 18; // 6 triangulos para la F, por ende 3 vertices por triangulo.
        gl.drawArrays(primitiveType, offset, count);
    }
}

main();