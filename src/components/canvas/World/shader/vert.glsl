varying float vHeight;
varying vec3 vPos;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vHeight = (position.y + 1.0) * 0.5;
  vPos = position;
}
