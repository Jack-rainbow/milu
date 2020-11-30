<template>
  <div>
    <svg :class="svgClass"
      aria-hidden="true">
      <use :href='`#${iconClass}`'></use>
    </svg>

  </div>
</template>

<script>
import { computed } from "vue"

export default {
  name: "SvgIcon",

  componentName: "SvgIcon",

  props: {
    iconClass: {
      type: String,
      require: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup() {
    const svgClass = computed(() => {
      return `svg-icon ${this?.className ? this?.className : ""} iconfont`
    })
    return {
      svgClass,
    }
  },
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
