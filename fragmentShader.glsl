// los fragment shader no tienen una precision por defecto
// así que le asignamos uno, mediump es solo uno de ellas.
precision mediump float;

uniform vec4 u_color;

void main(){
    gl_FragColor= u_color;
}