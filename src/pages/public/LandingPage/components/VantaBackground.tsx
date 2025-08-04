// VantaBackground.tsx
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// @ts-ignore
import HALO from "vanta/dist/vanta.halo.min";

// @ts-ignore
import RINGS from "vanta/dist/vanta.rings.min";

export const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        RINGS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          backgroundColor: 0xF9FAFB,
          minHeight: 350.0,
          minWidth: 180.0,
          scale: 0.2,
          scaleMobile: 0.6,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="w-full h-full" />;
};


//Halo

// mouseControls: true,
//           touchControls: true,
//           gyroControls: false,
//           minHeight: 200.0,
//           minWidth: 200.0,
//           backgroundColor: 0x1c1468,
//           amplitudeFactor: 2.3,
//           xOffset: -0.01,
//           yOffset: -0.04,
          // size: 1.9,