<script>
    export let color;

    const colorStyles = () => color ? `bg-${color}-200 active:bg-${color}-300 text-${color}-600 border-2 border-transparent hover:border-${color}-600` : "bg-white text-black";

    let defaultClass = `p-2 rounded box-border ${colorStyles()}`;
    let customClass = $$props.class;

    const styles = () => customClass ? `${defaultClass} ${customClass}` : defaultClass;
</script>

<button on:click class={styles()}>
    <slot />
</button>