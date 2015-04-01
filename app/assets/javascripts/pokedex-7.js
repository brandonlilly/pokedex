Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
    'submit form':'savePokemon'
  },

  render: function () {
    var content = JST['pokemonForm']({
      pokemon: this.model,
      pokes: this.collection
    });
    this.$el.html(content);
    return this;
  },

  savePokemon: function (event) {
    event.preventDefault();
    var pokemonAttr = $(event.currentTarget).serializeJSON().pokemon;
    this.model.set(pokemonAttr);
    this.model.save({},{
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate(
          'pokemon/' + this.model.id,
          { trigger: true}
        );
      }.bind(this)
    });
  }
});
