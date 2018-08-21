import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './intro-video.css'

export class IntroVideo extends Component {
  static propTypes = {
    source: PropTypes.string,
    sideColorBefore: PropTypes.string,
    sideColorAfter: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      started: false,
      bgColor: props.sideColorBefore,
    }
  }
  onPause() {
    this.togglePlayingState(false)
  }
  onPlaying() {
    this.togglePlayingState(true)
    this.toggleStartedState(true)
  }
  onEnded() {
    this.togglePlayingState(false)
    this.toggleStartedState(false)
    this.setState({ bgColor: this.props.sideColorBefore })
  }
  setVideoComponent(video) {
    this.video = video
  }
  togglePlayingState(newState = !this.state.playing) {
    this.setState({ playing: newState })
  }
  toggleStartedState(newState = !this.state.started) {
    this.setState({ started: newState })
  }
  play() {
    this.video.play()
    this.setState({ bgColor: this.props.sideColorAfter })
  }
  pause() {
    this.video.pause()
  }
  render() {
    const overlayClassName = classNames('video-overlay', {
      'video-overlay-hide': this.state.playing,
      'video-overlay-hide-poster': this.state.started,
    })

    return (
      <div className="video-container" style={{ backgroundColor: this.state.bgColor }}>
        <div className="intro-video">
          <video
            ref={video => this.setVideoComponent(video)}
            onClick={() => this.pause()}
            onPause={() => this.onPause()}
            onPlaying={() => this.onPlaying()}
            onEnded={() => this.onEnded()}
          >
            <source src={this.props.source} type="video/mp4" />
            <track kind="captions" />
          </video>
          <div className={overlayClassName}>
            <div className="play-pause" role="button" tabIndex="-1" onClick={() => this.play()} />
            <div className="video-title-block">
              <div>
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
