import * as THREE from "three";

export const curveConstructor = () => {
    const PI2 = Math.PI * 2;
    const SIZE_ROLLERCOASTER = 5;

    const vector = new THREE.Vector3();
    const vector2 = new THREE.Vector3();

    return {
        getPointAt: function (t: number) {
            t = t * PI2;

            let x, y, z;

            // Circuito 1

            x = Math.sin(t * 3) * Math.cos(t * 4) * 50;
            y = Math.sin(t * 10) * 2 + Math.cos(t * 17) * 2 + 5;
            z = Math.sin(t) * Math.sin(t * 4) * 50;


            return vector.set(x, y, z).multiplyScalar(SIZE_ROLLERCOASTER);
        },

        getTangentAt: function (t: number) {
            const delta = 0.0001;
            const t1 = Math.max(0, t - delta);
            const t2 = Math.min(1, t + delta);

            return vector2
                .copy(this.getPointAt(t2))
                .sub(this.getPointAt(t1))
                .normalize();
        },
    };
};
