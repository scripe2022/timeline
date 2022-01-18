<template>
    <div class="editor-field">
        <div class="textarea-field">
            <textarea ref="input" class="main-editor" @input="autoGrow" @focus="closePicker" v-model="content" spellcheck="false" placeholder="Post something..."></textarea>
        </div>
        <div class="editor-photos" v-show="uploadImages.length>0">
            <TimelineImageFrame v-for="(item, index) in uploadImages" :src="item" :key="index" :index="index" :inEditor="true" @deleteImage="deleteImage"></TimelineImageFrame>
            <div class="image-div image-style add-new-photo" @click="addImage" >
                <span class="image-icon">
                    <font-awesome-icon :icon="['fa', 'plus']" size="2x" />
                </span>
            </div>
        </div>
        <div class="toolbar">
            <div class="flex-left">
                <client-only>
                <div class="icon-circle">
                    <span class="icon" @click="addEmoji">
                        <font-awesome-icon :icon="['fa', 'smile-beam']" size="lg" />
                    </span>
                </div>
                <div class="icon-circle">
                    <span class="icon" @click="addImage">
                        <font-awesome-icon :icon="['fa', 'images']" size="lg" />
                    </span>
                </div>
                </client-only>
            </div>
            <div class="flex-left">
                <div class="post-field" :class="{'is-empty': (content.length==0)}" @click="newPost">
                    <span class="post-button">Post</span>
                </div>
                <input style="display: none" type="file" ref="file" accept="image/*" multiple @change="getFile($event)">
            </div>
        </div>

        <client-only>
            <Picker style="width: 100%;" v-show="showPicker" :data="emojiIndex" set="twitter" @select="insertEmoji" :native="true" :showPreview=false :showSearch=false />
        </client-only>
    </div>
</template>

<style>
    .add-new-photo {
        border: 1px dashed #bfbfbf;
        box-sizing: border-box;
        background-color: #f5f5f5;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #8c8c8c;
    }
    .add-new-photo:hover {
        color: #595959;
    }
    .editor-photos {
        margin: -4px 8px 0px 8px;
        display: flex;
        flex-wrap: wrap;
    }
    .editor-field, .main-editor {
        width: 100%;
        box-sizing: border-box;
    }
    .editor-field {
        background-color: white;
        border-radius: 6px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    }
    .main-editor {
        resize: none;
        border: none;
        border-bottom: 1px solid #EFF3F4;
        border-radius: 6px 6px 0 0;
        overflow: hidden;
        min-height: 100px;
        padding: 1rem;
        font-size: 1rem;
        font-family: inherit;
        margin: 0;
    }
    .main-editor:focus {
        outline: none!important;
    }
    .toolbar {
        display: flex;
        justify-content: space-between;
    }
    .flex-left {
        display: flex;
    }
    .icon {
        color: #1D98F0;
        box-sizing: content-box;
    }
    .icon-circle:first-child {
        margin-left: 5px;
    }
    .icon-circle {
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
    }
    @media (min-width: 768px) {
        .icon-circle:hover {
            background-color: #E8F5FD;
        }
        .icon-circle:active {
            background-color: #D2E8FC;
        }
        .history-field:first-child {
            margin-top: 3rem;
        }
    }
    @media (max-width: 767px) {
        .history-field:first-child {
            /* margin-top: -8px; */
            margin-top: 1rem;
        }
    }
    /* #8ECDF7
    #1D9BF0
    #1A8CD8
    #177CC0 */
    .text-field, .toolbar, .textarea-field {
        box-sizing: content-box;
    }
    .post-field {
        border-radius: 9999px;
        background-color: #1D98F0;
        cursor: pointer;
        margin: 6.2px 10px 6.2px 0;
        vertical-align: middle;
        height: 30px;
    }
    .post-field:hover {
        background-color: #1A8CD8;
    }
    .post-field:active {
        background-color: #177CC0;
    }
    .post-field.is-empty {
        background-color: #8ECDF7;
        cursor: not-allowed;
    }
    .post-button {
        font-size: 14px;
        line-height: 30px;
        display: inline-block;
        vertical-align: middle;
        color: #FFF;
        font-weight: 700;
        margin: auto 1.5rem;
    }

</style>

