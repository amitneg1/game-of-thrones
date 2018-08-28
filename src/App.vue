<template>
  <div id="app">
    <b-navbar toggleable="md" type="light" variant="primary">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#"><router-link to="/">Ice and Fire</router-link></b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#"><router-link to="/books">Books</router-link></b-nav-item>
          <b-nav-item href="#"><router-link to="/characters">Characters</router-link></b-nav-item>
          <b-nav-item href="#"><router-link to="/houses">Houses</router-link></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>


<!-- CSS is not scoped becase it need to be used among all the child components -->
<style lang="css">

  .loading {
    font-size: 30px;
  }

  .loading:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(4,end) 900ms infinite;      
    animation: ellipsis steps(4,end) 900ms infinite;
    content: "\2026"; /* ascii code for the ellipsis house */
    width: 0px;
  }

  @keyframes ellipsis {
    to {
      width: 1.25em;    
    }
  }

  @-webkit-keyframes ellipsis {
    to {
      width: 1.25em;    
    }
  }
</style>