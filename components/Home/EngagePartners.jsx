'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const _l = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: delay * 0.08, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }
  })
};

const seoIcon = '/assets/icons/seo.svg';
const socialIcon = '/assets/icons/social.svg';
const webIcon = '/assets/icons/web.svg';
const appIcon = '/assets/icons/app.svg';

const benefits = [
  {
    title: 'Global reach',
    text: 'Take your business beyond Dehradun and India with a stronger presence worldwide.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    )
  },
  {
    title: 'Cost-effective strategies',
    text: 'Solutions planned around your budget, your industry and your business goals.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18h6M10 21h4" />
        <path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z" />
      </svg>
    )
  },
  {
    title: 'Enhanced ROI',
    text: 'We keep refining every campaign and system so it returns more over time.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-6" />
      </svg>
    )
  },
  {
    title: 'Targeted precision',
    text: 'The right tools and data to reach, and convert, the customers you want.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    )
  },
  {
    title: 'Instant engagement',
    text: 'We monitor and respond to customer needs to keep conversations moving.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.4A8.5 8.5 0 1 1 21 12z" />
      </svg>
    )
  },
  {
    title: 'Brand credibility',
    text: 'Government-backed experience that builds trust and authority in your market.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    )
  }
];

const labels = [
  { text: 'SEO', icon: seoIcon, x: 8, y: 22 },
  { text: 'Social Media', icon: socialIcon, x: 90, y: 27 },
  { text: 'Web Development', icon: webIcon, x: 5, y: 72 },
  { text: 'Mobile Apps', icon: appIcon, x: 92, y: 78 }
];

// Chain link geometry curve definition matching drdesign-website.html
class ChainLinkCurve extends THREE.Curve {
  constructor(r, h) {
    super();
    this.r = r;
    this.h = h;
  }
  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const { r, h } = this;
    const s = Math.PI * r;
    const o = 4 * h + 2 * s;
    let a = t * o;
    if (a < 2 * h) return optionalTarget.set(r, -h + a, 0);
    a -= 2 * h;
    if (a < s) {
      const u = a / r;
      return optionalTarget.set(r * Math.cos(u), h + r * Math.sin(u), 0);
    }
    a -= s;
    if (a < 2 * h) return optionalTarget.set(-r, h - a, 0);
    a -= 2 * h;
    const l = Math.PI + a / r;
    return optionalTarget.set(r * Math.cos(l), -h + r * Math.sin(l), 0);
  }
}

const uo = { r: 0.56, h: 0.46, tube: 0.18 };
const KD = 2 * (uo.h + uo.r) - 2.9 * uo.tube;

