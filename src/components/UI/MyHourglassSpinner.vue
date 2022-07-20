<template>
    <div class="lds-hourglass">
      <slot class="dialog_content"></slot>
    </div>
</template>

<script>
export default {
    name:"my-hourglass-spinner"
}
</script>

<style scoped>
.dialog_content{
    margin:150px;
    display: block;
    align-self: center;
}
.lds-hourglass {
  display: inline-block;
  position: absolute;
  top:0;
  bottom: 200px;
  left: 0;
  right:200px;
  margin: auto;
  width: 80px;
  height: 80px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  box-sizing: border-box;
  border: 150px solid #cef;
  border-color: #cef transparent #cef transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>