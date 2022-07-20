<template>
    <div class="dialog" v-if="show" @click.stop ="$emit('updateShow',false)">
    <div class="dialog_content" @click.stop>
        <slot></slot>
    </div>
    </div>
</template>

<script>
export default {
    name:'my-dialog',
    props :{
        show:{
        type:Boolean,
        default:false
        }
    },
    methods:{
        
    }
}
</script>

<style scoped>
.dialog{
    top: 0;
    right:0;
    bottom:0;
    left:0;
    background: rgba(0,0,0,0.5);
    position:fixed;
    display:flex;
}
.dialog_content{
    margin:auto;
    background: whitesmoke;
    border-radius: 15px;
    min-height:50px;
    min-width:50px;
    padding:20px;
}

</style>