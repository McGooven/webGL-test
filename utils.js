let canvasToDisplaySizeMap;
let resizeObserver;

function initResize(canvas){
    canvasToDisplaySizeMap = new Map([[canvas, [420, 420]]]);
    resizeObserver = new ResizeObserver(this.onResize);

    try {
        // only call us of the number of device pixels changed
        resizeObserver.observe(canvas, {box: 'device-pixel-content-box'});
    } catch (ex) {
        // device-pixel-content-box is not supported so fallback to this
        resizeObserver.observe(canvas, {box: 'content-box'});
    }
}

function onResize(entries){
    for(const entry of entries){
        let width;
        let height;
        let dpr = window.devicePixelRatio;
        if(entry.devicePixelContentBoxSize){
            width = entry.devicePixelContentBoxSize[0].inlineSize;
            height = entry.devicePixelContentBoxSize[0].blockSize;
            dpr = 1;
        }else if(entry.contentBoxSize){
            if (entry.contentBoxSize[0]) {
                width = entry.contentBoxSize[0].inlineSize;
                height = entry.contentBoxSize[0].blockSize;
            } else {
                width = entry.contentBoxSize.inlineSize;
                height = entry.contentBoxSize.blockSize;
            }
        }else {
            width = entry.contentRect.width;
            height = entry.contentRect.height;
        }

        const displayWidth = Math.round(width * dpr);
        const displayHeight = Math.round(height * dpr);
        canvasToDisplaySizeMap.set(entry.target, [displayWidth, displayHeight]);
    }
}

function resizeCanvasToDisplaySize(/** @type {WebGLRenderingContext} */ canvas) {
    const [displayWidth, displayHeight] = canvasToDisplaySizeMap.get(canvas);
    
    // Check if the canvas is not the same size.
    const needResize = canvas.width  !== displayWidth || canvas.height !== displayHeight;
    
    if (needResize) {
        // Make the canvas the same size
        canvas.width  = displayWidth;
        canvas.height = displayHeight;
    }
    
    return needResize;
}

function loadTextFile(url) {
    return fetch(url).then(response => response.text());
}

function createShader(gl, type, source){
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success){
        return shader;
    }

    console.error("createShader -> ", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return -1;
}

function createProgram(gl, vertexShader, fragmentShader){
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS)

    if(success){
        return program;
    }

    console.error("createProgram ->",gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return -1;
}

function setRectangle(gl, x, y, width, height){
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2]), 
        gl.STATIC_DRAW
    );
}

let m3 = {
    /**
     * |a0 a1 a2|-----|b0 b1 b2|  
     * |a3 a4 a5|--x--|b3 b4 b5|  
     * |a6 a7 a8|-----|b6 b7 b8|  
     * 
     * multiplicacion de dos matrices de 3x3
     * @param {Array} a 
     * @param {Array} b 
     */
    multiplicar:(a, b)=>{
        let a0 = a[0]; let a1 = a[1]; let a2 = a[2];
        let a3 = a[3]; let a4 = a[4]; let a5 = a[5];
        let a6 = a[6]; let a7 = a[7]; let a8 = a[8];

        let b0 = b[0]; let b1 = b[1]; let b2 = b[2];
        let b3 = b[3]; let b4 = b[4]; let b5 = b[5];
        let b6 = b[6]; let b7 = b[7]; let b8 = b[8];

        return [
            b0*a0 + b1*a3 + b2*a6,// }
            b0*a1 + b1*a4 + b2*a7,//  > new row 1
            b0*a2 + b1*a5 + b2*a8,// }

            b3*a0 + b4*a3 + b5*a6,// }
            b3*a1 + b4*a4 + b5*a7,//  > new row 2
            b3*a2 + b4*a5 + b5*a8,// }

            b6*a0 + b7*a3 + b8*a6,// }
            b6*a1 + b7*a4 + b8*a7,//  > new row 3
            b6*a2 + b7*a5 + b8*a8,// }
        ]
    },

    /**
     * Se obtiene la "Matriz de traslación" a partir de un punto 2D (x, y)
     *   
     * @param {number} tx : cantidad (+ o -) a mover el punto en el eje x
     * @param {number} ty : cantidad (+ o -) a mover el punto en el eje y
     * @returns un array que representa la matriz con 9 posiciones
     */
    traslacion:(tx,ty)=>{
        return [
            1, 0, 0,
            0, 1, 0,
            tx, ty, 1
        ]
    },

    /**
     * Se obtiene la "Matriz de rotacion" a partir de un alguno en radianes
     *   
     * @param {number} angleInRadians angulo de la rotacion en radianes
     * @returns un array que representa la matriz con 9 posiciones
     */
    rotacion:(angleInRadians)=>{
        let cos = Math.cos(angleInRadians);
        let sin = Math.sin(angleInRadians);
        return [
            cos,-sin, 0,
            sin, cos, 0,
            0, 0, 1
        ]
    },

    /**
     * Se obtiene la "Matriz de escala" a partir de las cantidades del escalado para x e y.
     *   
     * @param {*} sx monto a escalar en el eje x
     * @param {*} sy monto a escalar en el eje y
     * @returns un array que representa la matriz con 9 posiciones
     */
    escalado:(sx, sy)=>{
        return[
            sx, 0, 0,
            0, sy, 0,
            0,  0, 1
        ]
    }
}