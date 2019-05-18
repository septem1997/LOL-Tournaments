import React from 'react'
import LazyLoad from 'react-lazy-load';

export default class extends React.Component{

  updated = false

  state = {
    imgStyle:{

    }
  }

  containerRef = React.createRef()

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.updated){
      this.setState({
        imgStyle:{
          width:'100%',
          height:'auto'
        }
      })
      this.updated = true
      console.log("更新完毕")
    }
  }

  componentDidMount() {
    let container = this.containerRef.current
    let containerRate = container.clientWidth/container.clientHeight
    let img = new Image()
    img.src = this.props.src
    let imgRate = img.clientWidth/img.clientHeight
    console.log(img.clientHeight,img.clientWidth)
    console.log(containerRate)
    if (containerRate>imgRate){
      this.setState({
        imgStyle:{
          width:'100%',
          height:'auto'
        }
      })
    } else {
      this.setState({
        imgStyle:{
          width:'auto',
          height:'100%'
        }
      })
    }
  }

  onImgLoaded = (e)=>{
    console.log(e)
  }

  render() {
    return(
      <LazyLoad ref={this.containerRef} className={this.props.className} style={this.props.style}>
        <img src={this.props.src} onLoad={this.onImgLoaded} style={this.state.imgStyle}/>
      </LazyLoad>
    )
  }
}
