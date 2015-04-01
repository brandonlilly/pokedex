Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    'click li':'selectPokemonFromList'
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
  },

  addPokemonToList: function (pokemon) {
    var template = JST['pokemonListItem'];
    var content = template({ pokemon: pokemon });
    this.$el.append(content);
  },

  refreshPokemon: function (options) {
    this.collection.fetch( {
      success: function () {
        this.render();
        if (options) { options.success(); }
      }.bind(this)
    });
  },

  render: function () {
    this.$el.empty();
    this.collection.each( function (pokemon) {
      this.addPokemonToList(pokemon);
    }.bind(this));
  },

  selectPokemonFromList: function (event) {
    var id = $(event.currentTarget).data('id');
    Backbone.history.navigate('pokemon/' + id, { trigger: true })
  }
});
