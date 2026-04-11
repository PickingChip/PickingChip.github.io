import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.css'
import GiscusComment from './components/GiscusComment.vue'

export default {
	extends: DefaultTheme,
	Layout() {
		return h(DefaultTheme.Layout, null, {
			'doc-after': () => h(GiscusComment),
		})
	},
}
