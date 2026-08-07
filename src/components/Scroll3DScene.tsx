"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scroll3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 3. 3D Objects
    // TorusKnot Wireframe mesh
    const knotGeometry = new THREE.TorusKnotGeometry(3.5, 0.9, 120, 16);
    const knotMaterial = new THREE.MeshBasicMaterial({
      color: 0x3054ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const torusKnot = new THREE.Mesh(knotGeometry, knotMaterial);
    torusKnot.position.set(6, 2, -5);
    scene.add(torusKnot);

    // Secondary Icosahedron mesh
    const icoGeometry = new THREE.IcosahedronGeometry(2.5, 2);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0xb4c0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    icoMesh.position.set(-7, -4, -8);
    scene.add(icoMesh);

    // 3D Particles Field
    const particleCount = 700;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
      particleScales[i] = Math.random() * 2;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x5876ff,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting (for ambient depth)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3054ff, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 4. Scroll & Mouse Tracking
    let targetScroll = 0;
    let currentScroll = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 5. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      // Smooth interpolation for scroll
      currentScroll += (targetScroll - currentScroll) * 0.05;
      const scrollFactor = currentScroll * 0.0015;

      // Rotate torus knot based on time & scroll
      torusKnot.rotation.x = scrollFactor * 1.5;
      torusKnot.rotation.y = scrollFactor * 2.2 + Date.now() * 0.0003;
      torusKnot.rotation.z = scrollFactor * 0.8;
      torusKnot.position.y = 2 - Math.sin(scrollFactor) * 3;
      torusKnot.position.z = -5 + Math.cos(scrollFactor) * 2;

      // Rotate icosahedron
      icoMesh.rotation.x = -scrollFactor * 1.8 + Date.now() * 0.0002;
      icoMesh.rotation.y = scrollFactor * 1.2;
      icoMesh.position.y = -4 + Math.cos(scrollFactor * 0.8) * 4;

      // Rotate particle field
      particles.rotation.y = scrollFactor * 0.5 + Date.now() * 0.0001;
      particles.rotation.x = scrollFactor * 0.3;

      // Parallax camera rotation with mouse & scroll
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 1.5 - currentScroll * 0.003 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      knotGeometry.dispose();
      knotMaterial.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
    />
  );
}
