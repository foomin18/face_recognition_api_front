import { useCallback } from "react";
import Particles from "react-particles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

const ParticleSettings = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <Particles
            className="Particles"
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                fpslimit:60,
                    interactivity:{
                        detect_on: 'canvas',
                        // events: {
                        //     onClick: {
                        //         enable: 'true',
                        //         mode: 'push'
                        //     },
                        //     onHover: {
                        //         enable: 'true',
                        //         mode: 'repulse'
                        //     },
                        //     resize: 'true'                           
                        // },
                        modes: {
                            bubble: {
                                distance: 200,
                                duration: 2,
                                opacity: 0.8,
                                size: 40
                            },
                            push: {
                                quantity: 4
                            },
                            repulse: {
                                distance: 150,
                                duration: 0.4
                            }
                        }
                    },
                    particles: {
                        color: {
                            valur: '#ffffff'
                        },
                        links: {
                            color: '#ffffff',
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1
                        },
                        collisions: {
                            enable: true
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outMode: 'bounce',
                            random: false,
                            speed: 1,
                            straight: false
                        },
                        number: {
                            dencity: {
                                enable: true,
                                value_area: 800,
                            },
                            value: 130
                        },
                        opacity: {
                            value: 0.6
                        },
                        shape: {
                            type: 'circle'
                        },
                        size: {
                            random: true,
                            value: 1
                        }
                    }
                }}
        />
    );
};

export default ParticleSettings;