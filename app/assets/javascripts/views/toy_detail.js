Pokedex.Views.ToyDetail = Backbone.View.extend({
  template: JST['toy/detail'],
  events: {
    'change select':'reassignToy'
  },

  initialize: function (options) {
    this.pokes = options.pokes;
  },

  render: function () {
    var content = this.template({ pokes: this.pokes, toy: this.model });
    this.$el.html(content);
    return this;
  },

  reassignToy: function (event) {
    var $select = $(event.currentTarget);
    var pokemon = this.pokes.get($select.data("pokemon-id"));
    var toy = pokemon.toys().get($select.data("toy-id"));

    toy.set("pokemon_id", $select.val());
    toy.save({}, {
      success: (function () {
        pokemon.toys().remove(toy);
        Backbone.history.navigate(
          '/pokemon/' + toy.get('pokemon_id') + '/toys/' + toy.id,
          { trigger: true }
        );
      }).bind(this)
    });
  }
});
