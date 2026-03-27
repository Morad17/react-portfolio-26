import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

const TARGET_SIZE = 4; // all models normalised to fit a 2-unit cube

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // Reset before measuring so previous model's transform doesn't interfere
    group.scale.setScalar(1);
    group.position.set(0, 0, 0);

    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim === 0) return;

    const scale = TARGET_SIZE / maxDim;
    group.scale.setScalar(scale);
    group.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }, [scene]); // re-run whenever the loaded scene changes (i.e. url changed)

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

interface SkillModelProps {
  url: string;
}

export default function SkillModel({ url }: SkillModelProps) {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <Suspense fallback={null}>
        <Environment preset="city" />
        <Model url={url} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Suspense>
    </Canvas>
  );
}
