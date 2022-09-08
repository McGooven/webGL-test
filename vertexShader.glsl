// attribute recibe data desde un buffer
attribute vec4 a_position;

uniform mat4 u_matrix;

void main(){
    // multiplica la posicion por la matriz.
    gl_Position = u_matrix * a_position;
}