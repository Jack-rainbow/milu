<template>
  <div class="test">
    <h1>home: {{count}}</h1>
    <svg-icon icon-class="iconxianxinggouwuche" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return {
      count,
    }
  },
}
</script>
<style lang="scss" scoped>
h1 {
  color: $abc;
}
</style>
