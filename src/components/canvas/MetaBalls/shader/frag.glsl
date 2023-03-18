precision highp float;
#define MAX_STEPS 50
#define SURFACE_DIST 0.001
#define MAX_DIST 12.0
#define START vec3(0.0)
#define S smoothstep

uniform vec2 uResolution;
uniform samplerCube envMap;
uniform float uTime;
uniform float envMapIntensity;
uniform float uFov;
uniform float uMix;
uniform int uCount;
uniform int uAO;
uniform float[MAX_SPHERES] uRadii;
uniform float[MAX_SPHERES] uSeeds;
uniform float[MAX_SPHERES] uSpeeds;
uniform vec3[MAX_SPHERES] uEndOffsets;

varying vec2 vUv;

mat3 rotateY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
}

mat3 raymarchCamera(vec3 ro, vec3 ta, vec3 up) {
  vec3 cw = normalize(ta - ro);
  vec3 cp = up;
  vec3 cu = normalize(cross(cw, cp));
  vec3 cv = normalize(cross(cu, cw));
  return mat3(cu, cv, cw);
}

vec3 getEnvMap(vec3 camToPoint, vec3 norm) {
  vec3 n = normalize(norm);
  vec3 r = refract(n, camToPoint, 0.0);
  vec3 envColor = textureCube(envMap, r).rgb;
  float f0 = 0.02;
  vec3 f90 = vec3(1.0);
  vec3 f = f0 + (f90 - f0) * pow(1.0 - max(dot(n, r), 0.0), 3.0);

  vec3 diffuse = envColor * (1.0 / 3.141592);
  vec3 fresnel = f * envColor * 0.7;

  return (diffuse + fresnel) * envMapIntensity;
}

float smin(float a, float b) {
  float h = max(uMix - abs(a - b), 0.0);
  return min(a, b) - h * h * 0.25 / uMix;
}

vec4 getSphere(int i) {
  float radius = uRadii[i];
  float seed = uSeeds[i];
  float speed = uSpeeds[i];
  vec3 end = uEndOffsets[i];

  end *= 1.0 + S(1.0, 0.0, radius) * 2.0;

  float progress = fract((uTime + seed) * 0.1 * speed);
  float distFromMidProgress = 1.0 - (distance(0.5, progress) * 2.0);

  vec3 p = mix(START, end, progress);
  p *= rotateY(uTime * 0.75 * speed);

  radius *= S(0.15, 1.0, distFromMidProgress);

  return vec4(p, radius);
}

float getDist(vec3 p) {
  float d = MAX_DIST;

  vec4 mainSphere = vec4(0.0, 0.0, 0.0, 0.75);
  float dm = length(p - mainSphere.xyz) - mainSphere.w;
  d = smin(d, dm);

  for (int i = 0; i < uCount; i++) {
    vec4 sphere = getSphere(i);
    float di = length(p - sphere.xyz) - sphere.w;
    d = smin(d, di);
  }

  return d;
}

float raymarchAO(vec3 pos, vec3 normal) {
  float occ = 0.0;
  float sca = 0.75;
  for (int i = 0; i < uAO; i++) {
    float hr = 0.01 + 0.12 * float(i) / 5.0;
    vec3 aopos = pos + normal * hr;
    float dd = getDist(aopos);
    occ += (hr - dd) * sca;
    sca *= 0.95;
    if (occ > 0.35)
      break;
  }

  return clamp(1.0 - 3.0 * occ, 0.0, 1.0) / envMapIntensity;
}

float rayMarch(vec3 ro, vec3 rd) {
  float d0 = 0.0;
  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * d0;
    float dS = getDist(p);
    d0 += dS;
    if (dS < SURFACE_DIST) {
      break;
    }

    if (d0 > MAX_DIST) {
      return -1.0;
    }
  }
  return d0;
}

vec3 getNormal(vec3 p) {
  float d = getDist(p);
  vec2 e = vec2(0.001, 0.0);

  float xD = getDist(p + e.xyy);
  float yD = getDist(p + e.yxy);
  float zD = getDist(p + e.yyx);
  vec3 n = normalize(vec3(xD, yD, zD) - d) / e.x;

  return normalize(n);
}

vec3 getLight(vec3 p) {
  vec3 camToPoint = normalize(p - cameraPosition);
  vec3 N = getNormal(p);
  float ao = raymarchAO(p, N);

  return getEnvMap(camToPoint, N) * ao;
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv *= uResolution.xy / uResolution.y;
  vec4 col = vec4(0.0);

  // cam init
  vec3 ro = cameraPosition;
  mat3 cam = raymarchCamera(ro, vec3(0.0), vec3(0.0, 1.0, 0.0));
  vec3 rd = cam * normalize(vec3(uv, uFov));

  // raymarch
  float d = rayMarch(ro, rd);

  if (d == -1.0) {
    return;
  }

  // lighting
  vec3 p = ro + rd * d;
  vec4 light = vec4(getLight(p), 1.0);

  col += light;

  #if defined(TONE_MAPPING)
  col.rgb = toneMapping(col.rgb);
  #endif

  gl_FragColor = vec4(col);
}