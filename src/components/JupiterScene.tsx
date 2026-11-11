import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import jupiterUrl from '../assets/textures/jupiter-4k.jpg';
import sunUrl from '../assets/textures/sun-2k.jpg';

interface JupiterSceneProps {
  active?: boolean;
}

type MoonKind = 'europa' | 'io' | 'ganymede' | 'callisto';

interface MoonSpec {
  kind: MoonKind;
  radius: number;
  orbit: number;
  speed: number;
  phase: number;
  tilt: number;
  color: string;
}

const GALILEAN_MOONS: MoonSpec[] = [
  { kind: 'io', radius: 0.09, orbit: 2.05, speed: 0.22, phase: 2.7, tilt: 0.05, color: '#c9a24a' },
  { kind: 'europa', radius: 0.095, orbit: 2.5, speed: 0.12, phase: 2.12, tilt: -0.04, color: '#d6d0c0' },
  { kind: 'ganymede', radius: 0.13, orbit: 3.0, speed: 0.07, phase: 2.61, tilt: 0.03, color: '#8d8375' },
  { kind: 'callisto', radius: 0.12, orbit: 3.5, speed: 0.035, phase: 2.29, tilt: -0.06, color: '#6b6054' },
];

function makeRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function makeMoonTexture(kind: MoonKind): THREE.CanvasTexture {
  const W = 1024;
  const H = 512;
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const g = cv.getContext('2d');
  if (!g) return new THREE.CanvasTexture(cv);

  const rnd = makeRng(kind.length * 9871 + 17);

  const blob = (x: number, y: number, r: number, color: string) => {
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, color);
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  };

  const crater = (x: number, y: number, r: number) => {
    blob(x, y, r * 1.3, 'rgba(40,34,28,0.30)');
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.strokeStyle = 'rgba(228,218,198,0.26)';
    g.lineWidth = Math.max(1, r * 0.14);
    g.stroke();
    blob(x + r * 0.28, y + r * 0.28, r * 0.75, 'rgba(24,19,15,0.24)');
  };

  if (kind === 'europa') {
    g.fillStyle = '#d6d0c0';
    g.fillRect(0, 0, W, H);
    for (let i = 0; i < 180; i++) {
      blob(
        rnd() * W,
        rnd() * H,
        24 + rnd() * 110,
        `rgba(${150 + Math.floor(rnd() * 45)},${165 + Math.floor(rnd() * 35)},${170 + Math.floor(rnd() * 30)},0.10)`
      );
    }
    for (let i = 0; i < 150; i++) {
      const x = rnd() * W;
      const y = rnd() * H;
      const len = 90 + rnd() * 420;
      const angle = (rnd() - 0.5) * 0.8 + (rnd() < 0.5 ? 0.35 : -0.35);
      g.save();
      g.translate(x, y);
      g.rotate(angle);
      g.beginPath();
      g.moveTo(-len / 2, 0);
      g.bezierCurveTo(-len * 0.2, (rnd() - 0.5) * 34, len * 0.2, (rnd() - 0.5) * 34, len / 2, (rnd() - 0.5) * 12);
      g.strokeStyle = `rgba(${110 + Math.floor(rnd() * 45)},${62 + Math.floor(rnd() * 28)},${44 + Math.floor(rnd() * 24)},${0.24 + rnd() * 0.34})`;
      g.lineWidth = 0.8 + rnd() * 2;
      g.stroke();
      for (let b = 0; b < 2; b++) {
        const bx = (rnd() - 0.5) * len;
        g.beginPath();
        g.moveTo(bx, 0);
        g.lineTo(bx + (rnd() - 0.5) * 46, (rnd() - 0.5) * 64);
        g.strokeStyle = 'rgba(120,70,50,0.30)';
        g.lineWidth = 0.6;
        g.stroke();
      }
      g.restore();
    }
    for (let i = 0; i < 20; i++) crater(rnd() * W, rnd() * H, 3 + rnd() * 12);
  } else if (kind === 'io') {
    g.fillStyle = '#c9a24a';
    g.fillRect(0, 0, W, H);
    const palette = [
      'rgba(236,210,124,0.38)',
      'rgba(184,116,42,0.30)',
      'rgba(244,228,164,0.30)',
      'rgba(150,80,30,0.24)',
      'rgba(214,160,64,0.26)',
    ];
    for (let i = 0; i < 240; i++) {
      blob(rnd() * W, rnd() * H, 18 + rnd() * 120, palette[Math.floor(rnd() * palette.length)]);
    }
    for (let i = 0; i < 80; i++) {
      const x = rnd() * W;
      const y = rnd() * H;
      const r = 2.5 + rnd() * 15;
      blob(x, y, r * 1.6, 'rgba(52,28,14,0.42)');
      blob(x, y, r * 0.8, 'rgba(28,14,8,0.5)');
      g.beginPath();
      g.arc(x, y, r * 1.25, 0, Math.PI * 2);
      g.strokeStyle = 'rgba(240,214,140,0.22)';
      g.lineWidth = 1;
      g.stroke();
    }
  } else if (kind === 'ganymede') {
    g.fillStyle = '#8d8375';
    g.fillRect(0, 0, W, H);
    const polar = g.createLinearGradient(0, 0, 0, H);
    polar.addColorStop(0, 'rgba(214,208,196,0.34)');
    polar.addColorStop(0.18, 'rgba(214,208,196,0)');
    polar.addColorStop(0.82, 'rgba(214,208,196,0)');
    polar.addColorStop(1, 'rgba(214,208,196,0.30)');
    g.fillStyle = polar;
    g.fillRect(0, 0, W, H);
    for (let i = 0; i < 160; i++) {
      blob(
        rnd() * W,
        rnd() * H,
        20 + rnd() * 100,
        rnd() < 0.5 ? 'rgba(62,55,47,0.22)' : 'rgba(196,190,178,0.16)'
      );
    }
    for (let i = 0; i < 70; i++) {
      const x = rnd() * W;
      const y = rnd() * H;
      const len = 60 + rnd() * 260;
      g.save();
      g.translate(x, y);
      g.rotate((rnd() - 0.5) * 0.4);
      g.beginPath();
      g.moveTo(-len / 2, 0);
      g.lineTo(len / 2, 0);
      g.strokeStyle = rnd() < 0.5 ? 'rgba(58,52,45,0.22)' : 'rgba(206,200,188,0.18)';
      g.lineWidth = 0.8 + rnd() * 2;
      g.stroke();
      g.restore();
    }
    for (let i = 0; i < 80; i++) crater(rnd() * W, rnd() * H, 3 + rnd() * 14);
  } else {
    g.fillStyle = '#6b6054';
    g.fillRect(0, 0, W, H);
    for (let i = 0; i < 220; i++) {
      blob(
        rnd() * W,
        rnd() * H,
        18 + rnd() * 110,
        rnd() < 0.55 ? 'rgba(44,38,32,0.24)' : 'rgba(170,160,146,0.14)'
      );
    }
    for (let i = 0; i < 190; i++) crater(rnd() * W, rnd() * H, 2.5 + rnd() * 16);
  }

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

