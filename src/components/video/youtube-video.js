import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import './intro-video.css'

export class YoutubeVideo extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
  }

  state = {
    playing: false,
    started: false,
  }

  render() {
    const { source } = this.props

    return (
      <ReactPlayer
        className="react-player"
        url={source}
        playing={true}
        controls
        width={640}
        height={360}
      />
    )
  }
}
