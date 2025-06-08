<script lang="ts">
	import {
		Handle,
		Position,
		useSvelteFlow,
		NodeResizeControl,
		type NodeProps
	} from '@xyflow/svelte';

	import github from 'svelte-highlight/styles/github';
	import NodeTypePicker from '../ui/node-type-picker/NodeTypePicker.svelte';
	let { id, type }: NodeProps = $props();
	let { updateNodeData } = useSvelteFlow();

	let code = $state('');
</script>

<svelte:head>
  {@html github}
</svelte:head>

<div
	class="flex h-full w-full flex-col divide-y divide-zinc-700 rounded-xl border border-zinc-700 bg-zinc-800 text-white shadow-md"
>
	<div class="flex items-center justify-between p-3">
		<NodeTypePicker {id} {type} />
	</div>
	<div class="nodrag nowheel flex-grow">
		<textarea
			oninput={(e) => updateNodeData(id, { content: (e.target as HTMLTextAreaElement).value })}
			class="h-full w-full resize-none p-3 focus:outline-none"
			placeholder="Type your content here..."
		></textarea>

	</div>

	<Handle type="source" position={Position.Right} style="top:24px" class="custom-handle" />
	<NodeResizeControl minWidth={300} maxWidth={600} minHeight={200} maxHeight={400}
	></NodeResizeControl>
</div>
