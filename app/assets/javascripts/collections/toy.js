Pokedex.Collections.PokemonToys = Backbone.Collection.extend({
  model: Pokedex.Models.Toy,

  initialize: function(models, options) {
    this.pokemon = options.pokemon;
  }
});
