<template>
    <div>
        <header class="shop-header">
            <nav class="shop-bar">
                <picture>
                    <img
                    class="app-logo"
                    src="~/assets/icons/ximena_logo.svg"
                    alt="Logo_Ximena_Hoyos"
                    >
                </picture>
                <a class="shop-category-label" href="/">
                    COLAGENO
                </a>
                <a class="shop-category-label" href="/">
                    IMPLEMENTOS
                </a>
                <a class="shop-category-label" href="/">
                    PROMOCIONES
                </a>
                <a class="shop-category-label" href="/">
                    PROTEINAS
                </a>
                <picture>
                    <img
                        class="shop-icon"
                        src="~/assets/icons/bag.svg"
                        alt="Carrito">
                </picture>
            </nav>
        </header>
    </div>
</template>
<script>
export default {
	name: 'shop-bar',
	methods: {
	}
}
</script>
<style lang="scss" scoped>

    .app-logo{
        height: 25px;
        margin: 0 auto;
    }

    .shop-category-label{
        margin-left: 15px;
        font-size: 16;
        color: white;
        margin: 0 auto;
    }

    .shop-category-label:hover{
        color: #50d2d4;
    }

    .shop-icon{
        height: 30px;
        margin: 0 auto;
    }

    .shop-bar{
		flex-direction: row;
		display: flex;
		justify-content: center;
        margin-top: 60px;
        padding-left: 100px;
        padding-right: 100px;
    }

</style>
