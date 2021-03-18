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
      throw new Error('for test Sentry'); // Create error event for Sentry
    }
  }
};
</script>

<style lang="scss" scoped>
.ui-button {
  width: 150px;
  height: 46px;
  border: 1px solid rgba(236, 28, 36, 0.5);
  background-color: transparent;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 24px;
  box-shadow: none;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #ec1c24;
    color: #fff;
  }

  &:active {
    background-color: #aa191e;
    border-color: #aa191e;
    transform: translate(2px, 2px);
  }

  @media only screen and (max-width: 360px) {
    font-size: 14px;
  }
}
</style>