function initChainLinkDial(container, options = {}) {
  const {
    colors = ['#1f5fd8', '#4cc0d0', '#a9e3ec'],
    particleColors = ['#1a5fd0', '#5bc4d0', '#f5b82e', '#ffffff', '#0b3f9e'],
    reduceMotion = false
  } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setClearColor(0, 0);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const roomEnv = new RoomEnvironment();
  const envTexture = pmremGenerator.fromScene(roomEnv, 0.04).texture;
  scene.environment = envTexture;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.2, 11);

  // Hemisphere Light (sky: #ffffff, ground: #bfeef6, intensity: 0.55)
  scene.add(new THREE.HemisphereLight(0xffffff, 0xbfeef6, 0.55));

  // Key Directional Light
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(-3.5, 6, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.radius = 14;
  keyLight.shadow.blurSamples = 20;
  keyLight.shadow.camera.left = -4;
  keyLight.shadow.camera.right = 4;
  keyLight.shadow.camera.top = 4;
  keyLight.shadow.camera.bottom = -4;
  scene.add(keyLight);

  // Fill Light
  const fillLight = new THREE.DirectionalLight(0x9fe3ec, 1.1);
  fillLight.position.set(4, -2, -4);
  scene.add(fillLight);

  // Shadow receiving plane
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 14),
    new THREE.ShadowMaterial({ opacity: 0.16, color: 0x2c5866 })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -2.75;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  const assembly = new THREE.Group();
  const tiltGroup = new THREE.Group();
  tiltGroup.rotation.set(0.12, 0, -0.42);
  assembly.add(tiltGroup);
  scene.add(assembly);

  const tubeGeo = new THREE.TubeGeometry(new ChainLinkCurve(uo.r, uo.h), 260, uo.tube, 40, true);
  const materials = colors.map((c) =>
    new THREE.MeshPhysicalMaterial({
      color: c,
      metalness: 0.45,
      roughness: 0.14,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      envMapIntensity: 1.25
    })
  );

  colors.forEach((_, idx) => {
    const mesh = new THREE.Mesh(tubeGeo, materials[idx]);
    mesh.position.y = (1 - idx) * KD;
    mesh.rotation.y = idx % 2 ? Math.PI / 2 : 0;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    tiltGroup.add(mesh);
  });

  // Floating Spheres
  const sphereGeo = new THREE.SphereGeometry(1, 40, 40);
  const floatingSpheres = [];
  [
    [-1.9, 1.2, 0.8, 0.15],
    [1.7, 0.7, -0.6, 0.2],
    [0.9, -1.4, 1.2, 0.13],
    [-1.3, -0.4, -1.1, 0.1],
    [2.1, -1.6, 0.4, 0.12],
    [-0.6, 2.3, -0.4, 0.09],
    [1.2, 2.0, 0.9, 0.08]
  ].forEach(([x, y, z, scale], idx) => {
    const sphereMesh = new THREE.Mesh(
      sphereGeo,
      new THREE.MeshPhysicalMaterial({
        color: particleColors[idx % particleColors.length],
        metalness: 0.3,
        roughness: 0.15,
        clearcoat: 1,
        envMapIntensity: 1.2
      })
    );
    sphereMesh.scale.setScalar(scale);
    sphereMesh.position.set(x, y, z);
    sphereMesh.castShadow = true;
    sphereMesh.userData = {
      base: new THREE.Vector3(x, y, z),
      phase: idx * 1.7,
      speed: 0.5 + (idx % 3) * 0.18
    };
    scene.add(sphereMesh);
    floatingSpheres.push(sphereMesh);
  });

  // Background Particle Dust
  const particleCount = 70;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const r = 2.2 + Math.random() * 1.6;
    particlePositions.set([Math.cos(theta) * r, (Math.random() - 0.5) * 5, Math.sin(theta) * r], i * 3);
  }
  const particlesGeo = new THREE.BufferGeometry();
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particlesMesh = new THREE.Points(
    particlesGeo,
    new THREE.PointsMaterial({
      color: 0x7fcce3,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    })
  );
  scene.add(particlesMesh);

  const state = {
    yaw: 0.35,
    pitch: 0,
    vYaw: 0,
    vPitch: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    idleSpeed: reduceMotion ? 0 : 0.0035,
    running: true
  };

  const handleResize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  handleResize();

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(container);

  const timer = new THREE.Timer();
  let animId = 0;
  let onFrameCallback = null;

  const animate = () => {
    animId = requestAnimationFrame(animate);
    if (!state.running) return;

    timer.update();
    const elapsedTime = timer.getElapsed();
    if (!state.dragging) {
      state.vYaw *= 0.94;
      state.vPitch *= 0.9;
      state.yaw += state.vYaw + state.idleSpeed;
      state.pitch += state.vPitch;
      state.pitch *= 0.97;
    }
    state.pitch = Math.max(-0.6, Math.min(0.6, state.pitch));

    assembly.rotation.y = state.yaw;
    assembly.rotation.x = state.pitch;

    if (!reduceMotion) {
      assembly.position.y = Math.sin(elapsedTime * 1.1) * 0.08;
    }

    floatingSpheres.forEach((sp) => {
      const { base, phase, speed } = sp.userData;
      sp.position.set(
        base.x + Math.cos(elapsedTime * speed + phase) * 0.18,
        base.y + Math.sin(elapsedTime * speed * 1.3 + phase) * 0.22,
        base.z + Math.sin(elapsedTime * speed + phase) * 0.18
      );
    });

    particlesMesh.rotation.y = elapsedTime * 0.03 + state.yaw * 0.25;

    renderer.render(scene, camera);

    if (onFrameCallback) {
      onFrameCallback(state);
    }
  };

  animate();

  return {
    pointerDown(x, y) {
      state.dragging = true;
      state.lastX = x;
      state.lastY = y;
      state.vYaw = 0;
      state.vPitch = 0;
    },
    pointerMove(x, y) {
      if (!state.dragging) return;
      const dx = x - state.lastX;
      const dy = y - state.lastY;
      state.lastX = x;
      state.lastY = y;
      state.vYaw = dx * 0.009;
      state.vPitch = dy * 0.006;
      state.yaw += state.vYaw;
      state.pitch += state.vPitch;
    },
    pointerUp() {
      state.dragging = false;
    },
    setRunning(val) {
      state.running = val;
      if (val) timer.update();
    },
    onFrame(fn) {
      onFrameCallback = fn;
    },
    dispose() {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      timer.dispose?.();
      tubeGeo.dispose();
      sphereGeo.dispose();
      particlesGeo.dispose();
      materials.forEach((m) => m.dispose());
      floatingSpheres.forEach((s) => s.material.dispose());
      particlesMesh.material.dispose();
      shadowPlane.geometry.dispose();
      shadowPlane.material.dispose();
      envTexture.dispose();
      roomEnv.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.remove();
      }
    }
  };
}

