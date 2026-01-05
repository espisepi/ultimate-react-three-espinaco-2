import * as THREE from 'three';

// obj: THREE.Scene | THREE.Mesh
export function disposeAll(obj) {
    if (obj instanceof THREE.Scene || obj instanceof THREE.Mesh) {
        obj.traverse(child => {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    for (let mat of child.material) {
                        disposeMaterial(mat);
                    }
                } else {
                    disposeMaterial(child.material);
                }
            }
        });
    }
}

export function disposeMaterial(material) {
    if (material.map) material.map.dispose();
    if (material.lightMap) material.lightMap.dispose();
    if (material.aoMap) material.aoMap.dispose();
    if (material.emissiveMap) material.emissiveMap.dispose();
    if (material.bumpMap) material.bumpMap.dispose();
    if (material.normalMap) material.normalMap.dispose();
    if (material.displacementMap) material.displacementMap.dispose();
    if (material.roughnessMap) material.roughnessMap.dispose();
    if (material.metalnessMap) material.metalnessMap.dispose();
    if (material.alphaMap) material.alphaMap.dispose();
    if (material.envMap) material.envMap.dispose();

    material.dispose();
}
