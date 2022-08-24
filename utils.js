
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

    console.log(gl.getShaderInfoLog(shader));
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

    console.log(gl.getProgramInfoLog(program));
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
