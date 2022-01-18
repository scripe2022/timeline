<template>
    <div class="history-field">
        <div class="sub-title">
            <span class="sub-title-index">#{{ index }}</span>
            <client-only>
            <span class="sub-title-date">{{ diffTime(parseInt(date)) }}</span>
            </client-only>
        </div>
        <pre>{{ content }}</pre>
        <div class="photos" :id="'viewerjs'+index" v-show="links.length>0">
            <TimelineImageFrame v-for="(item, index) in links" :src="item" :key="index" :index="index"></TimelineImageFrame>
        </div>
    </div>
</template>

<style>
    .photos {
        margin-top: 0;
        display: flex;
        flex-wrap: wrap;
    }
    pre {
        color: #000;
        background-color: #FFF;
        border-radius: 0 0 6px 6px;
        font-size: 1rem;
        font-family: inherit;
        margin: 8px 8px 4px 8px;
        word-wrap: break-word;
        word-break: break-all;
        white-space: pre-wrap;
    }
    .sub-title {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        color: rgb(83, 100, 113);
        cursor: default;
        user-select: none;
    }
    .sub-title-date {
        align-self: flex-end;
    }
    .history-field {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        border-radius: 6px;
        background-color: #FFF;
    }
    /* @media (min-width: 768px) {
        .history-field {
            margin-top: 3rem;
        }
    }
    @media (max-width: 767px) {
        .history-field {
            margin-top: 1rem;
        }
    } */
    .history-field:not(:last-child) {
        margin-bottom: 0.5rem;
    }
</style>

<script setup lang="ts">
    import Viewer from 'viewerjs';
    import 'viewerjs/dist/viewer.css';

    const props = defineProps({
        content: String,
        date: String,
        links: Array,
        index: String,
    });
    onMounted(() => {
        new Viewer(document.getElementById('viewerjs' + props.index.toString()) as HTMLElement, {
            title: false,
            toolbar: {
                rotateLeft: 1,
                rotateRight: 1,
                prev: 4,
                next: 4,
            }
        });
    });

    const diffTime = (dateTimestamp) => {
        const date = new Date(dateTimestamp * 1000);
        const currentDate = new Date();
        const dateTS = dateTimestamp;
        const currentDateTS = Math.floor(currentDate.valueOf() / 1000);

        if (currentDateTS - dateTS < 60) {
            return `${(currentDateTS - dateTS)} seconds ago`;
        }
        else if (currentDateTS - dateTS < 3600) {
            return `${Math.floor((currentDateTS - dateTS) / 60)} mins ago`;
        }
        else if (currentDateTS - dateTS < 86400) {
            return `${Math.floor((currentDateTS - dateTS) / 3600)} hours ago`;
        }
        else {
            if (currentDate.getFullYear() != date.getFullYear()) {
                return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            }
            else {
                return `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            }
        }
    }
</script>
