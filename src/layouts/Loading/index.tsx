import * as React from "react";
import Styles from "./index.module.scss";
import logo from "@/assets/cpp.svg";
import Progress from "./Progress";
import Nprogress from "nprogress";
import { unMuteBGM } from "@/store/volume/action";
import { connect } from "react-redux";
import { enter } from "@/store/hasEnter/action";

export type LoadingProps = React.PropsWithRef<{
  onRef: React.Ref<any>;
  onEnter?: Function;
  unMuteBGM: Function;
  enter: Function;
}>;

export interface LoadingMethods {
  FinishLoad: Function;
}
let id: any;

function Loading(props: LoadingProps) {
  const [showUp, changeShowUp] = React.useState(true);
  const [hide, changeHide] = React.useState(false);
  const [progress, changeProgress] = React.useState(0);
  const [line1, changeline1] = React.useState("0,3843");
  const [line2, changeline2] = React.useState("0,2566");

  React.useEffect(() => {
    Nprogress.start();
    if (id === undefined) {
      id = setInterval(() => {
        if (progress !== 100 && Nprogress.status != null) {
          changeProgress(parseInt((Nprogress.status * 100).toFixed(2)));
        }
      }, 1000);
    }
  });

  function FinishLoad() {
    changeProgress(100);
    changeline1("1284,3843");
    changeline2("2566,2566");
    clearInterval(id);
  }
  let i = true;
  function Enter() {
    if (i) {
      // setTimeout(() => {
      changeHide(true);
      props.unMuteBGM();
      props.onEnter != null && props.onEnter();
      props.enter();
      i = false;
      setTimeout(() => {
        changeShowUp(false);
      }, 900);
      // }, 3000)
    }
  }

  React.useImperativeHandle(props.onRef, (): LoadingMethods => {
    return {
      FinishLoad,
    };
  });

  return showUp ? (
    <div
      onClick={Enter}
      className={`${Styles.loading}${hide ? ` ${Styles.hide}` : ""}`}
    >
      {/* <div></div>
          <div className={Styles.description}>
            2023<br/>
            <div className={Styles.logo_svg}>
            <img src={logo} />
          </div> &nbsp;CppTeam Invitation
           </div> */}
      <div></div>
      <div className={Styles.description}>
        CppTeam&nbsp;{" "}
        <div className={Styles.logo_svg}>
          <img src={logo} />
        </div>{" "}
        Invitation
      </div>
      <Progress>{`${progress}`}</Progress>
      <svg
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="7436"
        width="200"
        height="200"
      >
        <path
          strokeDasharray={line1}
          className={Styles.line1}
          d="M512 154.688l277.632 160.64L512 475.968l-277.632-160.64zM202.432 690.24V370.752L480 531.2v319.424zM544 850.816V531.2l277.568-160.64v319.488z"
          p-id="7437"
        ></path>
        <path
          strokeDasharray={line2}
          className={Styles.line2}
          d="M885.504 315.328a32 32 0 0 0-15.936-27.712L528 89.984a32 32 0 0 0-32 0L154.432 287.616a32 32 0 0 0-15.936 27.712v393.344a32 32 0 0 0 16 27.712L496 934.016a32 32 0 0 0 32 0l341.568-197.632a32 32 0 0 0 16-27.712V315.328z"
        ></path>
      </svg>
      {progress === 100 ? (
        <div className={Styles.enter}>*点击任意处进入*</div>
      ) : undefined}
    </div>
  ) : (
    <></>
  );
}

export default connect(() => ({}), { unMuteBGM, enter })(Loading);
