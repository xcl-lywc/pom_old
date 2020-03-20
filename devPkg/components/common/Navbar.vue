/*******************************************************
 * author tao.zhang 
 * date 2017/12/18 
 * 导航条
 *******************************************************/
<template>
    <div class="nx-nav">
        <div class="nav-div">
            <ul class="nav-list nav nav-tabs">
                <router-link tag="li"  v-for="url in urls" :to="url.path" :key="url.path">
                    <a>{{url.name}}</a>
                </router-link>
            </ul>
            
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            urls: {
                type: Array,
                required: true
            },

            userData: {
                type: Object,
                required: true
            },
        },
        data: function(){
            return {
            }
        },
        mounted: function(){
            console.log(this.urls)
        },
        methods: {
        }
    }
</script>

<style>

</style>
