Pokedex.Router = Backbone.Router.extend({
  routes: {
    '': 'pokemonIndex',
    'pokemon/:pokemonId/toys/:toyId': 'toyDetail',
    'pokemon/:id': 'pokemonDetail'
  },

  pokemonForm: function () {
    var pokemonForm = new Pokedex.Views.PokemonForm({
      model: new Pokedex.Models.Pokemon(),
      collection: this._pokemonIndex.collection
    });
    $('#pokedex .pokemon-form').html(pokemonForm.render().$el);
  },

  pokemonDetail: function (id, callback) {
    if (this._pokemonIndex) {
      var pokemon = this._pokemonIndex.collection.get(id);
      this._pokemonDetail = new Pokedex.Views.PokemonDetail( { model: pokemon })
      $("#pokedex .pokemon-detail").html(this._pokemonDetail.$el);
      this._pokemonDetail.refreshPokemon(callback);
      $('.toy-detail').empty();
    }
    else {
      this.pokemonIndex({
        success: function() {
          this.pokemonDetail(id, callback)
        }.bind(this)
      });
    }
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    this.pokemonForm();
    this._pokemonIndex.refreshPokemon(callback);
    $("#pokedex .pokemon-list").html(this._pokemonIndex.$el);
  },

  toyDetail: function (pokemonId, toyId) {
    // debugger
    if (this._pokemonDetail && this._pokemonDetail.model.id === parseInt(pokemonId)) {
      var toy = this._pokemonDetail.model.toys().get(toyId);
      // debugger
      this._toyDetail = new Pokedex.Views.ToyDetail({
          model: toy,
          pokes: this._pokemonIndex.collection
        });
      $("#pokedex .toy-detail").html(this._toyDetail.render().$el);
    }
    else {
      this.pokemonDetail(pokemonId, {
        success: function() {
          this.toyDetail(pokemonId, toyId);
        }.bind(this)
      });
    }
  }

});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
