<template>
    <div class="documentation scrolling-component" ref="scrollComponent" >
        <div class="main-field">
            <div class="post">
                <div class="page-control">
                    <client-only>
                    <div class="pre-page change-page" :class="{'cant-click': pageNum==0}">
                        <span class="icon-page" @click="prePage">
                            <font-awesome-icon :icon="['fa', 'chevron-circle-left']" size="lg" />
                        </span>
                    </div>
                    </client-only>

                    <div class="current-page">
                        <span>{{ pageNum }}</span>
                        <span> / </span>
                        <span>{{ pageNum + remainPage }}</span>
                    </div>

                    <client-only>
                    <div class="next-page change-page" :class="{'cant-click': remainPage==0}">
                        <span class="icon-page" @click="nextPage">
                            <font-awesome-icon :icon="['fa', 'chevron-circle-right']" size="lg" />
                        </span>
                    </div>
                    </client-only>
                </div>
                <TimelinePost v-for="(item, index) in dataArray" :key="index" :index="item.id.toString()" :content="item.content" :date="item.date" :links="item.links" ></TimelinePost>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .current-page {
        font-weight: 700;
        user-select: none;
    }
    .change-page {
        cursor: pointer;
    }
    .change-page.cant-click {
        cursor: not-allowed;
    }
    .change-page.cant-click:hover {
        color: #FFF;
    }
    .change-page:hover {
        color: #bfbfbf;
    }
    .page-control {
        display: flex;
        margin-bottom: 1rem;
        color: #FFF;
    }
    @media (max-width: 767px) {
        .page-control {
            justify-content: space-between;
            margin-left: 1rem;
            margin-right: 1rem;
        }
    }
    @media (min-width: 768px) {
        .page-control {
            justify-content: flex-end;
        }
        .current-page {
            padding: 0 5rem;
        }
    }
    .icon-page {
        box-sizing: content-box;
    }
</style>

<script setup>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    library.add(faChevronCircleLeft, faChevronCircleRight)

    import config from '~/config/config';
    const nuxtApp = useNuxtApp();
    
    const route = useRoute()
    const pageNum = parseInt(route.params.id);

    const throwError = () => {
        const error = new Error();
        error.statusCode = 404;
        nuxtApp.ssrContext.error = error;
    }

    if (!/^\d+$/.test(pageNum)) {
        throwError();
    }

    let dataArray = ref([]);
    let postStart = (pageNum) * 20;
    let postLength = 20;

    const { data } = await useFetch(`${config.baseurl}/api/getdatassr`, {
        method: 'POST',
        body: {
            from: postStart,
            length: postLength,
        }
    });


    let remainPage = 0;
    if (data.value.data.length == 0) {
        throwError();
    }
    else {
        remainPage = Math.ceil( (data.value.data[data.value.data.length - 1].id - 1) / postLength );
    }

    for (let i = 0; i < data.value.data.length; ++i) {
        dataArray.value.push(data.value.data[i]);
    }

    const prePage = () => {
        if (pageNum == 0) return;
        window.location.replace( (pageNum-1).toString() );
    }
    
    const nextPage = () => {
        if (remainPage == 0) return;
        window.location.replace( (pageNum+1).toString() );
    }

</script>