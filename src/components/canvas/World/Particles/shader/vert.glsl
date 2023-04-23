uniform vec3 uConvergeTo;
uniform float uTime;

attribute float aSpeed;

varying float vProgress;

mat3 rotateZ(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
}

void main() {
  float t = uTime * 0.025;
  float progress = pow(fract(t * aSpeed), 10.0);
  vec3 pos = mix(position * rotateZ(t * 2.0), uConvergeTo, progress);

  float attenuation = 100.0 / (1.0 + 0.035 * distance(pos, cameraPosition));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = attenuation;

  vProgress = progress;
}