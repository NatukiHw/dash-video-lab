<template>
  <div class="pageContainer">
    <div class="playerContainer">
      <video class="player" ref="videoRef" controls></video>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Combinator, ImgClip, MP4Clip, OffscreenSprite, renderTxt2ImgBitmap } from '@webav/av-cliper'

const videoRef = ref<HTMLVideoElement>()

onMounted(async() => {
  const spr1 = new OffscreenSprite(
    'spr1',
    new MP4Clip((await fetch('/static/videos/sea/sea.mp4')).body)
  )

  const spr2 = new OffscreenSprite(
    'spr2',
    new ImgClip(
      await renderTxt2ImgBitmap(
        '水印',
        `font-size:40px; color: white; text-shadow: 2px 2px 6px red;`
      )
    )
  )
  spr2.setAnimation(
    {
      '0%': { x: 0, y: 0 },
      '25%': { x: 1200, y: 680 },
      '50%': { x: 1200, y: 0 },
      '75%': { x: 0, y: 680 },
      '100%': { x: 0, y: 0 }
    },
    { duration: 4, iterCount: 1 }
  )
  spr2.zIndex = 10
  spr2.opacity = 0.5

  const spr3 = new OffscreenSprite(
    'spr3',
    new ImgClip(
      await createImageBitmap(await (await fetch('/static/images/image.png')).blob())
    )
  )
  // 初始旋转 180°
  spr3.rect.angle = Math.PI
  spr3.setAnimation(
    {
      from: { angle: Math.PI, x: 0, y: 0, opacity: 1 },
      to: { angle: Math.PI * 2, x: 300, y: 300, opacity: 0 }
    },
    { duration: 3 }
  )

  const com = new Combinator({
    width: 1280,
    height: 720,
    bgColor: 'white'
  })

  await com.add(spr1, { main: true })
  await com.add(spr2, { offset: 0, duration: 5 })
  await com.add(spr3)

  loadStream(com.output(), com)
})

const loadStream = async(stream: ReadableStream, com?: Combinator) => {
  const src = await new Response(stream).blob()

  const videoEl = videoRef.value
  if (!videoEl) return
  videoEl.src = URL.createObjectURL(src)
}
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
