<template>
  <button @click="onClick" class="ui-button">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'UIButton',
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss" scoped>
  .ui-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 8px 14px;
    line-height: 1.5;
    font-size: 1rem;
    text-align: center;
    transition: all .2s ease;

    .mdi {
      margin-right: 12px;
      font-size: 1.0625rem;
    }
  }
</style>
