<template>
    <div class="documentation scrolling-component" ref="scrollComponent" >
        <div class="main-field" :class="{'main-field-no-editor': (showEditor == 0)}">
            <div class="editor" v-show="showEditor != '0'">
                <TimelineEditor @update="updatePosts"></TimelineEditor>
            </div>
            <!-- <client-only> -->
            <div class="post">
                <TimelinePost v-for="(item, index) in dataArray" :key="index" :index="item.id.toString()" :content="item.content" :date="item.date" :links="item.links" ></TimelinePost>
            </div>
            <!-- </client-only> -->
        </div>
    </div>
</template>

<style>
    @media (max-width: 767px) {
        .main-field-no-editor.main-field {
            margin-top: -0.5rem;
        }
    }
</style>

<script setup>
    import axios from 'axios';
    import config from '~/config/config';

    const props = defineProps({
        showEditor: String,
    });

    let dataArray = ref([]);
    let postStart = 0;
    let postLength = 20;

    // const { data } = await useFetch('/api/getpost', {
    //     transform(input) {
    //         return input.dataArray;
    //     },
    //     method: 'POST',
    //     body: {
    //         from: 0,
    //         length: postFrom,
    //     }
    // });
    
    const { data } = await useFetch(`${config.baseurl}/api/getdatassr`, {
        method: 'POST',
        body: {
            from: postStart,
            length: postLength,
        }
    });
    for (let i = 0; i < data.value.data.length; ++i) {
        dataArray.value.push(data.value.data[i]);
    }
    postStart += 20;

    const loadMorePosts = async() => {
        axios.get(`${config.baseurl}/server/middleware/getpost`, {
                params: {
                    from: postStart,
                    length: postLength,
                }
            }, {
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .then( response => {
                for (let i = 0; i < response.data.posts.length; ++i) {
                    dataArray.value.push(response.data.posts[i]);
                }
                postStart += 20;
            }).catch( error => {
                console.log(error);
            });
    }

    const updatePosts = (args) => {
        dataArray.value.unshift(args);
        postStart++;
        axios.post(`${config.baseurl}/server/middleware/insertpost`, args, {
                headers: {
                    'Content-type': 'application/json', 
                }
            })
            .then( response => {
            }).catch( error => {
                console.log(error);
            });
    }

    const scrollComponent = ref(null);
    let isBusy = false;

    const handleScroll = async (e) => {
        let element = scrollComponent.value;
        if ((element.getBoundingClientRect().bottom < window.innerHeight) && (isBusy == false)) {
            isBusy = true;
            await loadMorePosts();
        }
        if ((element.getBoundingClientRect().bottom > window.innerHeight) && (isBusy == true)) {
            isBusy = false;
        }
    }

    onMounted(() => {
        window.addEventListener("scroll", handleScroll);
    })

    onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
    })

</script>
