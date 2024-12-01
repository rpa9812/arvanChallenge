<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="bg-primary col-auto col-md-2 min-vh-100">
        <div class="bg-primary">
          <a class="d-flex text-decoration-none align-items-center">
            <span class="fs-4 d-none d-sm-inline text-white">Post</span>
          </a>
          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <a href="/articles" class="nav-link active" aria-current="page"
                >All Articles</a
              >
            </li>
            <li class="nav-item">
              <a
                href="/articles/create"
                class="nav-link active"
                aria-current="page"
                >New Article</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-link {
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
}
</style>
