<template>
  <div class="pageContainer">
    <div class="playerContainer">
      <div class="player" ref="playerRef"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import dashjs from 'dashjs'
import DPlayer from 'dplayer'
import { DPlayerVideo, DPlayerVideoQuality } from 'dplayer'

const playerRef = ref()

// eslint-disable-next-line no-unused-vars
let player:DPlayer|null = null
const videoData = {
  videoPath: '/static/videos/sea',
  videoType: 'dash',
  videoQuality: [
    '1080p',
    '720p',
    '480p',
    '320p'
  ],
  videoFileName: 'stream.mpd'
}
/**
 * 初始化播放器
 */
function initPlayer(videoInfo:DPlayerVideo) {
  player = new DPlayer({
    video: videoInfo,
    container: playerRef.value
  })
}

/**
 * 加载视频信息
 */
function getVideoInfo() {
  const video:DPlayerVideo = {
    url: '',
    quality: [],
    defaultQuality: 0
  }
  const data = videoData
  if (data.videoType === 'dash') {
    video.type = 'customDash'
    video.customType = {
      customDash: function(video:HTMLVideoElement) {
        dashjs.MediaPlayer().create().initialize(video, video.src, false)
      }
    }
  }
  if (data && data.videoQuality) {
    data.videoQuality.forEach(item => {
      const obj:DPlayerVideoQuality = {
        name: item,
        url: `${data.videoPath}/${item}/${data.videoFileName}`,
        type: video.type
      }
      video.quality?.push(obj)
    })
  }
  return video
}

onMounted(() => {
  const videoInfo = getVideoInfo()
  initPlayer(videoInfo)
})
</script>

<style lang="scss" scoped>
.pageContainer {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .playerContainer {
    .player {
      width: 980px;
      height: 600px;
      background-color: #000;
    }
  }
}
</style>
