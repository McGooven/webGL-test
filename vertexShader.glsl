// attribute recibe data desde un buffer
attribute vec4 a_position;
attribute vec4 a_color;

uniform mat4 u_matrix;

varying vec4 v_color;

void main(){
    // multiplica la posicion por la matriz.
    gl_Position = u_matrix * a_position;

    // pasar el color al fragment shader.
    v_color = a_color;
}