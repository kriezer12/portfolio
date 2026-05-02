'use client';

import { useEffect, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  
  const themeRef = useRef(resolvedTheme || theme);

  useLayoutEffect(() => {
    themeRef.current = resolvedTheme || theme;
  }, [theme, resolvedTheme]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Ensure element is inserted synchronously
    containerRef.current.appendChild(renderer.domElement);

    // ... (rest of the particle and ripple logic remains the same)
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
      color: themeRef.current === 'dark' ? 0xffffff : 0x000000
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const rippleGroup = new THREE.Group();
    scene.add(rippleGroup);

    const ringCount = 3;
    const rings: THREE.Mesh[] = [];
    const ringMaterials: THREE.MeshBasicMaterial[] = [];

    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.RingGeometry(1, 1.05, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: themeRef.current === 'dark' ? 0xffffff : 0x000000,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      rippleGroup.add(ringMesh);
      rings.push(ringMesh);
      ringMaterials.push(ringMat);
    }

    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const targetZ = 1000;
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

    let scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let lastScrollY = scrollY;
    let scrollVelocity = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onMouseClick);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const scrollDiff = scrollY - lastScrollY;
      scrollVelocity -= scrollDiff * 0.15;
      lastScrollY = scrollY;
      scrollVelocity *= 0.9;

      target.x += (mouse.x * 15 - target.x) * 0.05;
      target.y += (-mouse.y * 15 - target.y) * 0.05; 
      
      camera.position.x += (target.x - camera.position.x) * 0.05;
      camera.position.y += (target.y - camera.position.y) * 0.05;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
      
      camera.lookAt(scene.position);

      const forwardSpeed = 0.5 + scrollVelocity;
      const positionsArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positionsArray[i * 3 + 2] += forwardSpeed;

        if (positionsArray[i * 3 + 2] > 1200) {
          positionsArray[i * 3 + 2] = -1000;
          positionsArray[i * 3 + 0] = (Math.random() - 0.5) * 2200;
          positionsArray[i * 3 + 1] = (Math.random() - 0.5) * 2200;
        } else if (positionsArray[i * 3 + 2] < -1000) {
          positionsArray[i * 3 + 2] = 1200;
          positionsArray[i * 3 + 0] = (Math.random() - 0.5) * 2200;
          positionsArray[i * 3 + 1] = (Math.random() - 0.5) * 2200;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      if (rippleActive) {
        rippleTime += 0.015;
        rings.forEach((ring, i) => {
          const delay = i * 0.15;
          const t = Math.max(0, rippleTime - delay);
          if (t > 0 && t < 1) {
            const scale = t * 400;
            ring.scale.set(scale, scale, 1);
            ringMaterials[i].opacity = (1 - t) * 0.5;
          } else {
            ringMaterials[i].opacity = 0;
          }
        });
        if (rippleTime > 1.5) rippleActive = false;
      }

      renderer.render(scene, camera);
    };

    animate();

    (containerRef as any)._three = { material, ringMaterials };

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      
      geometry.dispose();
      material.dispose();
      rings.forEach(r => {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
      });
      renderer.dispose();
      
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, []);


  useEffect(() => {
    const three = (containerRef as any)._three;
    if (!three) return;
    
    const isDark = resolvedTheme === 'dark';
    const color = isDark ? 0xffffff : 0x000000;
    
    three.material.color.setHex(color);
    three.material.opacity = isDark ? 0.6 : 0.4;
    three.ringMaterials.forEach((m: THREE.MeshBasicMaterial) => m.color.setHex(color));
  }, [resolvedTheme]);

  return (
    <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2, pointerEvents: 'none' }} />
  );
}