Pokedex.Views.PokemonDetail = Backbone.View.extend({
  template: JST['pokemon/detail'],
  events: {
    'click ul.toys li':'selectToyFromList'
  },


  refreshPokemon: function (options) {
    this.model.fetch({
      success: function (response) {
        this.render();
        if (options) { options.success(); }
      }.bind(this)
    })
  },

  render: function () {
    var content = this.template({ pokemon: this.model });
    this.$el.html(content);

    this.model.toys().each(function (toy) {
      var content = JST['toy/list_item']({ toy: toy });
      this.$el.find('ul.toys').append(content);
    }.bind(this))
    return this;
  },

  selectToyFromList: function (event) {
    var toyId = $(event.currentTarget).data('id');
    var pokemonId = $(event.currentTarget).data('pokemon-id');
    Backbone.history.navigate(
      '/pokemon/' + pokemonId + '/toys/' + toyId,
      { trigger: true }
    );
  }
});
