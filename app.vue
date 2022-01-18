<template>
    <div><NuxtPage /></div>
</template>

<style>
    @font-face {
        font-family: "Segoe UI";
        src: url("/assets/fonts/SegoeUI.ttf");
    }

    body {
        background-image: url('./assets/images/bg.jpg');
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: 100% 100%;
        
        font: 1rem -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
        /* line-height: 1.5; */
        margin: 0;
        padding: 0;
    }
    @media (min-width: 768px) {
        .documentation {
            margin: 2rem 0;
        }
    }
    @media (max-width: 767px) {
        .documentation {
            margin: 0 0 1rem 0;
        }
    }
    .main-field {
        display: flex;
        max-width: 996px;
        margin: 1rem auto 0 auto;
        flex-direction: column;
    }
</style>