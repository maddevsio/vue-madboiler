<template>
  <div class="hello-world">
    <h1>{{ $t('home.title') }}</h1>
    <p>{{ desctiption }} {{ countFromStore }}</p>
    <UIButton v-WaveAnimation @click="setLike">
      <i class="mdi mdi-hand-okay"></i>
      like
    </UIButton>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixins from '@/mixins';
import WaveAnimation from '@/directives/WaveAnimation';
import UIButton from '@/components/ui/UIButton';

export default {
  name: 'HelloWorld',
  mixins,
  directives: { WaveAnimation },
  components: {
    UIButton
  },
  props: {
    desctiption: {
      type: String,
      default: 'likes: '
    }
  },
  data() {
    return {
      likesCount: 0
    };
  },
  computed: {
    ...mapState('likes', {
      countFromStore: 'count'
    })
  },
  methods: {
    setLike() {
      this.likesCount += 1;
      this.MixinConsoleLog(this.likesCount);
      this.$store.dispatch('likes/setLike', this.likesCount);
    }
  }
};
</script>

<style lang="scss" scoped>
  .hello-world {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #000;

    h1,
    p {
      margin-bottom: 10px;
      color: #fff;
    }
  }
</style>
