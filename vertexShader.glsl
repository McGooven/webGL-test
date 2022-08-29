// attribute recibe data desde un buffer
attribute vec2 a_position;

uniform mat3 u_matrix;

void main(){
    // multiplica la posicion por la matriz.
    gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
}