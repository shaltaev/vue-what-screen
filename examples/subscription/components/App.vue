<template>
  <div class="template">{{ msg }} {{ isL ? "Landscape" : "Portrait" }}</div>
</template>

<script>
export default {
  data() {
    return {
      screen: this.$screen,
      isL: this.$screen.state.isL,
      msg: "Hello from /template"
    };
  },
  watch: {
    screen: {
      handler(val, oldVal) {
        console.log(this);
        this.setIsL();
      },
      deep: true
    }
  },
  methods: {
    setIsL() {
      this.isL = this.$screen.state.isL;
    }
  }
};
</script>

<style scoped>
.template {
  color: chocolate;
}
</style>
