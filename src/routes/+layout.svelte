<script lang="ts">
	import '../app.css';
	// import 'carta-md/default.css'; /* Default theme */

	import { setContext } from 'svelte';
	let { children, data } = $props();
	setContext('models', data.models);
</script>

{@render children()}
