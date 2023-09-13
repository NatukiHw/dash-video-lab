<template>
  <a-menu class="headerNav" v-model:selectedKeys="current" mode="horizontal" :items="items" @click="handleMenuClick"/>
</template>

<script lang="ts" setup>
import { h, ref, watch } from 'vue'
import { HomeOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
// 当前选中的菜单
const current = ref<string[]>([])
// 导航菜单列表
const items = ref<MenuProps['items']>([
  {
    key: '/',
    name: 'home',
    icon: () => h(HomeOutlined),
    label: '首页'
  },
  {
    key: '/playVideo',
    name: 'playVideo',
    icon: () => h(SettingOutlined),
    label: '播放视频',
    children: [
      {
        key: '/playVideo/dash',
        name: 'playDashVideo',
        label: '播放Dash视频流'
      }
    ]
  },
  {
    key: '/webCodecs',
    name: 'webCodecsApiTest',
    icon: () => h(SettingOutlined),
    label: 'WebCodecsAPI测试',
    children: [
      {
        key: '/webCodecs/decode/video',
        name: 'decodeVideo',
        label: '视频解码绘制'
      },
      {
        key: '/webCodecs/create/video',
        name: 'createVideo',
        label: '创建MP4视频'
      }
    ]
  }
])

/**
 * 导航菜单被点击
 * @param params
 */
function handleMenuClick(params) {
  router.push(params.key)
}

watch(() => route.path, (newPath, oldPath) => {
  current.value = [route.path]
}, { immediate: true })
</script>

<style lang="scss" scoped>
.headerNav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