<script setup lang="ts">
    import md5 from 'blueimp-md5'
    import OSS from 'ali-oss';
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faImages, faSmileBeam, faPlus } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import config from '~/config/config.js';
    import axios from 'axios';
    library.add(faImages);
    library.add(faSmileBeam);
    library.add(faPlus);

    import data from "emoji-mart-vue-fast/data/all.json";
    import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
    import "emoji-mart-vue-fast/css/emoji-mart.css";
    let emojiIndex = new EmojiIndex(data);

    var client;
    const getToken = async() => {
        await axios.get(`${config.baseurl}/server/middleware/gettoken`)
            .then((args) => {
                const token = args.data;
                client = new OSS({
                    region: config.oss.region,
                    accessKeyId: token.AccessKeyId,
                    accessKeySecret: token.AccessKeySecret,
                    stsToken: token.SecurityToken,
                    bucket: config.oss.bucket,
                    refreshSTSTokenInterval: 300000,
                    refreshSTSToken: async() => {
                        const refreshToken = await axios.get(`${config.baseurl}/server/middleware/gettoken`);
                        return {
                            accessKeyId: refreshToken.data.AccessKeyId,
                            accessKeySecret: refreshToken.data.AccessKeySecret,
                            stsToken: refreshToken.data.SecurityToken,
                        }
                    },
                });
            })
    }
    getToken();
    setInterval(function() {
        getToken();
    }, 300000);


    let showPicker = ref(false);
    let content = ref('');
    let value = ref('');
    let uploadImages = ref([]);
    let uploadImagesSuffix = ref([]);
    let input = ref(null);
    let file = ref(null);
    let locked = false;

    const autoGrow = () => {
        const scrollHeight = input.value.scrollHeight;
        const height = input.value.offsetHeight;
        if (height != scrollHeight) {
            input.value.style.height = 'auto';
            input.value.style.height = input.value.scrollHeight + 'px';
        }
    }

    const addImage = () => {
        file.value.click();
    }

    const addEmoji = () => {
        if (showPicker.value == false) {
            showPicker.value = true;
        }
        else {
            showPicker.value = false;
            input.value.focus();
            input.value.setSelectionRange(selectionStart, selectionStart);
        }
    }

    let selectionStart = 0;
    let selectionEnd = 0;

    const insertEmoji = (emoji) => {
        const preStr = content.value.slice(0, selectionStart);
        const sufStr = content.value.slice(selectionEnd, content.value.length);
        content.value = preStr + emoji.native + sufStr;
        selectionStart += 2;
        selectionEnd += 2;
    }

    const closePicker = () => {
        if (showPicker.value == true) {
            showPicker.value = false;
        }
    }

    watch(showPicker, (showPicker, preShowPicker) => {
        if (showPicker == true) {
            selectionStart = input.value.selectionStart;
            selectionEnd = input.value.selectionEnd;
        }
    });

    const emit = defineEmits([
        'update',
    ]);

    const newPost = async() => {
        if (((content.value == '') && (uploadImages.value.length == 0)) || locked) return;
        locked = true;

        showPicker.value = false;

        let uploadPromises = [];
        for (let i = 0; i < uploadImages.value.length; ++i) {
            uploadPromises.push(uploadToOSS(uploadImages.value[i], uploadImagesSuffix.value[i]));
        }
        Promise.all(uploadPromises)
            .then(links => {
                let postInfo = {
                    id: 'new',
                    content: content.value,
                    date: Math.floor((new Date().valueOf()) / 1000).toString(),
                    links: links,
                };
                emit('update', postInfo);
                content.value = "";
                uploadImages.value = [];
                uploadImagesSuffix.value = [];
                locked = false;
            });
    }

    const getFile = (event) => {
        let n = event.target.files.length;
        for (let i = 0; i < n; ++i) {
            if ((event.target.files[i].size) && (event.target.files[i].type.indexOf('image') != '-1')) {
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]);
                reader.onload = function(e) {
                    uploadImages.value.push(e.target.result);
                    uploadImagesSuffix.value.push(event.target.files[i].name.substring(event.target.files[i].name.lastIndexOf('.') + 1));
                }
            }
        }
    }

    const deleteImage = (args) => {
        uploadImages.value.splice(args, 1);
    }

    const toBlob = (urlData, fileType) => {
        let bytes = window.atob(urlData);
        let n = bytes.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bytes.charCodeAt(n);
        }
        return new Blob([u8arr], { type: fileType });
    }

    const uploadToOSS = (fileData, suffix) => {

        const base64 = fileData.split(',').pop();
        const fileType = fileData.split(';').shift().split(':').pop();
        const blob = toBlob(base64, fileType);
        const currentDate = new Date();

        return new Promise(function(resolve, reject) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            reader.onload = async function(event) {
                // const client = new OSS(config.oss);
                const hash = md5(fileData);
                const objectKey = `${config.bucketPrefix}/${currentDate.getFullYear()}/${currentDate.getMonth()+1}/${hash}.${suffix}`;
                const buffer = new OSS.Buffer(event.target.result);

                await client.put(objectKey, buffer)
                    .then(function(result) {
                        const url = result.url.slice(0, 4) + 's' + result.url.slice(4, result.url.length);
                        resolve(url);
                    }).catch(function(error) {
                        reject(error);
                    });
            }
        });

    }

</script>
