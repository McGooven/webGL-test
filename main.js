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
          // left column front
           0,   0,  0,
           0, 150,  0,
          30,   0,  0,
           0, 150,  0,
          30, 150,  0,
          30,   0,  0,
          

         // top rung front
          30,   0,  0,
          30,  30,  0,
         100,   0,  0,
          30,  30,  0,
         100,  30,  0,
         100,   0,  0,

         // middle rung front
          30,  60,  0,
          30,  90,  0,
          67,  60,  0,
          30,  90,  0,
          67,  90,  0,
          67,  60,  0,

         // left column back
           0,   0,  30,
          30,   0,  30,
           0, 150,  30,
           0, 150,  30,
          30,   0,  30,
          30, 150,  30,

         // top rung back
          30,   0,  30,
         100,   0,  30,
          30,  30,  30,
          30,  30,  30,
         100,   0,  30,
         100,  30,  30,

         // middle rung back
          30,  60,  30,
          67,  60,  30,
          30,  90,  30,
          30,  90,  30,
          67,  60,  30,
          67,  90,  30,

         // top
           0,   0,   0,
         100,   0,   0,
         100,   0,  30,
           0,   0,   0,
         100,   0,  30,
           0,   0,  30,

         // top rung right
         100,   0,   0,
         100,  30,   0,
         100,  30,  30,
         100,   0,   0,
         100,  30,  30,
         100,   0,  30,

         // under top rung
         30,   30,   0,
         30,   30,  30,
         100,  30,  30,
         30,   30,   0,
         100,  30,  30,
         100,  30,   0,

         // between top rung and middle
         30,   30,   0,
         30,   60,  30,
         30,   30,  30,
         30,   30,   0,
         30,   60,   0,
         30,   60,  30,

         // top of middle rung
         30,   60,   0,
         67,   60,  30,
         30,   60,  30,
         30,   60,   0,
         67,   60,   0,
         67,   60,  30,

         // right of middle rung
         67,   60,   0,
         67,   90,  30,
         67,   60,  30,
         67,   60,   0,
         67,   90,   0,
         67,   90,  30,

         // bottom of middle rung.
         30,   90,   0,
         30,   90,  30,
         67,   90,  30,
         30,   90,   0,
         67,   90,  30,
         67,   90,   0,

         // right of bottom
         30,   90,   0,
         30,  150,  30,
         30,   90,  30,
         30,   90,   0,
         30,  150,   0,
         30,  150,  30,

         // bottom
         0,   150,   0,
         0,   150,  30,
         30,  150,  30,
         0,   150,   0,
         30,  150,  30,
         30,  150,   0,

         // left side
         0,   0,   0,
         0,   0,  30,
         0, 150,  30,
         0,   0,   0,
         0, 150,  30,
         0, 150,   0
        ]), 
        gl.STATIC_DRAW
    );
}

// Fill the buffer with colors for the 'F'.
function setColors(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Uint8Array([
            // left column front
            200,  70, 120,
            200,  70, 120,
            200,  70, 120,
            200,  70, 120,
            200,  70, 120,
            200,  70, 120,

            // top rung front
            200,  70, 120,
            200,  70, 120,
            200,  70, 120,
            200,  70, 120,
            200,  70, 120,
            200,  70, 120,

            // middle rung front
            200,  70, 120,
            200,  70, 120,
            200,  70, 120,
            200,  70, 120,
            200,  70, 120,
            200,  70, 120,

            // left column back
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,

            // top rung back
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,

            // middle rung back
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,

            // top
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,

            // top rung right
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,

            // under top rung
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,

            // between top rung and middle
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,

            // top of middle rung
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,

            // right of middle rung
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,

            // bottom of middle rung.
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,

            // right of bottom
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,

            // bottom
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,

            // left side
            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220
        ]),
        gl.STATIC_DRAW
    );
}

