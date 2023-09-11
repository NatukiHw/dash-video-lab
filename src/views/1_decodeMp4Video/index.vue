<template>
  <div class="pageContainer">
    <canvas ref="canvasRef" width="980" height="600"></canvas>
    <div>{{ statusText }}</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { MP4Clip } from '@webav/av-cliper'

const canvasRef = ref<HTMLCanvasElement>()
const statusText = ref('')

let clip: MP4Clip | null = null

onMounted(async() => {
  await loadVideoResource()
  await drawVideoFrame()
  destoryVideoResource()
})

/**
 * 加载视频资源
 */
async function loadVideoResource() {
  statusText.value = '开始加载'
  clip = new MP4Clip((await fetch('/static/videos/sea/sea.mp4')).body)
  await clip.ready
  statusText.value = '加载完成'
}

/**
 * 绘制视频帧
 */
async function drawVideoFrame() {
  if (!clip) {
    statusText.value = '加载失败'
    return
  }
  let time = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    statusText.value = `播放中, ${time}`
    const { state, video: videoFrame } = await clip.tick(time)
    if (state === 'done') break
    if (videoFrame != null && state === 'success') {
      const cvs = canvasRef.value
      if (!cvs) break
      const ctx = cvs.getContext('2d')
      ctx.clearRect(0, 0, cvs.width, cvs.height)
      ctx.drawImage(videoFrame, 0, 0, videoFrame.codedWidth, videoFrame.codedHeight)
      videoFrame.close()
    }
    time += 33000
  }
}

/**
 * 销毁视频资源
 */
function destoryVideoResource() {
  if (!clip) return
  clip.destroy()
  statusText.value = '已销毁'
}
</script>

<style lang="scss" scoped>
</style>
