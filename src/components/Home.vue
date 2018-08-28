<template>
  <div class="home">
    <div class="card-deck row mt-5">
      <div class="col-sm-12 col-md-12 col-lg-4">
        <div class="card">
          <img class="card-img-top" src="../assets/books.jpg" height="242" alt="Books">
          <div class="card-body">
            <h5 class="card-title">Books</h5>
            <p class="card-text">Get information about books in the series.</p>
          </div>
          <div class="card-footer">
            <router-link to="/books">View all books</router-link>
          </div>
        </div>  
      </div>
      <div class="col-sm-12 col-md-12 col-lg-4">
        <div class="card">
          <img class="card-img-top" src="../assets/characters.jpg" height="242" alt="Characters">
          <div class="card-body">
            <h5 class="card-title">Characters</h5>
            <p class="card-text">Get information about characters in the series.</p>
          </div>
          <div class="card-footer">
            <router-link to="/characters">View all characters</router-link>
          </div>
        </div>  
      </div>
      <div class="col-sm-12 col-md-12 col-lg-4">
        <div class="card">
          <img class="card-img-top" src="../assets/houses.jpg" height="242" alt="Houses">
          <div class="card-body">
            <h5 class="card-title">Houses</h5>
            <p class="card-text">Get information about houses in the series.</p>
          </div>
          <div class="card-footer">
            <router-link to="/houses">View all houses</router-link>
          </div>
        </div>  
      </div>
    </div>
  </div>
</template>
