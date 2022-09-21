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

let m4 = {
    /**
     * |a0   a1  a2  a3|-----|b0  b1  b2   b3|  
     * |a4   a5  a6  a7|--x--|b4  b5  b6   b7|  
     * |a8   a9 a10 a11|-----|b8  b9  b10 b11|  
     * |a12 a13 a14 a15|     |b12 b13 b14 b15|  
     * 
     * multiplicacion de dos matrices de 4x4
     * @param {Array} a 
     * @param {Array} b 
     */
    multiply:(a, b)=>{
        let a0  =  a[0]; let a1  =  a[1]; let a2  =  a[2]; let a3  =  a[3];
        let a4  =  a[4]; let a5  =  a[5]; let a6  =  a[6]; let a7  =  a[7];
        let a8  =  a[8]; let a9  =  a[9]; let a10 = a[10]; let a11 = a[11];
        let a12 = a[12]; let a13 = a[13]; let a14 = a[14]; let a15 = a[15];

        let b0  =  b[0]; let b1  =  b[1]; let b2  =  b[2]; let b3  =  b[3];
        let b4  =  b[4]; let b5  =  b[5]; let b6  =  b[6]; let b7  =  b[7];
        let b8  =  b[8]; let b9  =  b[9]; let b10 = b[10]; let b11 = b[11];
        let b12 = b[12]; let b13 = b[13]; let b14 = b[14]; let b15 = b[15];

        return [
            b0*a0 + b1*a4 +  b2*a8 + b3*a12,// | new
            b0*a1 + b1*a5 +  b2*a9 + b3*a13,// | row
            b0*a2 + b1*a6 + b2*a10 + b3*a14,// | 1
            b0*a3 + b1*a7 + b2*a11 + b3*a15,// |

            b4*a0 + b5*a4 +  b6*a8 + b7*a12,// | new
            b4*a1 + b5*a5 +  b6*a9 + b7*a13,// | row
            b4*a2 + b5*a6 + b6*a10 + b7*a14,// | 2
            b4*a3 + b5*a7 + b6*a11 + b7*a15,// |

            b8*a0 + b9*a4 +  b10*a8 + b11*a12,// | new
            b8*a1 + b9*a5 +  b10*a9 + b11*a13,// | row
            b8*a2 + b9*a6 + b10*a10 + b11*a14,// | 3
            b8*a3 + b9*a7 + b10*a11 + b11*a15,// |

            b12*a0 + b13*a4 +  b14*a8 + b15*a12,// | new
            b12*a1 + b13*a5 +  b14*a9 + b15*a13,// | row
            b12*a2 + b13*a6 + b14*a10 + b15*a14,// | 4
            b12*a3 + b13*a7 + b14*a11 + b15*a15,// |
        ]
    },

    /**
     * Se obtiene la "Matriz de traslación" a partir de un punto 3D (x, y, z)
     *   
     * @param {number} tx : cantidad (+ o -) a mover el punto en el eje x
     * @param {number} ty : cantidad (+ o -) a mover el punto en el eje y
     * @param {number} tz : cantidad (+ o -) a mover el punto en el eje z
     * @returns un array que representa la matriz con 9 posiciones
     */
    translation:(tx, ty, tz)=>{
        return [
            1,  0,  0,  0,
            0,  1,  0,  0,
            0,  0,  1,  0,
            tx, ty, tz, 1,
        ]
    },

    /**
     * Se obtiene la "Matriz de rotacion" a partir de un alguno en radianes para el eje x
     *   
     * @param {number} angleInRadians angulo de la rotacion en radianes
     * @returns
     */
    xRotation:(angleInRadians)=>{
        let c = Math.cos(angleInRadians);
        let s = Math.sin(angleInRadians);
        return [
            1,  0,  0,  0,
            0,  c,  s,  0,
            0, -s,  c,  0,
            0,  0,  0,  1,
        ]
    },

    /**
     * Se obtiene la "Matriz de rotacion" a partir de un alguno en radianes para el eje y
     *   
     * @param {number} angleInRadians angulo de la rotacion en radianes
     * @returns
     */
    yRotation:(angleInRadians)=>{
        let c = Math.cos(angleInRadians);
        let s = Math.sin(angleInRadians);
        return[
            c,  0, -s,  0,
            0,  1,  0,  0,
            s,  0,  c,  0,
            0,  0,  0,  1,
        ]
    },

    /**
     * Se obtiene la "Matriz de rotacion" a partir de un alguno en radianes para el eje z
     *   
     * @param {number} angleInRadians angulo de la rotacion en radianes
     * @returns
     */
    zRotation:(angleInRadians)=>{
        let c = Math.cos(angleInRadians);
        let s = Math.sin(angleInRadians);
        return[
            c,  s,  0,  0,
            -s, c,  0,  0,
            0,  0,  1,  0,
            0,  0,  0,  1,
        ]
    },

    /**
     * Se obtiene la "Matriz de escalado" a partir de las cantidades del escalado para x, y, z.
     *   
     * @param {*} sx monto a escalar en el eje x
     * @param {*} sy monto a escalar en el eje y
     * @param {*} sz monto a escalar en el eje z
     * @returns un array que representa la matriz con 16 posiciones
     */
    scaling:(sx, sy, sz)=>{
        return[
            sx, 0,  0,  0,
            0, sy,  0,  0,
            0,  0, sz,  0,
            0,  0,  0,  1,
        ]
    },

    /**
     * --- obsoleto ---
     * funcion para invertir la y en el 2d
     * @param {number} width 
     * @param {number} height 
     * @param {number} depth 
     * @returns 
     */
    projection: function(width, height, depth) {
        return [
            2/width, 0, 0, 0,
            0, -2/height, 0, 0,
            0, 0, 2/depth, 0,
            -1, 1, 0, 1,
        ];
    },
    
    orthographic:(left, right, bottom, top, near, far)=>{
        return [
            2/(right - left), 0, 0, 0,
            0, 2/(top - bottom), 0, 0,
            0, 0, 2/(near - far), 0,
       
            (left + right)/(left - right),
            (bottom + top)/(bottom - top),
            (near + far)/(near - far),
            1,
          ];
    },

    translate:(m, tx, ty, tz)=>{
        return m4.multiply(m, m4.translation(tx, ty, tz));
    },

    xRotate: (m, angleInRadians)=>{
        return m4.multiply(m, m4.xRotation(angleInRadians));
    },

    yRotate: (m, angleInRadians)=>{
        return m4.multiply(m, m4.yRotation(angleInRadians));
    },

    zRotate: (m, angleInRadians)=>{
        return m4.multiply(m, m4.zRotation(angleInRadians));
    },

    scale: (m, sx, sy, sz)=>{
        return m4.multiply(m, m4.scaling(sx, sy, sz));
    }
}