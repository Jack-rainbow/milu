<template>
  <svg :class="svgClass"
    aria-hidden="true">
    <use :xlink:href='iconName'></use>
  </svg>
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
    const iconName = computed(async () => {
      console.log(this.iconClass)
      return `#icon-${this?.iconClass}`
    })
    const svgClass = computed(() => {
      return `svg-icon ${this?.className ? this?.className : ""}`
    })
    return {
      iconName,
      svgClass,
    }
  },
}
</script>

<style type="text/css">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
