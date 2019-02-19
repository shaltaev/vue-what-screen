<template>
  <div class="first">
    {{ msg }}
    <h3 v-if="$screen.isL().done()">Your screen orientation is Landscape</h3>
    <h3 v-if="$screen.isP().done()">Your screen orientation is Portrait</h3>

    <h3 v-if="$screen.isW('>=', 800).done()">screen width >= 800px</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello from /first"
    };
  }
};
</script>

<style scoped>
.first {
  color: chocolate;
}
</style>
