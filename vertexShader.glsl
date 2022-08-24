// attribute recibe data desde un buffer
attribute vec2 a_position;

uniform vec2 u_resolution;
uniform vec2 u_translation;

void main(){
    // add in the translation
    vec2 position = a_position + u_translation;

    // convierte la posición desde pixels a 0.0 a 1.0
    vec2 zeroToOne = position / u_resolution;

    // convierte desde 0->1 a 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;

    // convierte  desde 0->2 a -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;

    // gl_Position es una variable especial que necesitan todos los vertexShader
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}