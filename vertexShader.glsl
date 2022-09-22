// attribute recibe data desde un buffer
attribute vec4 a_position;
attribute vec4 a_color;

uniform mat4 u_matrix;
uniform float u_fudgeFactor;

varying vec4 v_color;

void main(){
    // multiplica la posicion por la matriz.
    vec4 position = u_matrix * a_position;

    // ajustar z para usarlo como divisor luego.
    float zToDivideBy = 1.0 + position.z * u_fudgeFactor;

    // dividir x, y por z.
    gl_Position = vec4(position.xyz, zToDivideBy);

    // pasar el color al fragment shader.
    v_color = a_color;
}