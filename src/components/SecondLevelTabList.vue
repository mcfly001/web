<template>
    <ul class="tab-list">
      <li
        v-for="item in list"
        :class="{active: active === item}"
        :key="item"
      >{{ item }}</li>
    </ul>
</template>

<script>
export default {
  props: ['list', 'active']
}
</script>

<style scoped>
 .tab-list{
   margin: 20px;
   background: white;
   box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
   padding: 20px 20px;
   color: #999999;
 }

 li.active{
   color: rgb(64, 158, 255);
   cursor: pointer;
   font-weight: bold;
 }
</style>
