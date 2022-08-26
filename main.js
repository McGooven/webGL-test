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
    var matrixLocation = gl.getUniformLocation(program, 'u_matrix');

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // pensar en "gl.ARRAY_BUFFER" = positionBuffer
    setGeometry(gl);

    var translation = [135, 135];
    var angleInRadians = 0;
    var scale = [1, 1];
    var color = [Math.random(), Math.random(), Math.random(), 1];

    drawScene();
    
    // actualizar la posicion
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

    // actualizar la rotacion
    document.getElementById("myRange").oninput = function(e) {
        document.getElementById("angleValue").innerHTML = e.target.value;
        var angleInDegrees = 360 - e.target.value;
        angleInRadians = angleInDegrees * Math.PI / 180;
        drawScene();
    }

    // actualizar el escalado en x
    document.getElementById("myRangeScalex").oninput = (e)=>{
        document.getElementById("scaleX").innerHTML = e.target.value;
        scale[0] = e.target.value;
        drawScene();
    };

    // actualizar el escalado en y
    document.getElementById("myRangeScaley").oninput = (e)=>{
        document.getElementById("scaleY").innerHTML = e.target.value;
        scale[1] = e.target.value;
        drawScene();
    };
    

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
        gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);
    
        // Procesando las matrices
        let translationMatrix = m3.traslacion(translation[0], translation[1]);
        let rotationMatrix = m3.rotacion(angleInRadians);
        let scaleMatrix = m3.escalado(scale[0], scale[1]);

        // Multiplicacion de matrices con un orden específico
        let matrix = m3.multiplicar(translationMatrix, rotationMatrix);
        matrix = m3.multiplicar(matrix, scaleMatrix);

        // asignarle el valor a los uniforms
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
        gl.uniform4fv(colorLocation, color);
        gl.uniformMatrix3fv(matrixLocation, false, matrix);

        // dibujar la figura geometrica
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 18; // 6 triangulos para la F, por ende 3 vertices por triangulo.
        gl.drawArrays(primitiveType, offset, count);
    }
}

main();