<script lang="ts">
	import { getContext } from 'svelte';
	import { tick } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { type ModelResponse } from 'ollama';
	import { useSvelteFlow } from '@xyflow/svelte';
	import { CheckIcon, ChevronsUpDownIcon } from '@lucide/svelte';

	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';

	let { id } = $props();
	const models = getContext<ModelResponse[]>('models');

	let value = $state(models[0].name);
	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);

	let { updateNodeData } = useSvelteFlow();

	const selectedValue = $derived(models.find((model: any) => model.name === value)?.name);

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef} class="flex w-full items-center justify-between">
		{selectedValue || 'Select a model...'}
		<ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
	</Popover.Trigger>
	<Popover.Content sideOffset={5} strategy="absolute" align="start" class="w-full p-0">
		<Command.Root>
			<Command.Input placeholder="Search model..." />
			<Command.List>
				<Command.Empty>No model found.</Command.Empty>
				<Command.Group>
					{#each models as model}
						<Command.Item
							value={model.name}
							onSelect={() => {
								value = model.name;
								updateNodeData(id, { model: model.name });
								closeAndFocusTrigger();
							}}
						>
							<CheckIcon class={cn('mr-2 size-4', value !== model.name && 'text-transparent')} />
							{model.name}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
