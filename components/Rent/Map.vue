<template>
  <div class="h-[35vh] rounded-lg w-full overflow-hidden">
    <LMap
      ref="map"
      :zoom="6"
      :center="center ? center : [47.21322, -1.559482]"
      :use-global-leaflet="false"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />

      <LMarker v-if="center" :lat-lng="center">
        <LIcon :icon-url="icon" :icon-size="size"></LIcon>
      </LMarker>
    </LMap>
  </div>
</template>

<script setup>
import { LMap, LTileLayer, LIcon, LMarker } from "@vue-leaflet/vue-leaflet";
const props = defineProps({
  center: {
    type: Array,
    required: false,
  },
});

const width = ref(50);
const height = ref(50);

const icon = ref("/map-marker.svg");

const size = computed(() => [width.value, height.value]);
</script>

<style></style>
