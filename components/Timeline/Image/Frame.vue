<template>
    <div class="image-div" :class="{'has-filter': inEditor, 'cursor-default': inEditor, 'image-style-last': (((index+1)%4)==0)}">
        <img class="image-style" :class="{'cursor-default': inEditor}" :src="src" />
        <div class="upload-image" v-show="inEditor">
            <span class="in-photo-icon" @click="deleteImage">
                <font-awesome-icon :icon="['fa', 'trash-alt']" size="2x" />
            </span>
        </div>
    </div>
</template>

<style>
    .image-style.cursor-default {
        cursor: default;
    }
    .in-photo-icon {
        color: #1D98F0;
        cursor: pointer;
        position: absolute;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .image-div {
        position: relative;
        display: flex;
        /* display: inline-block; */
        flex-shrink: 0;
        margin-top: 4px;
        transition: opacity .3s;
    }
    
    .upload-image {
        z-index: 1;
    }
    .image-style {
        object-fit: cover;
        border-radius: 6px;
        cursor: pointer;

        height: 100%;
        width: 100%;
    }
    @media (min-width: 768px) {
        .image-div {
            aspect-ratio: 1 / 1;
            width: 100px;
        }
        .image-div:not(:last-child) {
            margin-right: 4px;
        }
        .has-filter:hover {
            filter: opacity(0.5);
        }
        .in-photo-icon:hover {
            color: #0050b3;
        }
    }
    @media (max-width: 767px) {
        .image-div {
            aspect-ratio: 1 / 1;
            width: calc((100% - 12px) / 4);
        }
        .image-div:not(:last-child) {
            margin-right: 4px;
        }
        .image-style-last:not(:last-child) {
            margin-right: 0px;
        }
    }
</style>

<script setup>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    library.add(faTrashAlt);


    const emit = defineEmits([
        'deleteImage',
    ]);

    const props = defineProps({
        src: String,
        index: Number,
        inEditor: Boolean,
    });

    const deleteImage = () => {
        emit('deleteImage', props.index);
    }
</script>