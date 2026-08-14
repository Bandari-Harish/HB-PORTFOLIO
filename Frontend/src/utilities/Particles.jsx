import { useCallback, useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

export default function ParticlesBackground() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Particles container loaded", container);
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 120,
      particles: {
        number: { value: 80 },
        color: { value: "#00d4ff" },
        shape: { type: "circle" },
        opacity: { value: 0.6 },
        size: { value: { min: 2, max: 5 } },
        move: {
          enable: true,
          speed: 2,
          outModes: { default: "bounce" },
        },
      },
      background: { color: "#0d1117" },
    }),
    [],
  );

  return (
    <ParticlesProvider init={particlesInit}>
      <div className="particles-container">
        <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
      </div>
    </ParticlesProvider>
  );
}