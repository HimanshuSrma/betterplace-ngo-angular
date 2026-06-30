import { AfterViewInit, Component, ElementRef, OnDestroy, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero3d',
  standalone: true,
  template: `<canvas #c class="absolute inset-0 h-full w-full"></canvas>`,
  styles: [`:host { display:block; position:absolute; inset:0; }`]
})
export class Hero3dComponent implements AfterViewInit, OnDestroy {
  @ViewChild('c', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private platformId = inject(PLATFORM_ID);
  private raf = 0;
  private renderer: any;
  private cleanup: (() => void) | null = null;

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const THREE = await import('three');
    const canvas = this.canvas.nativeElement;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0.6, 5.6);
    camera.lookAt(0, 0, 0);

    // India focus point (lon, lat in degrees)
    const INDIA_LON_DEG = 78;
    const INDIA_LAT_DEG = 22;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.toneMappingExposure = 1.05;
    this.renderer = renderer;

    // --- TEXTURE: day map only ---
    const loader = new THREE.TextureLoader();
    const load = (url: string) =>
      new Promise<any>((resolve, reject) => loader.load(url, resolve, undefined, reject));
    // const dayMap = await load('/textures/earth_night.jpg');
    const dayMap = await load('/textures/earth_day.jpg');
    dayMap.colorSpace = THREE.SRGBColorSpace;
    dayMap.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // --- other maps disabled ---
    // const [normalMap, specMap, nightMap, cloudMap] = await Promise.all([
    //   load('/textures/earth_normal.jpg'),
    //   load('/textures/earth_specular.jpg'),
    //   load('/textures/earth_night.jpg'),
    //   load('/textures/earth_clouds.png')
    // ]);
    // nightMap.colorSpace = THREE.SRGBColorSpace;

    // --- EARTH (basic textured sphere, no lighting) ---
    const earthGeo = new THREE.SphereGeometry(1.6, 128, 128);
    const earthMat = new THREE.MeshBasicMaterial({ map: dayMap });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    earth.rotation.order = 'YXZ';
    // bring India (lon=78°E) to front (+Z, camera-facing)
    const baseRotY = -Math.PI / 2 - THREE.MathUtils.degToRad(INDIA_LON_DEG);
    // tilt to lift India (lat=22°N) toward view centre
    const baseRotX = -THREE.MathUtils.degToRad(INDIA_LAT_DEG) * 0.55;
    earth.rotation.y = baseRotY;
    earth.rotation.x = baseRotX;
    earth.rotation.z = THREE.MathUtils.degToRad(8); // subtle tilt, not full 23.4°
    scene.add(earth);

    // --- DAY/NIGHT SHADER (disabled) ---
    // const earthVS = /* glsl */ `
    //   varying vec2 vUv;
    //   varying vec3 vNormal;
    //   varying vec3 vViewPos;
    //   void main(){
    //     vUv = uv;
    //     vNormal = normalize(mat3(modelMatrix) * normal);
    //     vec4 mv = viewMatrix * modelMatrix * vec4(position, 1.0);
    //     vViewPos = mv.xyz;
    //     gl_Position = projectionMatrix * mv;
    //   }
    // `;
    // const earthFS = /* glsl */ `
    //   precision highp float;
    //   varying vec2 vUv;
    //   varying vec3 vNormal;
    //   varying vec3 vViewPos;
    //   uniform sampler2D uDay;
    //   uniform sampler2D uNight;
    //   uniform sampler2D uSpec;
    //   uniform sampler2D uNormal;
    //   uniform vec3 uSunDir;
    //   void main(){
    //     vec3 nMap = texture2D(uNormal, vUv).xyz * 2.0 - 1.0;
    //     vec3 N = normalize(vNormal + nMap * 0.25);
    //     vec3 L = normalize(uSunDir);
    //     float NdotL = dot(N, L);
    //     vec3 dayCol = texture2D(uDay, vUv).rgb;
    //     vec3 nightCol = texture2D(uNight, vUv).rgb * 1.2;
    //     float specMask = 1.0 - texture2D(uSpec, vUv).r;
    //     float dayMix = smoothstep(-0.18, 0.22, NdotL);
    //     vec3 col = mix(nightCol * 0.9, dayCol, dayMix);
    //     float shade = clamp(NdotL, 0.0, 1.0);
    //     col *= mix(1.0, 0.35 + shade, dayMix);
    //     vec3 V = normalize(-vViewPos);
    //     vec3 H = normalize(L + V);
    //     float spec = pow(max(dot(N, H), 0.0), 64.0) * specMask * dayMix;
    //     col += vec3(1.0, 0.95, 0.82) * spec * 0.9;
    //     gl_FragColor = vec4(col, 1.0);
    //   }
    // `;
    // const sunDir = new THREE.Vector3(5, 1.5, 3).normalize();
    // const earthMat = new THREE.ShaderMaterial({
    //   vertexShader: earthVS,
    //   fragmentShader: earthFS,
    //   uniforms: {
    //     uDay: { value: dayMap },
    //     uNight: { value: nightMap },
    //     uSpec: { value: specMap },
    //     uNormal: { value: normalMap },
    //     uSunDir: { value: sunDir }
    //   }
    // });

