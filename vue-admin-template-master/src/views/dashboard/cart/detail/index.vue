<template>
  <div class="" style="width: 100%;">
      <div class="header">
        {{title}}
       <svg t="1655386718876" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="892" width="20" height="20"><path d="M896 704h-64v256H128V243.84L306.56 64H832v192h64V0H268.8L64 206.08V1024h832v-64z m0-384v76.8L589.44 704h-26.88L448 589.44V512H320v128h77.44L512 754.56V832h128v-77.44L946.56 448H1024V320z" fill="#666666" p-id="893"></path></svg>
      </div>
      <div class="">
          {{count}}
      </div>
      <div class="charts">
        <slot name="charts">

        </slot>
      </div>
      <div class="">
        <slot name="footer">

        </slot>
      </div>
  </div>
</template>

<script>
  export default{
    name:"detail",
    props:["title","count"]
  }

</script>

<style>
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .charts{
    width: 100%;
    height: 50px;
  }
</style>
