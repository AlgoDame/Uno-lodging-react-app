import Particles from "react-particles-js";
import ParticleConfig from "../../particle-config.jsx";

const ParticleBg = () => {
  return (
    <Particles
      params={ParticleConfig}
      style={{ position: "absolute", zIndex: "200" }}
      height="90vh"
      width="100vw"
      // styles={{
      //   height: "100%",
      //   minWidth: "100vw",
      //   zIndex: "10000",
      //   position: "absolute",
      //   top: "0",
      //   left: "0",
      // }}
    ></Particles>
  );
};

export default ParticleBg;
