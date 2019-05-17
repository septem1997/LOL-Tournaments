import React from 'react'
import BScroll from 'better-scroll'
import styles from './index.less'

export default class extends React.Component{


  wrapper = React.createRef()

  scroll = null
  componentDidMount() {
    this.scroll = new BScroll(this.wrapper.current)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (JSON.stringify(nextProps.data)!==JSON.stringify(this.props.data)){
      this.scroll.refresh()
    }
  }

  render() {


    return(
      <div className={styles.wrapper+' '+this.props.className} ref={this.wrapper}>
        <ul className="content">
          {this.props.children}
        </ul>
      </div>
    )
  }
}
