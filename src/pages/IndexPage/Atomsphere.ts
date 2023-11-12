import AtmosphereParticle from "@/THREE/atmosphere";
import Tween from "@tweenjs/tween.js";
const TurnBasicNum = { firefly: 0.002 }; //背景粒子在切换时的转动速度，值越大速度越大
const al = 2500; //值越小覆盖的空间越小，看起来越密集

const tween2 = new Tween.Tween(TurnBasicNum).easing(
  Tween.Easing.Exponential.In
);
const tween1 = new Tween.Tween(TurnBasicNum).easing(
  Tween.Easing.Exponential.In
);

const Atomsphere1 = new AtmosphereParticle({
  longestDistance: al,
  particleSum: 400, //背景往上的粒子数量
  renderUpdate: (Point) => {
    Point.rotation.x -= TurnBasicNum.firefly;
  },
  callback: (Point) => {
    Point.position.z = -1 * al;
  },
  onChangeModel: () => {
    tween2.stop();
    tween1.stop().to({ firefly: 0.03 }, 1500).chain(tween2);
    tween2.to({ firefly: 0.002 }, 1500);
    tween1.start();
  },
});
const Atomsphere2 = new AtmosphereParticle({
  longestDistance: al,
  particleSum: 400, //背景往右的粒子数量
  renderUpdate: (Point) => {
    Point.rotation.y += TurnBasicNum.firefly;
  },
  callback: (Point) => {
    Point.position.y = -0.2 * al;
    Point.position.z = -1 * al;
  },
});
const Atomsphere3 = new AtmosphereParticle({
  longestDistance: al,
  particleSum: 400, //背景逆时针的粒子数量
  renderUpdate: (Point) => {
    Point.rotation.z += TurnBasicNum.firefly / 2;
  },
  callback: (Point) => {
    Point.position.z = -1.2 * al;
  },
});

export default [Atomsphere1, Atomsphere2, Atomsphere3];
