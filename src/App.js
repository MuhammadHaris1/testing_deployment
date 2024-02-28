import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

export default function App() {
  const canvasRef = useRef();
  const [focus, setFocus] = useState(false);
  return (
    <Canvas ref={canvasRef} camera={{ position: [0, 0, 1] }}>
      <Stars canvasRef={canvasRef} />
    </Canvas>
  )
}

function Stars({ canvasRef, ...props }) {
  const ref = useRef()
  // const canvasRef = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
  const [mousePosition, setMousePosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [moving, setMoving] = useState(false);
  const [wasInside, setWasInside] = useState(false);
  // useFrame((state, delta) => {
  //   ref.current.rotation.x -= delta / 10
  //   ref.current.rotation.y -= delta / 15
  // })
  // console.log('moving', moving);
  // console.log('wasInside', wasInside);
  useFrame((state, delta) => {
    if (!moving) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    } else {
      const { x, y } = mousePosition;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (x - centerX) / centerX;
      const offsetY = (y - centerY) / centerY;
      ref.current.rotation.x = Math.PI / 4 + offsetY * 0.1;
      ref.current.rotation.y = offsetX * 0.1;
    }
  });

  // useEffect(() => {
  //   ref.current.geometry.attributes.position.needsUpdate = true
  // }
  //   , [])

  useEffect(() => {
    const handlePointerMove = (event) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const isInside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (isInside) {
        setMoving(true);
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      } else {
        setMoving(false);
      }
    };
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener("pointerleave", () => {
      console.log('pointerleave');
      setMoving(false);
    });
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener("pointerleave", () => {
        console.log('pointerleave');
        setMoving(false);
      });
    }
  }, []);

  return (
    // <Canvas ref={canvasRef} camera={{ position: [0, 0, 1] }}>
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.005}
          // size={(size,) => (
          //   size + Math.min(Math.abs(x - mousePosition.x), Math.abs(y - mousePosition.y)) / 100
          // )}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
    // </Canvas>
  )
}
