<template>
     <button type="submit" :class="buttonClass"><slot></slot></button>
</template>

<script>


export default {
    props:['buttonText','buttonClass'],

 
}
</script>
