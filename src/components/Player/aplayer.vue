<template>
  <aplayer
    @playing="handlePlaying"
    @pause="handlePause"
    @play="handlePlay"
    @listSwitch="handleListSwitch"
    ref="aplayer"
    :audio="playlist"
    :lrcType="0"
    fixed
    :class="playerClasses"
    preload="auto"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      playerClasses: ['hide-player'],
    };
  },
  computed: {
    ...mapState('player', [
      'playlist',
      'isPlaying',
      'isSwitch',
      'audioSwitchIndex',
      'isShowPlayer',
      'currentAudioPlaying',
    ]),
    ...mapState('utils', ['errorMes', 'isLoading']),
  },
  methods: {
    ...mapActions('player', ['updatePlaying', 'switchAudio']),
    handlePause() {
      if (!this.isPlaying) return;
      this.updatePlaying({ status: false, audio: this.currentAudioPlaying });

      const isOpen = document.querySelector('.aplayer-arrow');
      if (!isOpen) {
        const playIcon = document.querySelector('.aplayer-play');
        playIcon.style.bottom = '50%';
        playIcon.style.right = '50%';
      }

      if (isOpen) {
        const playIcon = document.querySelector('.aplayer-play');
        playIcon.style.bottom = '67%';
        playIcon.style.right = '62%';
      }
    },
    handlePlaying() {
      const audioPlaylist = document.querySelector('#audio-playlist');
      audioPlaylist.style.display = 'none';

      const isOpen = document.querySelector('.aplayer-arrow');

      if (isOpen) {
        const pauseIcon = document.querySelector('.aplayer-pause');
        pauseIcon.style.bottom = '60%';
        pauseIcon.style.right = '50%';
      }

      if (!isOpen) {
        const pauseIcon = document.querySelector('.aplayer-pause');
        pauseIcon.style.bottom = '3%';
        pauseIcon.style.right = '3%';
      }
    },
    handlePlay() {
      if (this.isPlaying) return;
      this.updatePlaying({ status: true, audio: this.currentAudioPlaying });
    },
    handleListSwitch() {
      // the first play
      if (!this.currentAudioPlaying._id) return;

      const currentAudioIndex = this.$refs.aplayer.aplayer.currentIndex;
      const audioToSwitch = this.playlist[currentAudioIndex];
      if (this.currentAudioPlaying._id === audioToSwitch._id) return;

      this.switchAudio({ status: true, audio: audioToSwitch });
    },
  },
  watch: {
    isLoading(newValue) {
      if (newValue === false) {
        setTimeout(() => {
          const aplayerList = document.querySelector('.aplayer-list');
          aplayerList.style.height = '190px';

          const aplayerPic = document.querySelector('.aplayer-pic');
          aplayerPic.style.minWidth = '80px';

          const toggleOpenAPlayer = document.querySelector(
            '.aplayer-miniswitcher',
          );
          toggleOpenAPlayer.addEventListener('click', () => {
            const isOpen = document.querySelector('.aplayer-arrow');
            if (isOpen) {
              const aplayerPic = document.querySelector('.aplayer-pic');
              aplayerPic.style.minWidth = '80px';

              if (!this.isPlaying) {
                const playIcon = document.querySelector('.aplayer-play');
                playIcon.style.bottom = '67%';
                playIcon.style.right = '62%';
              }

              if (this.isPlaying) {
                const pauseIcon = document.querySelector('.aplayer-pause');
                pauseIcon.style.bottom = '60%';
                pauseIcon.style.right = '50%';
              }
            }

            if (!isOpen) {
              const aplayerPic = document.querySelector('.aplayer-pic');
              aplayerPic.style.minWidth = '130px';

              if (!this.isPlaying) {
                const playIcon = document.querySelector('.aplayer-play');
                playIcon.style.bottom = '50%';
                playIcon.style.right = '50%';
              }

              if (this.isPlaying) {
                const pauseIcon = document.querySelector('.aplayer-pause');
                pauseIcon.style.bottom = '3%';
                pauseIcon.style.right = '3%';
              }
            }
          });
        }, 0);
      }
    },
    isShowPlayer(newValue) {
      if (newValue === true) {
        this.playerClasses.push('show-player');
      }

      if (newValue === false) {
        this.playerClasses.pop();
      }
    },
    async isPlaying(newValue) {
      const aplayerList = document.querySelector('.aplayer-list');
      aplayerList.style.height = '190px';

      if (newValue === true) {
        // await this.$refs.aplayer.play();
        const playPromise = this.$refs.aplayer.play();

        if (playPromise !== undefined) {
          playPromise
            .then(_ => {
              // Automatic playback started!
              // Show playing UI.
              this.$refs.aplayer.play();
            })
            .catch(() => {
              // Auto-play was prevented
              // Show paused UI.
              this.$refs.aplayer.pause();
            });
        } else {
          this.$refs.aplayer.pause();
        }
      }

      if (newValue === false) {
        this.$refs.aplayer.pause();
      }
    },
    isSwitch(newValue) {
      if (newValue === true) {
        this.$refs.aplayer.switch(this.audioSwitchIndex);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.aplayer {
  .aplayer-pic {
    min-width: 80px;

    .aplayer-play {
      bottom: 67%;
      right: 62%;
    }
  }

  .aplayer-fixed {
    .aplayer-list {
      height: 190px !important;
    }
  }
}

.aplayer.aplayer-fixed .aplayer-list {
  height: 190px !important;
}

.hide-player {
  display: none;
}

.show-player {
  display: block;
}
</style>
