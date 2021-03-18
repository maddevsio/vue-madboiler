<template>
  <div class="hello-world">
    <BG />
    <img src="@/assets/img/md.svg" alt="Mad Devs" />
    <h1>{{ $t('home.title') }}</h1>
    <p class="desc">
      Simple boilerplate for
      <a href="https://vuejs.org/" target="_blank" class="vue">Vue</a>
      from
      <a href="https:/maddevs.io" target="_blank" class="md">Mad Devs</a>
    </p>
    <p class="likes">{{ desctiption }} {{ countFromStore }}</p>
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
import BG from '@/components/BG';

export default {
  name: 'HelloWorld',
  mixins,
  directives: { WaveAnimation },
  components: {
    UIButton,
    BG
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

  > * {
    z-index: 1;
  }

  img {
    width: auto;
    height: 300px;
  }

  h1,
  p {
    margin-bottom: 10px;
    color: #fff;
  }

  h1 {
    font-size: 32px;
    font-weight: bold;
    margin-top: 20px;
  }

  .desc {
    margin-top: 5px;

    a {
      font-weight: bold;
      text-decoration: none;
    }

    .vue {
      color: #42b983;
    }

    .md {
      color: #ec1c24;
      font-weight: bold;
    }
  }

  .likes {
    position: fixed;
    top: 30px;
    right: 30px;
  }

  .ui-button {
    margin-top: 20px;
  }
}
</style>
