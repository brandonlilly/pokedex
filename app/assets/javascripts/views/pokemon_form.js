Pokedex.Views.PokemonForm = Backbone.View.extend({
  template: JST['pokemon/form'],
  events: {
    'submit form':'savePokemon'
  },

  render: function () {
    var content = this.template({
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
          '/pokemon/' + this.model.id,
          { trigger: true}
        );
      }.bind(this)
    });
  }
});
