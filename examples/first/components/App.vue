<template>
  <div class="first">{{ msg }}</div>
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
