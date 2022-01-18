<script setup>
    const { ssrContext } = useNuxtApp();
    const { res } = ssrContext;

    res.writeHead(302, { Location: "/0" });
    res.end();
</script>
