import * as THREE from "three";
import { ParticleModelProps } from "@/declare/THREE";
// import kv from "@/assets/models/cpkv3";
// import kv from "@/assets/models/";
import g from "@/assets/images/gradient.png";

import { addCnt } from "@/store/hasEnter/action";
import store from "@/store";
import isMobile from "@/utils/isMobile";

import { TessellateModifier } from "three/examples/jsm/modifiers/TessellateModifier";
import VerticesDuplicateRemove from "@/utils/VerticesDuplicateRemove";

let q = 0;
const texture = new THREE.TextureLoader().load(g);
const TM = new TessellateModifier(1.2, 2.4);
// const TM = new TessellateModifier(0, 0.1);

let KVGeometryClone: THREE.BufferGeometry;

const Models: ParticleModelProps[] = [
  {
    name: "logo",
    path: new URL("../../assets/models/Cpp-V1.obj", import.meta.url).href,
    onLoadComplete(Geometry) {
      Geometry.rotateX(Math.PI * 0.5);
      if (isMobile()) {
        const s = 45000;
        Geometry.scale(s, s, s);
        Geometry.translate(0, 200, 0);
      } else {
        const s = 60000;
        Geometry.scale(s, s, s);
        // Geometry.translate(200, -650, 100);
        Geometry.translate(700, 0, 200);
      }
      store.dispatch(addCnt());
    },
    onEnterEnd(PointGeometry) {
      const m = PointGeometry.material;
      /** @ts-expect-error */
      m.map = texture;
    },
  },
  {
    name: "kv",
    path: new URL("../../assets/models/hopper.obj", import.meta.url).href,
    NeedRemoveDuplicateParticle: false,
    onLoadComplete(Geometry) {
      const s = 35; //距离
      Geometry.scale(s, s, s);
      Geometry.translate(0, -1100, 230); //位置
      store.dispatch(addCnt());
      let finalVertices = VerticesDuplicateRemove(
        //@ts-expect-error
        Geometry.attributes.position.array
      );

      Geometry = TM.modify(Geometry);
      KVGeometryClone = Geometry.clone();
      let finalGeometry = new THREE.BufferGeometry();
      // 粒子去重
      finalGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(finalVertices, 3)
      );

      Geometry;
      return Geometry;
    },
    onAnimationFrameUpdate(PerfromPoint, TweenList, g) {
      const p = PerfromPoint.geometry.getAttribute("position");
      let a = 0;
      // TweenList.forEach((val, i) => {
      //   if (val.isPlaying === false) {
      //     a = Math.sqrt(Math.pow(val.x, 2) + Math.pow(val.z, 2));
      //     p.setY(
      //       i,
      //       (Math.sin(a / 70 + q) * a) / 30 +
      //         KVGeometryClone.attributes.position.getY(i)
      //     );
      //     // val.y = sg.getY(i);
      //   }
      // });

      // p.needsUpdate = true;
      q -= 0.015;
      return true;
    },
    onEnterEnd(PointGeometry) {
      const m = PointGeometry.material;
      /** @ts-expect-error */
      m.map = texture;
    },
  },
  {
    name: "qr",
    path: new URL("../../assets/models/qr/CV.obj", import.meta.url).href,

    onLoadComplete(Geometry) {
      const s = 100;
      Geometry.scale(s, s, s);
      Geometry.rotateX(Math.PI * 0.5);
      Geometry.translate(0, 0, 500);
      store.dispatch(addCnt());
    },
    onEnterStart(PointGeometry) {
      const m = PointGeometry.material;
      /** @ts-expect-error */
      m.map = null;
    },
  },
];

export default Models;
