Pokedex.Views = {}

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

Pokedex.Views.PokemonDetail = Backbone.View.extend({
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
    // debugger
    var content = JST['pokemonDetail']({ pokemon: this.model });
    this.$el.html(content);

    this.model.toys().each(function (toy) {
      var content = JST['toyListItem']({ toy: toy });
      this.$el.find('ul.toys').append(content);
    }.bind(this))
    return this;
  },

  selectToyFromList: function (event) {
    var toyId = $(event.currentTarget).data('id');
    var pokemonId = $(event.currentTarget).data('pokemon-id');
    Backbone.history.navigate(
      'pokemon/' + pokemonId + '/toys/' + toyId,
      { trigger: true }
    );
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  events: {
    'change select':'reassignToy'
  },

  initialize: function (options) {
    this.pokes = options.pokes;
  },

  render: function () {
    // debugger
    var content = JST['toyDetail']({ pokes: this.pokes, toy: this.model });
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
        // this.$el.empty();
        Backbone.history.navigate(
          'pokemon/' + toy.get('pokemon_id') + '/toys/' + toy.id,
          { trigger: true }
        );
      }).bind(this)
    });
  }
});
