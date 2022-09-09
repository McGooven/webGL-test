// los fragment shader no tienen una precision por defecto
// así que le asignamos uno, mediump es solo uno de ellas.
precision mediump float;

// pasado desde el vertex shader.
varying vec4 v_color;

void main(){
    gl_FragColor= v_color;
}