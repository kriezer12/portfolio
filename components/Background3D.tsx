'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme || theme);

  useEffect(() => {
    themeRef.current = resolvedTheme || theme;
  }, [theme, resolvedTheme]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // --- Particles ---
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2200;
      sizes[i] = Math.random() * 3 + 1.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 3,
      transparent: true,
      opacity: 0.6,
      blending: THREE.NormalBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- Multi-Ring Water Ripple ---
    const rippleGroup = new THREE.Group();
    scene.add(rippleGroup);

    const ringCount = 3;
    const rings: THREE.Mesh[] = [];
    const ringMaterials: THREE.MeshBasicMaterial[] = [];

    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.RingGeometry(1, 1.05, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      rippleGroup.add(ringMesh);
      rings.push(ringMesh);
      ringMaterials.push(ringMat);
    }

    // --- State ---
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let targetZ = 1000;
    let rippleActive = false;
    let rippleTime = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const onMouseClick = (event: MouseEvent) => {
      const vec = new THREE.Vector3();
      const pos = new THREE.Vector3();
      vec.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
      vec.unproject(camera);
      vec.sub(camera.position).normalize();
      const distance = -camera.position.z / vec.z;
      pos.copy(camera.position).add(vec.multiplyScalar(distance));
      
      rippleGroup.position.copy(pos);
      rippleTime = 0;
      rippleActive = true;
    };

    const onScroll = () => {
      targetZ = 1000 + window.scrollY * 0.6;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

    const animate = () => {
      requestAnimationFrame(animate);

      target.x += (mouse.x * 150 - target.x) * 0.05;
      target.y += (-mouse.y * 150 - target.y) * 0.05;
      camera.position.x += (target.x - camera.position.x) * 0.05;
      camera.position.y += (target.y - camera.position.y) * 0.05;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
      camera.lookAt(scene.position);

      const isDark = themeRef.current === 'dark';
      material.color.setHex(isDark ? 0xffffff : 0x000000);
      material.opacity = isDark ? 0.6 : 0.4;

      particles.rotation.y += 0.0003;

      if (rippleActive) {
        rippleTime += 0.015;
        rings.forEach((ring, i) => {
          const delay = i * 0.15;
          const t = Math.max(0, rippleTime - delay);
          if (t > 0 && t < 1) {
            const scale = t * 400;
            ring.scale.set(scale, scale, 1);
            ringMaterials[i].opacity = (1 - t) * 0.5;
            ringMaterials[i].color.setHex(isDark ? 0xffffff : 0x000000);
          } else {
            ringMaterials[i].opacity = 0;
          }
        });
        if (rippleTime > 1.5) rippleActive = false;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2, pointerEvents: 'none' }} />
  );
}