function ChainDialVisual() {
  const containerRef = useRef(null);
  const canvasHolderRef = useRef(null);
  const dialControllerRef = useRef(null);

  const [yawDeg, setYawDeg] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const holder = canvasHolderRef.current;
    if (!holder) return;

    let controller;
    try {
      controller = initChainLinkDial(holder, { reduceMotion: false });
      dialControllerRef.current = controller;

      controller.onFrame((state) => {
        setYawDeg(((state.yaw * 180) / Math.PI) * 0.35);
      });

      const observer = new IntersectionObserver(
        ([entry]) => {
          controller.setRunning(entry.isIntersecting);
        },
        { threshold: 0 }
      );
      observer.observe(holder);

      return () => {
        observer.disconnect();
        controller.dispose();
        dialControllerRef.current = null;
      };
    } catch (err) {
      console.warn('ChainLinkDial: WebGL initialization failed', err);
    }
  }, []);

  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    dialControllerRef.current?.pointerDown(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    dialControllerRef.current?.pointerMove(e.clientX, e.clientY);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setParallax({ x: nx * 14, y: ny * 10 });
    }
  };

  const handlePointerUp = () => {
    dialControllerRef.current?.pointerUp();
  };

  const handlePointerLeave = () => {
    dialControllerRef.current?.pointerUp();
    setParallax({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className="cl-dial relative w-[min(560px,100%)] max-sm:w-[280px] aspect-square mx-auto touch-pan-y select-none cursor-grab active:cursor-grabbing font-['Plus_Jakarta_Sans',sans-serif]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      role="img"
      aria-label="Interactive 3D chain links — drag to rotate"
    >
      {/* Outer Dial Neumorphic Ring */}
      <div className="cl-dial__outer absolute inset-[4%] rounded-full bg-[#eef8fa] shadow-[20px_24px_50px_rgba(20,84,120,0.15),-16px_-16px_40px_rgba(255,255,255,0.95),inset_0_0_0_1px_rgba(255,255,255,0.6)] pointer-events-none" />

      {/* Rotating Dial Compass Ticks */}
      <svg
        className="cl-dial__ticks absolute inset-[4%] w-[92%] h-[92%] pointer-events-none transition-transform duration-75"
        viewBox="0 0 200 200"
        style={{ transform: `rotate(${yawDeg}deg)` }}
        aria-hidden="true"
      >
        {Array.from({ length: 72 }, (_, g) => {
          const isMajor = g % 6 === 0;
          return (
            <line
              key={g}
              x1="100"
              y1={isMajor ? 8 : 10}
              x2="100"
              y2={isMajor ? 17 : 14}
              stroke={isMajor ? '#8fadb6' : '#b4cbd1'}
              strokeWidth={isMajor ? 1.4 : 0.9}
              strokeLinecap="round"
              transform={`rotate(${g * 5} 100 100)`}
            />
          );
        })}
        <circle cx="100" cy="13" r="3.2" fill="#2a8693" transform="rotate(-38 100 100)" />
      </svg>

      {/* Inner Inset Bevel Ring */}
      <div className="cl-dial__inner absolute inset-[19%] rounded-full bg-[#eef8fa] shadow-[inset_10px_12px_24px_rgba(20,84,120,0.1),inset_-10px_-10px_24px_rgba(255,255,255,0.95),0_0_0_10px_rgba(238,248,250,0.9),10px_12px_26px_rgba(20,84,120,0.1)] pointer-events-none" />

      {/* 3D WebGL Three.js Canvas Holder */}
      <div ref={canvasHolderRef} className="cl-dial__canvas absolute top-[6%] right-[12%] bottom-[6%] left-[12%] pointer-events-none [&>canvas]:w-full [&>canvas]:h-full [&>canvas]:block" />

      {/* Drag Hint Pill */}
      <span className="cl-dial__hint absolute top-[21%] left-1/2 -translate-x-1/2 z-[3] inline-flex items-center gap-1.5 max-sm:gap-1 py-[7px] px-3.5 max-sm:py-1 max-sm:px-2.5 max-sm:text-[11.5px] rounded-full bg-[#eef8fa]/85 backdrop-blur-[6px] text-[13px] font-semibold text-[#4a5d70] whitespace-nowrap pointer-events-none shadow-[0_6px_16px_rgba(20,84,120,0.1)]">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        Drag to rotate
      </span>

      {/* 4 Floating Badges with Parallax & Float Animation */}
      {labels.map((item, idx) => {
        const isLeft = item.x < 50;
        const shiftX = isLeft ? -parallax.x : parallax.x;
        const shiftY = parallax.y;

        return (
          <div
            key={item.text}
            className="cl-label absolute z-[4] pointer-events-auto transition-transform duration-200"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(calc(-50% + ${shiftX}px), calc(-50% + ${shiftY}px))`
            }}
          >
            <span
              className="cl-label__inner inline-flex items-center gap-2.5 max-sm:gap-1.5 py-2 pr-[18px] pl-2 max-sm:py-1 max-sm:pr-2.5 max-sm:pl-1 rounded-full bg-[#eef8fa] text-[clamp(12px,1.5vw,15px)] max-sm:text-[11.5px] font-bold text-[#0e1b2e] whitespace-nowrap shadow-[10px_12px_24px_rgba(20,84,120,0.15),-8px_-8px_18px_rgba(255,255,255,0.95)] hover:scale-105 transition-transform duration-200"
              style={{
                animation: `floatBob ${3.6 + idx * 0.4}s ease-in-out infinite`,
                animationDelay: `${idx * 0.3}s`
              }}
            >
              <span className="cl-label__icon w-[clamp(30px,4vw,40px)] max-sm:w-[26px] max-sm:h-[26px] aspect-square rounded-full grid place-items-center bg-white shadow-[inset_2px_2px_5px_rgba(20,84,120,0.12)]">
                <img src={item.icon} alt="" className="w-[66%] h-[66%]" draggable="false" />
              </span>
              {item.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function EngagePartners() {
  return (
    <section className="sec px-5 max-sm:px-0 overflow-hidden" aria-labelledby="eng-title">
      <div className="eng__panel max-w-[1320px] mx-auto flex flex-wrap items-center gap-10 max-sm:gap-6 p-[clamp(28px,5vw,64px)] max-sm:p-[24px_18px] rounded-[44px] max-sm:rounded-[28px] bg-[#e9f5f7] shadow-[24px_30px_60px_rgba(20,84,120,0.14),-18px_-18px_44px_rgba(255,255,255,0.9)] overflow-hidden">
        {/* Left Copy & Benefits Grid */}
        <div className="eng__copy flex-[1_1_460px] min-w-0 flex flex-col gap-[22px]">
          <motion.h2
            id="eng-title"
            className="eng__title m-0 font-['Plus_Jakarta_Sans',sans-serif] text-[clamp(32px,4.2vw,54px)] max-sm:text-[30px] leading-[1.1] font-extrabold tracking-[-0.025em] text-[#0e1b2e]"
            variants={_l}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            Engage with our India{' '}
            <span className="bg-gradient-to-r from-[#1d7f8c] to-[#0b4db5] bg-clip-text text-transparent">
              digital technology partners
            </span>
          </motion.h2>
          <motion.p
            className="eng__lead m-0 text-[17px] leading-[1.75] text-[#44546a] max-w-[600px]"
            variants={_l}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            Our connected approach combines websites, apps, ERP, search visibility and clear brand communication to attract qualified leads and deliver results you can measure.
          </motion.p>

          <ul className="eng__grid list-none m-0 mt-2 p-0 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] max-sm:grid-cols-1 gap-x-7 gap-y-[22px] max-sm:gap-4">
            {benefits.map((item, idx) => (
              <motion.li
                key={item.title}
                className="eng__item group flex gap-3.5 items-start"
                variants={_l}
                custom={idx + 2}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="eng__icon shrink-0 w-[46px] h-[46px] rounded-full grid place-items-center text-[#1d7f8c] bg-[#eef8fa] shadow-[6px_6px_14px_rgba(20,84,120,0.14),-6px_-6px_14px_rgba(255,255,255,0.95)] transition-all duration-300 group-hover:-rotate-8 group-hover:scale-[1.08] group-hover:text-[#0b4db5]">
                  {item.icon}
                </span>
                <span>
                  <strong className="block text-[16px] font-bold text-[#0e1b2e] mb-1">{item.title}</strong>
                  <span className="block text-[14.5px] leading-[1.6] text-[#44546a]">{item.text}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right Interactive 3D Chain Link Dial */}
        <div className="eng__visual flex-[1_1_420px] min-w-0">
          <ChainDialVisual />
        </div>
      </div>
    </section>
  );
}
