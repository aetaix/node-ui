<script lang="ts">
	import { useSvelteFlow } from '@xyflow/svelte';
	// Data
	let { updateNode } = useSvelteFlow();
	let { id, type } = $props();

	function handleChange(event: Event) {
		updateNode(id, { type: (event.target as HTMLSelectElement).value });
	}
</script>

<select 
class="nodrag"
value={type}
onchange={handleChange}>
	<option value="system">System</option>
	<option value="content">Content</option>
	<option value="llm">Llm</option>
</select>
