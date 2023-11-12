import * as React from "react";
import Styles from "./index.module.scss";
import logo from "@/assets/cpp.svg";

type OccupationListItemProps = React.PropsWithChildren<{
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
  child?: React.ReactElement;
}>;

function OccupationListItem(props: OccupationListItemProps) {
  return (
    <>
      <div style={props.style} className={Styles.item2} onClick={props.onClick}>
        <div className={Styles.logo_svg}>
          <img src={logo} />
        </div>
      </div>
      <div style={props.style} className={Styles.item} onClick={props.onClick}>
        <div className={Styles.text}>{props.children[0]}</div>
        <div className={Styles.svgp}>{props.child}</div>
        <div className={Styles.svga}>{props.child}</div>
        <div className={Styles.textsmall}>{props.children[1]}</div>
      </div>
    </>
  );
}

export default OccupationListItem;
