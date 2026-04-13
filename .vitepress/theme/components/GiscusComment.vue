<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import Giscus from '@giscus/vue'

const { frontmatter, isDark } = useData()
const route = useRoute()

const showComment = computed(() => frontmatter.value.comment !== false)
const giscusTheme = computed(() => {
	const customTheme = frontmatter.value?.giscusTheme as string | undefined
	if (customTheme)
		return customTheme

	return isDark.value ? 'dark_dimmed' : 'light'
})
</script>

<template>
	<div v-if="showComment" class="giscus-container">
		<Giscus
			id="comments"
			repo="PickingChip/PickingChip.github.io"
			repoId="R_kgDOR_vr-A"
			category="Announcements"
			categoryId="DIC_kwDOR_vr-M4C6mZE"
			mapping="pathname"
			strict="0"
			reactionsEnabled="1"
			emitMetadata="0"
			inputPosition="bottom"
			:theme="giscusTheme"
			lang="zh-CN"
			loading="lazy"
			:key="route.path"
		/>
	</div>
</template>

<style scoped>
.giscus-container {
	margin-top: 32px;
}
</style>