    // --- CLOUDS shell (disabled) ---
    // const clouds = new THREE.Mesh(
    //   new THREE.SphereGeometry(1.615, 96, 96),
    //   new THREE.MeshLambertMaterial({
    //     map: cloudMap,
    //     transparent: true,
    //     opacity: 0.55,
    //     depthWrite: false
    //   })
    // );
    // earth.add(clouds);

    // --- STARS (disabled) ---
    // const starGeo = new THREE.BufferGeometry();
    // const starCount = 900;
    // const starPos = new Float32Array(starCount * 3);
    // for (let i = 0; i < starCount; i++) {
    //   const r = 22 + Math.random() * 14;
    //   const t = Math.random() * Math.PI * 2;
    //   const p = Math.acos(2 * Math.random() - 1);
    //   starPos[i * 3] = r * Math.sin(p) * Math.cos(t);
    //   starPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
    //   starPos[i * 3 + 2] = r * Math.cos(p);
    // }
    // starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    // const stars = new THREE.Points(
    //   starGeo,
    //   new THREE.PointsMaterial({ color: 0xffffff, size: 0.045, transparent: true, opacity: 0.75 })
    // );
    // scene.add(stars);

    // --- LIGHTS (disabled — MeshBasicMaterial is unlit) ---
    // scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    // const sun = new THREE.DirectionalLight(0xffffff, 1.5);
    // sun.position.copy(sunDir).multiplyScalar(5);
    // scene.add(sun);

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width) * 2 - 1;
      my = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove);

    let pitchTarget = 0;
    let yawDrift = 0;
    let pitchDrift = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      earth.rotation.y += 0.0018 + mx * 0.003;
      pitchTarget += (my * 0.18 - pitchTarget) * 0.06;
      earth.rotation.x = pitchTarget;

      // const t = clock.getElapsedTime();
      // // gentle mouse drift around the locked India view (no auto-spin)
      // yawDrift += (mx * 0.18 - yawDrift) * 0.05;
      // pitchDrift += (my * 0.12 - pitchDrift) * 0.05;
      // earth.rotation.y = baseRotY + yawDrift;
      // earth.rotation.x = baseRotX + pitchDrift;

      // // marker pulse: scale ring outward + fade
      // const p = (t % 2.4) / 2.4;
      // pulse.scale.setScalar(1 + p * 2.8);
      // (pulse.material as any).opacity = 0.6 * (1 - p);
      // // subtle ring breathing
      // const b = 1 + Math.sin(t * 2.2) * 0.06;
      // ring.scale.setScalar(b);

      // clouds.rotation.y += 0.00045;
      // stars.rotation.y += 0.00018;
      renderer.render(scene, camera);
      this.raf = requestAnimationFrame(loop);
    };
    loop();

    this.cleanup = () => {
      cancelAnimationFrame(this.raf);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      earthGeo.dispose();
      earthMat.dispose();
      // ringGeo.dispose();
      // ringMat.dispose();
      // pulseGeo.dispose();
      // pulseMat.dispose();
      // dotMat.dispose();
      // clouds.geometry.dispose();
      // (clouds.material as any).dispose();
      // starGeo.dispose();
      // (stars.material as any).dispose();
      dayMap.dispose();
      // [normalMap, specMap, nightMap, cloudMap].forEach((t: any) => t.dispose());
      renderer.dispose();
    };
  }

  ngOnDestroy() {
    this.cleanup?.();
  }
}
