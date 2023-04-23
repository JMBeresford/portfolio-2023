precision highp float;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform float uTime;
uniform float uDarkness;

varying vec3 vPos;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)
#pragma glslify: blendGlow = require(glsl-blend/glow)
#pragma glslify: blendLighten = require(glsl-blend/lighten)

mat2 rotate(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

vec2 cartesionToPolar(vec3 p) {
  float r = length(p);
  float theta = atan(p.z, p.x);
  float phi = acos(p.y / r);
  return vec2(theta, phi);
}

vec3 sphericalToCartesian(float r, float theta, float phi) {
  float x = r * sin(phi) * sin(theta);
  float y = r * cos(phi);
  float z = r * sin(phi) * cos(theta);
  return vec3(x, y, -z);
}

void main() {
  vec3 colors[5] = vec3[](uColor1, uColor2, uColor3, uColor4, uColor5);
  vec3 color = uColor3 * 0.015;
  vec3 palette = uColor1;
  float t = (uTime + 10000.0) * 0.1;

  vec2 st = cartesionToPolar(vPos * 0.5);
  vec2 colorsSt = cartesionToPolar(vPos * 0.5);
  #pragma unroll_loop
  for (int i = 1; i < 5; i++) {
    float speed = 1.0 + float(i) * 0.3;
    float flow = 8.0 + float(i) * 0.3;
    float n = snoise3(vec3(colorsSt.x + t * 0.08 * flow, colorsSt.y + t * 0.02 * flow, t * 0.25 * speed));

    palette = mix(palette, colors[i], smoothstep(0.0, 1.0, n));
  }

  vec3 sphere = sphericalToCartesian(1.0, 0.0, 45.35);
  float d = distance(vPos, sphere);

  float startBlackHole = 0.825;
  float blackHole = smoothstep(startBlackHole, startBlackHole + 0.015, 1.0 - d);

  vec2 rimSt = st;
  rimSt *= rotate(pow((1.0 - d) * 1.25, 3.0));
  float waves = 0.0;// snoise3(vec3((rimSt * 8.0), t)) * 1.25;
  float startRim = startBlackHole - 0.0925;
  float endRim = startRim + 0.105; // + (waves * 0.015);

  float blackHoleFade = smoothstep(0.1, 0.15, d);
  blackHole *= clamp(1.0 - blackHoleFade * waves, 0.0, 1.0);

  float rim = smoothstep(startRim, endRim, 1.0 - d) - (blackHole * 1.1);

  rim = max(pow(rim * 1.2, 25.5), 0.01);

  float glow = max(min(pow(0.2 / d, 5.5), 1.0) - blackHole * 0.95, 0.0);

  color += palette * rim;
  color += palette * glow;
  color += 0.15 * max((palette - blackHole), 0.0);
  color += palette * smoothstep(0.0, 0.05, vPos.z) * 0.5;

  float fog = smoothstep(0.05, -0.05, vPos.y - log(abs(vPos.x * 0.065) + 1.0));
  vec3 fogColor = vec3(0.0);

  color *= 1.0 - fog;
  // color = vec3(1.0 - length(vPos - sphere) * 20.0);

  gl_FragColor = vec4(color, 1.0);

  #include <tonemapping_fragment>
  #include <encodings_fragment>
}
