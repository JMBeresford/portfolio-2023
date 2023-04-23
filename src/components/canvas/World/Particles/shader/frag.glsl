varying float vProgress;

void main() {
  vec3 color = vec3(1.0);
  float mask = max(1.0 - distance(gl_PointCoord, vec2(0.5)) * 2.0, 0.0);

  float fade = smoothstep(0.0, 0.05, vProgress) * smoothstep(1.0, 0.95, vProgress);

  float opacity = smoothstep(0.0, 0.25, mask) * 0.5 * fade;

  gl_FragColor = vec4(color * opacity, opacity);
}