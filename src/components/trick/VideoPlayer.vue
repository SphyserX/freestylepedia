<script setup lang="ts">
import { embedUrl } from '@/scripts/trickMedia'

defineProps<{ videoId: string; title: string }>()
</script>

<!-- Plain YouTube embed: YouTube's own poster and play button.
     The key replaces the frame on a video change: a new src on the same frame would add a history entry. -->
<template>
  <div class="player">
    <iframe
      :key="videoId"
      class="media"
      :src="embedUrl(videoId, { autoplay: false })"
      :title="title"
      allow="encrypted-media; picture-in-picture; fullscreen"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
.player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000;
}
.media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
