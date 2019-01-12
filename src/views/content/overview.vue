<template>
  <iframe :src="src"></iframe>
</template>

<script>
export default {
  data () {
    return {
      src: ''
    }
  },
  created () {
    this.src = '../../static' + this.$route.path + '.html'
  }
}
</script>