async function main(){
    // --- C??digo de inicializacion ---

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

    // color desde el vertex shader.
    let colorLocation = gl.getAttribLocation(program, 'a_color');

    // obtener uniforms
    var matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    let fudgeLocation = gl.getUniformLocation(program, 'u_fudgeFactor');

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // pensar en "gl.ARRAY_BUFFER" = positionBuffer
    setGeometry(gl);

    // Create a buffer for colors.
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    // Put the colors in the buffer.
    setColors(gl);

    var translation = [125, 125, 0];
    var rotation = [0, 0, 0];
    var scale = [1, 1, 1];
    let fudgeFactor = 1;

    drawScene();
    
    // actualizar la posicion
    window.addEventListener("keydown", (event) =>{
        if(event.code=='ArrowUp' || event.code=='ArrowDown'){
            translation[1] += keys[event.code];
        }

        if(event.code=='ArrowLeft' || event.code=='ArrowRight'){
            translation[0] += keys[event.code];
        }
        
        drawScene();
    });

    // actualizar la rotacion
    [
        {'element':document.getElementById("rotationRangeX"),'innerHtml':'rotate x'},
        {'element':document.getElementById("rotationRangeY"),'innerHtml':'rotate y'},
        {'element':document.getElementById("rotationRangeZ"),'innerHtml':'rotate z'}
    ].forEach((item, i, l)=>{
        let div = item.element.parentElement;
        let spanValue = {'spanHtml':div.getElementsByTagName("span")[0],'desc':item.innerHtml};
        item.element.addEventListener('input',(e)=>{
            spanValue.spanHtml.innerHTML = spanValue.desc +' '+ e.target.value;
            var angleInDegrees = 360 - e.target.value;
            rotation[i] = angleInDegrees * Math.PI/180; // ??ngulo en radianes
            drawScene();
        })
    });

    // actualizar el escalado
    [
        {'element':document.getElementById("myRangeScalex"),'innerHtml':'scale x'},
        {'element':document.getElementById("myRangeScaley"),'innerHtml':'scale y'},
        {'element':document.getElementById("myRangeScalez"),'innerHtml':'scale z'}
    ].forEach((item,i,l)=>{
        let div = item.element.parentElement;
        let spanValue = {'spanHtml':div.getElementsByTagName("span")[0],'desc':item.innerHtml};
        item.element.addEventListener('input', (e)=>{
            spanValue.spanHtml.innerHTML = spanValue.desc+' '+e.target.value;
            scale[i] = e.target.value;
            drawScene();
        })
    });

    // actualizar fudgeFactor
    [
        {'element':document.getElementById('fudgeFactorRange'), 'innerHtml':'fudgeFactor'}
    ].forEach((item, i, l) => {
        let div = item.element.parentElement;
        let spanValue = {'spanHtml':div.getElementsByTagName("span")[0], 'desc':item.innerHtml};
        item.element.addEventListener('input', (e)=>{
            spanValue.spanHtml.innerHTML = spanValue.desc+' '+e.target.value;
            fudgeFactor = e.target.value;
            drawScene();
        })
    });
    
    
    function drawScene() {
        initResize(gl.canvas)
        resizeCanvasToDisplaySize(gl.canvas);
    
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
    
        // limpiar el canvas y el depth buffer
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);
    
        // Turn on the attribute
        gl.enableVertexAttribArray(positionLocation);
        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 3;          // 3 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

        // Turn on the color attribute
        gl.enableVertexAttribArray(colorLocation);
        // Bind the color buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
        var size = 3;                 // 3 components per iteration
        var type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned values
        var normalize = true;         // normalize the data (convert from 0-255 to 0-1)
        var stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;               // start at the beginning of the buffer
        gl.vertexAttribPointer(colorLocation, size, type, normalize, stride, offset);
    
        // Procesando las matrices en un orden espec??fico
        var left = 0;
        var right = gl.canvas.clientWidth;
        var bottom = gl.canvas.clientHeight;
        var top = 0;
        var near = 400;
        var far = -400;
        let matrix = m4.orthographic(left, right, bottom, top, near, far);
        // let matrix = m4.projection(right, bottom, 400);
        matrix = m4.translate(matrix, translation[0], translation[1], translation[2]);
        matrix = m4.xRotate(matrix, rotation[0]);
        matrix = m4.yRotate(matrix, rotation[1]);
        matrix = m4.zRotate(matrix, rotation[2]);
        matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);

        // asignarle el valor a los uniforms
        gl.uniformMatrix4fv(matrixLocation, false, matrix);
        gl.uniform1f(fudgeLocation,fudgeFactor);

        // dibujar la figura geometrica
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 16*6; // 6 triangulos para la F, por ende 3 vertices por triangulo.
        gl.drawArrays(primitiveType, offset, count);
    }
}

main();