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
  float t = uTime * 0.125;
  float progress = pow(fract(t * aSpeed), 3.0);
  vec3 convergePoint = vec3(mix(uConvergeTo.x, position.x, 0.15), mix(uConvergeTo.y, position.y, 0.15), uConvergeTo.z);
  vec3 pos = mix(position * rotateZ(t), convergePoint, progress);

  float fade = smoothstep(0.1, 0.2, progress);
  float attenuation = 100.0 / (1.0 + 0.1 * distance(pos, cameraPosition));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = fade * attenuation;

  vProgress = progress;
}