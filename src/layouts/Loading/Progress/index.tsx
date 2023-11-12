import * as React from 'react'
import Styles from './index.module.scss'

function Progress(props: React.PropsWithChildren<{}>) {
  if (props.children == 100) {
    return (
      <div className={Styles.progress2}>{props.children}</div>
    )
  }
  else{
    return (
      <div className={Styles.progress}>{props.children}</div>
    )
  }
}

export default Progress
