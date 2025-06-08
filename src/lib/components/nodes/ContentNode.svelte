<script lang="ts">
	import { Handle, Position, useSvelteFlow, NodeResizeControl, type NodeProps } from '@xyflow/svelte';
	import NodeTypePicker from '../ui/node-type-picker/NodeTypePicker.svelte';
	let { id, type }: NodeProps = $props();
	let { updateNodeData } = useSvelteFlow();
</script>

<div
	class="w-full h-full divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-md flex flex-col"
>
	<div class="flex items-center justify-between p-3">
		<NodeTypePicker {id} {type} />
	</div>
	<div class="nodrag nowheel flex-grow">
		<!-- <MarkdownEditor {carta} bind:value /> -->
		<textarea
			oninput={(e) => updateNodeData(id, { content: (e.target as HTMLTextAreaElement).value })}
			class="w-full h-full p-3 focus:outline-none resize-none"
			placeholder="Type your content here..."
		></textarea>
	</div>

	<Handle type="source" position={Position.Right} style="top:24px" class="custom-handle" />
	<NodeResizeControl
	minWidth={300}
	maxWidth={600}
	minHeight={200}
	maxHeight={400}

	></NodeResizeControl>
</div>
