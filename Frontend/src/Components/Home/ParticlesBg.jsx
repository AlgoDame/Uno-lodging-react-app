import Particles from "react-particles-js";
import ParticleConfig from "../../particle-config.jsx";

const ParticleBg = () => {
  return (
    <Particles
      params={ParticleConfig}
      style={{ position: "absolute", zIndex: "200", left: "0", top: "0" }}
      height="90vh"
      width="100vw"
    ></Particles>
  );
};

export default ParticleBg;