function makeCloudTexture(): THREE.CanvasTexture | null {
  const W = 1024;
  const H = 512;
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const g = cv.getContext('2d');
  if (!g) return null;
  const id = g.createImageData(W, H);
  const d = id.data;
  const gw = 64;
  const gh = 32;
  const gridA = new Float32Array(gw * gh);
  const rnd = makeRng(99);
  for (let i = 0; i < gridA.length; i++) gridA[i] = rnd();
  const sm = (t: number) => t * t * (3 - 2 * t);
  const samp = (u: number, v: number) => {
    const fx = u * gw;
    const fy = v * gh;
    const x0 = ((Math.floor(fx) % gw) + gw) % gw;
    const y0 = Math.max(0, Math.min(gh - 1, Math.floor(fy)));
    const x1 = (x0 + 1) % gw;
    const y1 = Math.min(gh - 1, y0 + 1);
    const tx = sm(fx - Math.floor(fx));
    const ty = sm(fy - Math.floor(fy));
    const a = gridA[y0 * gw + x0];
    const b = gridA[y0 * gw + x1];
    const c = gridA[y1 * gw + x0];
    const e = gridA[y1 * gw + x1];
    return (a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + e * tx) * ty;
  };
  for (let y = 0; y < H; y++) {
    const v = y / H;
    const band = 0.5 + 0.5 * Math.sin(v * Math.PI * 9);
    for (let x = 0; x < W; x++) {
      const u = x / W;
      const n =
        0.55 * samp(u, v) +
        0.28 * samp((u * 2) % 1, (v * 2) % 1) +
        0.17 * samp((u * 4) % 1, (v * 4) % 1);
      let a = (n - 0.54) / (0.8 - 0.54);
      a = Math.max(0, Math.min(1, a));
      a = a * a * (3 - 2 * a);
      a *= (0.32 + 0.68 * band) * 0.34;
      const i = (y * W + x) * 4;
      d[i] = 255;
      d[i + 1] = 246;
      d[i + 2] = 230;
      d[i + 3] = a * 255;
    }
  }
  g.putImageData(id, 0, 0);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.MirroredRepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

function makeRingTexture(): THREE.CanvasTexture | null {
  const W = 768;
  const H = 8;
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const g = cv.getContext('2d');
  if (!g) return null;
  const id = g.createImageData(W, H);
  const d = id.data;
  const rnd = makeRng(17);
  for (let x = 0; x < W; x++) {
    const u = x / (W - 1);
    let band =
      0.5 +
      0.22 * Math.sin(u * 11) +
      0.14 * Math.sin(u * 29 + 1) +
      0.06 * Math.sin(u * 70) +
      0.05 * (rnd() - 0.5);
    band = Math.max(0, Math.min(1, band));
    let gap = 1;
    if (u > 0.42 && u < 0.455) gap = 0.1;
    if (u > 0.68 && u < 0.7) gap = 0.3;
    const edge = Math.min(1, Math.min(u / 0.05, (1 - u) / 0.05));
    const a = Math.max(0, band * gap * edge) * 0.3;
    const r = 196 + 44 * band;
    const gg = 178 + 38 * band;
    const b = 150 + 32 * band;
    for (let y = 0; y < H; y++) {
      const i = (y * W + x) * 4;
      d[i] = r;
      d[i + 1] = gg;
      d[i + 2] = b;
      d[i + 3] = a * 255;
    }
  }
  g.putImageData(id, 0, 0);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

function makeGlowTexture(): THREE.CanvasTexture | null {
  const S = 256;
  const cv = document.createElement('canvas');
  cv.width = S;
  cv.height = S;
  const g = cv.getContext('2d');
  if (!g) return null;
  const gr = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  gr.addColorStop(0, 'rgba(255,236,205,0.75)');
  gr.addColorStop(0.3, 'rgba(255,214,160,0.32)');
  gr.addColorStop(0.66, 'rgba(230,170,110,0.08)');
  gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, S, S);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function JupiterScene({ active = true }: JupiterSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    const isCompact = window.innerWidth < 900;
    let quality = Math.min(window.devicePixelRatio, isCompact ? 1.25 : 1.5);
    renderer.setPixelRatio(quality);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.04;

    const maxAniso = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 4.25);

    const group = new THREE.Group();
    group.position.set(1.25, -0.32, 0);
    group.rotation.set(0.36, 0, 0.34);
    scene.add(group);

    const lightDir = new THREE.Vector3(-0.32, 0.42, 0.86).normalize();
    const sunLight = new THREE.DirectionalLight(0xfff2e0, 3.2);
    sunLight.position.copy(lightDir).multiplyScalar(12);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x26303a, 0.5));
    scene.add(new THREE.HemisphereLight(0xbfd2e6, 0x1a0f08, 0.38));

    const planetBody = new THREE.Group();
    planetBody.scale.set(1, 0.94, 1);
    group.add(planetBody);

    const planetMat = new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: null },
        uHasMap: { value: 0 },
        uLight: { value: lightDir },
      },
      vertexShader: `
        varying vec3 vN; varying vec3 vV; varying vec2 vUv;
        void main(){ vUv = uv; vN = normalize(normalMatrix*normal);
          vec4 mv = modelViewMatrix*vec4(position,1.0); vV = mv.xyz;
          gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `
        uniform sampler2D uMap; uniform float uHasMap; uniform vec3 uLight;
        varying vec3 vN; varying vec3 vV; varying vec2 vUv;

        float luma(vec3 c){ return dot(c, vec3(0.299,0.587,0.114)); }

        void main(){
          vec3 col = texture2D(uMap, vUv).rgb;
          if(uHasMap < 0.5) col = vec3(0.38,0.30,0.22);

          float lum = luma(col);
          col = mix(vec3(lum), col, 1.28);

          vec3 N = normalize(vN);
          float ndl = dot(N, normalize(uLight));
          float lit = smoothstep(-0.08, 0.6, ndl);
          col *= (0.07 + 0.93 * lit);

          float limb = pow(max(ndl, 0.0), 0.36);
          col *= mix(0.58, 1.0, limb);

          vec3 V = normalize(-vV);
          float fres = pow(1.0 - max(dot(normalize(vN), V), 0.0), 2.2);
          col = mix(col, vec3(0.8, 0.7, 0.54), fres * 0.13 * smoothstep(-0.1, 0.5, ndl));

          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });

    const planet = new THREE.Mesh(new THREE.SphereGeometry(1.55, 160, 160), planetMat);
    planetBody.add(planet);

    const jupiterTex = new THREE.TextureLoader().load(jupiterUrl, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAniso;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      planetMat.uniforms.uMap.value = tex;
      planetMat.uniforms.uHasMap.value = 1;
    });
    jupiterTex.colorSpace = THREE.SRGBColorSpace;

    const atmoMat = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vN; varying vec3 vV;
        void main(){ vN = normalize(normalMatrix*normal);
          vec4 mv = modelViewMatrix*vec4(position,1.0); vV = mv.xyz;
          gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `
        varying vec3 vN; varying vec3 vV;
        void main(){
          vec3 V = normalize(-vV);
          float f = pow(1.0 - abs(dot(normalize(vN), V)), 3.0);
          gl_FragColor = vec4(vec3(0.86, 0.72, 0.52) * f * 0.55, f * 0.34);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.FrontSide,
    });
    const atmo = new THREE.Mesh(new THREE.SphereGeometry(1.575, 48, 48), atmoMat);
    atmo.renderOrder = 3;
    planetBody.add(atmo);

    const cloudTex = makeCloudTexture();
    if (cloudTex) {
      cloudTex.anisotropy = maxAniso;
      const cloudMat = new THREE.MeshStandardMaterial({
        map: cloudTex,
        transparent: true,
        depthWrite: false,
        roughness: 1,
        metalness: 0,
        opacity: 0.14,
      });
      const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.562, 80, 80), cloudMat);
      clouds.rotation.z = 0.04;
      clouds.renderOrder = 2;
      planetBody.add(clouds);
      planetBody.userData.clouds = clouds;
    }

    const ringMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      uniforms: {
        uRing: { value: makeRingTexture() },
        uInner: { value: 1.72 },
        uOuter: { value: 1.95 },
      },
      vertexShader: `varying vec3 vL; void main(){ vL=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: `
        uniform sampler2D uRing; uniform float uInner; uniform float uOuter; varying vec3 vL;
        void main(){
          float r = length(vL.xy);
          float u = clamp((r-uInner)/(uOuter-uInner), 0.0, 1.0);
          vec4 c = texture2D(uRing, vec2(u,0.5));
          if(c.a < 0.01) discard;
          gl_FragColor = vec4(c.rgb, c.a * 0.55);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.72, 1.95, 192, 1), ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.renderOrder = 1;
    group.add(ring);

    const glowTex = makeGlowTexture();
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.32,
      })
    );
    glow.scale.set(10, 10, 1);
    glow.position.set(0, 0, -1.6);
    group.add(glow);

    const animatedMoons: Array<{ orbit: THREE.Group; mesh: THREE.Mesh; speed: number; phase: number; kind: string }> = [];

    for (const spec of GALILEAN_MOONS) {
      const orbit = new THREE.Group();
      orbit.rotation.x = spec.tilt;
      group.add(orbit);

      const tex = makeMoonTexture(spec.kind);
      tex.anisotropy = maxAniso;
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        color: 0xffffff,
        roughness: 0.95,
        metalness: 0,
        bumpMap: tex,
        bumpScale: 0.0035,
      });
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(spec.radius, 32, 32), mat);
      mesh.position.x = spec.orbit;
      orbit.add(mesh);
      animatedMoons.push({ orbit, mesh, speed: spec.speed, phase: spec.phase, kind: spec.kind });
    }

    const smallMoonGeo = new THREE.SphereGeometry(1, 8, 6);
    const smallMoonMat = new THREE.MeshStandardMaterial({ color: 0x8a8175, roughness: 1, metalness: 0 });
    const smallRnd = makeRng(4242);
    for (let i = 0; i < 18; i++) {
      const orbit = new THREE.Group();
      orbit.rotation.x = (smallRnd() - 0.5) * 0.5;
      orbit.rotation.z = (smallRnd() - 0.5) * 0.4;
      group.add(orbit);
      const mesh = new THREE.Mesh(smallMoonGeo, smallMoonMat);
      const size = 0.007 + smallRnd() * 0.014;
      mesh.scale.setScalar(size);
      mesh.position.x = 2.3 + smallRnd() * 2.4;
      orbit.add(mesh);
      animatedMoons.push({
        orbit,
        mesh,
        speed: 0.05 + smallRnd() * 0.16,
        phase: smallRnd() * Math.PI * 2,
        kind: `small-${i}`,
      });
    }

    if (import.meta.env.DEV) {
      (window as unknown as { __bloom?: unknown }).__bloom = {
        THREE,
        scene,
        camera,
        moons: animatedMoons,
        renderer,
        planet,
        planetBody,
        clouds: planetBody.userData.clouds,
        atmo,
        ring,
      };
    }

    const sunGroup = new THREE.Group();
    sunGroup.position.set(-2.4, 2.7, -7.2);
    scene.add(sunGroup);

    const sunTex = new THREE.TextureLoader().load(sunUrl, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAniso;
    });
    sunTex.colorSpace = THREE.SRGBColorSpace;
    const sunMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 48, 48),
      new THREE.MeshBasicMaterial({ map: sunTex, color: 0xfff4dc, toneMapped: false })
    );
    sunGroup.add(sunMesh);

    const sunGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: 0xffd9a0,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.9,
        toneMapped: false,
      })
    );
    sunGlow.scale.set(3.2, 3.2, 1);
    sunGroup.add(sunGlow);

    const sunCore = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: 0xfff8e6,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.95,
        toneMapped: false,
        depthTest: false,
      })
    );
    sunCore.scale.set(0.95, 0.95, 1);
    sunCore.renderOrder = 5;
    sunGroup.add(sunCore);

    const sunHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: 0xffb066,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.2,
        toneMapped: false,
      })
    );
    sunHalo.scale.set(9, 9, 1);
    sunGroup.add(sunHalo);

    const onResize = () => {
      quality = Math.min(window.devicePixelRatio, window.innerWidth < 900 ? 1.25 : 1.5);
      renderer.setPixelRatio(quality);
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    onResize();
    window.addEventListener('resize', onResize);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const clockStart = performance.now();
    let raf = 0;
    let sampleStart = performance.now();
    let sampleFrames = 0;
    let qualityChecked = false;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);

      if (!qualityChecked) {
        sampleFrames += 1;
        const elapsed = now - sampleStart;
        if (elapsed > 2600) {
          const fps = sampleFrames / (elapsed / 1000);
          qualityChecked = true;
          if (fps < 42 && quality > 1.25) {
            quality = 1.25;
            renderer.setPixelRatio(quality);
            renderer.setSize(window.innerWidth, window.innerHeight, false);
          } else if (fps < 30 && quality > 1) {
            quality = 1;
            renderer.setPixelRatio(quality);
            renderer.setSize(window.innerWidth, window.innerHeight, false);
          }
        }
      }

      if (!activeRef.current || document.hidden) return;
      const t = (now - clockStart) / 1000;

      planet.rotation.y = t * 0.045;
      const clouds = planetBody.userData.clouds as THREE.Mesh | undefined;
      if (clouds) clouds.rotation.y = t * 0.075;

      for (const item of animatedMoons) {
        item.orbit.rotation.y = t * item.speed + item.phase;
        item.mesh.rotation.y = t * item.speed + item.phase;
      }

      group.position.x = 1.25 + mouse.x * 0.14;
      group.position.y = -0.32 + mouse.y * 0.08 + Math.sin(t * 0.4) * 0.01;

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) {
          mat.forEach((m) => m.dispose());
        } else if (mat) {
          mat.dispose();
        }
      });
      jupiterTex.dispose();
      sunTex.dispose();
      glowTex?.dispose();
      ringMat.uniforms.uRing.value?.dispose();
      planetMat.uniforms.uMap.value?.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="planet3d" ref={canvasRef} />;
}
