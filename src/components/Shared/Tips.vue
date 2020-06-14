<template>
  <v-card min-width="380" max-width="450" class="mx-auto pb-5 tips" shaped>
    <v-card-title class="text-center pl-4 pt-3 pb-2">
      {{ $t('Tips') }}
    </v-card-title>
    <v-divider />
    <v-card-text class="pb-0">
      {{ $t('Line break') }}: {{ $t('Place') }} "2 {{ $t('spaces') }}"
      {{ $t('or') }} "\" {{ $t('in the end of line') }}
    </v-card-text>
    <v-card-text class="pb-0">
      {{ $t('Highlight block code') }}: ```code```
    </v-card-text>
    <v-card-text class="pb-0">
      {{ $t('Attach image') }}: ![{{ $t('Image name') }}](url)
    </v-card-text>
    <v-card-text class="pb-0">
      {{ $t('Attach link') }}: [{{ $t('Link name') }}](url)
    </v-card-text>
    <v-card-text class="pb-0">
      <a
        target="_blank"
        href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
      >
        {{ $t('Read more') }}
      </a>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped>
.tips >>> p {
  margin-bottom: 0px;
}

.tips {
  position: sticky;
  z-index: 0;
  top: 400px;
}
</style>
