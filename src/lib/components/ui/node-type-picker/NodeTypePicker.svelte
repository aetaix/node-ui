<script lang="ts">
	import { useSvelteFlow } from '@xyflow/svelte';
	import * as Select from '$lib/components/ui/select/index';
	// Data
	let { id, type } = $props();
	let { updateNode } = useSvelteFlow();

	const nodeTypes = [
		{ value: 'system', label: 'System' },
		{ value: 'content', label: 'Content' },
		{ value: 'llm', label: 'LLM' }
	];

	let value = $state(type);

	const triggerContent = $derived(
		nodeTypes.find((n) => n.value === value)?.label ?? 'Select a node type'
	);

	function handleChange(value: string) {
		updateNode(id, { type: value });
	}
</script>

<Select.Root type="single" name="nodeType" onValueChange={handleChange}>
	<Select.Trigger class="w-fit rounded-full">
		{triggerContent}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
		
			{#each nodeTypes as type (type.value)}
				<Select.Item value={type.value} label={type.label} disabled={type.value === 'grapes'}>
					{type.label}
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
