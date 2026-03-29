import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const CAR_TARGET_HEIGHT = 2.0;

function CarModel({ activeIndex }: { activeIndex: number }) {
  const { scene, animations } = useGLTF("/models/mustang.glb");
  const groupRef = useRef<THREE.Group>(null!);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  const targetRotX = useRef(0);
  const targetRotY = useRef(0);
  const wasRotating = useRef(false);

  // Scale model and set up animation mixer
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    group.scale.setScalar(1);
    group.position.set(0, 0, 0);
    group.rotation.set(0, 0, 0);

    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim === 0) return;

    const scale = CAR_TARGET_HEIGHT / maxDim;
    group.scale.setScalar(scale);
    // Start Position Center horizontally/depth, sit bottom of car on y=0
    group.position.set(
      -center.x * scale,
      (-center.y + size.y / 2) * scale,
      -center.z * scale,
    );

    // Bind mixer to scene (not group) to avoid root-rotation conflicts
    if (animations.length) {
      const mixer = new THREE.AnimationMixer(scene);
      const action = mixer.clipAction(animations[0]);
      actionRef.current = action;
      mixerRef.current = mixer;
    }

    return () => {
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
    };
  }, [scene, animations]);

  // Update target rotation on section change
  useEffect(() => {
    targetRotX.current = activeIndex * (Math.PI / 2);
  }, [activeIndex]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const diff = targetRotX.current - group.rotation.x;
    const rotating = Math.abs(diff) > 0.01;

    // Smooth lerp toward target rotation
    group.rotation.y += diff * Math.min(delta * 0.5, 1);

    if (rotating) {
      mixerRef.current?.update(delta);
      if (!wasRotating.current) {
        actionRef.current?.reset().play();
        wasRotating.current = true;
      }
    } else {
      if (wasRotating.current) {
        actionRef.current?.stop();
        wasRotating.current = false;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/mustang-500.glb");

interface CarSceneProps {
  activeIndex: number;
}

export default function CarScene({ activeIndex }: CarSceneProps) {
  if (window.innerWidth <= 1100) return null;

  return (
    <div className="car-canvas-wrap">
      <Canvas camera={{ position: [0, 1, 4], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <CarModel activeIndex={activeIndex} />
        </Suspense>
      </Canvas>
    </div>
  );
}
