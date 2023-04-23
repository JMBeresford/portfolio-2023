import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRouter } from "next/router";
import { useLayoutEffect, useRef } from "react";
import { Group, PerspectiveCamera as PerspectiveCameraType } from "three";
import { damp } from "three/src/math/MathUtils";

export function Camera() {
  const ref = useRef<PerspectiveCameraType>();
  const outerRef = useRef<Group>();
  const router = useRouter();
  const size = useThree(s => s.size);

  useLayoutEffect(() => {
    ref.current.rotation.order = "YXZ";
  }, []);

  useFrame(({ mouse, clock }, delta) => {
    if (!ref.current || !outerRef.current) return;
    const path = router.pathname;

    const baseRotX = path === "/" ? 0 : Math.PI / -6;
    const rotX = size.width > 768 ? baseRotX + mouse.y * 0.1 : baseRotX;
    const rotY = size.width > 768 ? -mouse.x * 0.1 : 0;

    ref.current.rotation.x = damp(ref.current.rotation.x, rotX, 2, delta);
    ref.current.rotation.y = damp(ref.current.rotation.y, rotY, 2, delta);

    const posY = path === "/" ? 0 : 20;
    ref.current.position.y = damp(ref.current.position.y, posY, 4, delta);

    const t = clock.elapsedTime * 0.25;

    ref.current.position.x = damp(ref.current.position.x, Math.sin(t * 0.5) * 20, 4, delta);
    ref.current.position.z = damp(ref.current.position.z, Math.cos(t * 0.35) * 10, 4, delta);
  });

  return (
    <group ref={outerRef}>
      <PerspectiveCamera
        ref={ref}
        near={0.0001}
        far={1500}
        position={[0, 0, 0]}
        fov={size.width > 768 ? 50 : 65}
        makeDefault
      />
      {/* <OrbitControls camera={ref.current} /> */}
    </group>
  );
}
