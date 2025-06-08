<script lang="ts">
	import '../app.css';

	import { setContext } from 'svelte';
	let { children, data } = $props();
	setContext('models', data.models);
</script>

{@render children()}
