<script lang="ts">
	import { useSvelteFlow } from '@xyflow/svelte';
	import * as Select from '$lib/components/ui/select/index';
	import { Bot, LetterText, FileCog } from '@lucide/svelte';
	// Data
	let { id, type } = $props();
	let { updateNode } = useSvelteFlow();

	const nodeTypes = [
		{ value: 'system', label: 'System', icon: FileCog },
		{ value: 'content', label: 'Content', icon: LetterText },
		{ value: 'llm', label: 'LLM', icon: Bot }
	];

	let value = $state(type);

	const currentNodeType = $derived(nodeTypes.find((n) => n.value === value));

	function handleChange(value: string) {
		updateNode(id, { type: value });
	}
</script>

<Select.Root type="single" name="nodeType" onValueChange={handleChange}>
	<Select.Trigger class="w-fit rounded-full flex gap-2 items-center">
		{#if currentNodeType}
			<currentNodeType.icon size={20} />
			{currentNodeType.label}
		{/if}
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
