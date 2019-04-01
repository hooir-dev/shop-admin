<template>
  <div class="content">
    <div id="container"></div>
  </div>
</template>
<script>

export default {
  data () {
    return {}
  },
  mounted () {
    var map = new BMap.Map('container')
    var point = new BMap.Point(116.404, 39.915)
    map.centerAndZoom(point, 15)
  }
}
</script>
<style scoped>
html{height:100%}
body{height:100%;margin:0px;padding:0px}
.content{width: 100%; height: 300px;}
#container{height:100%; width: 100%;}

</style>
