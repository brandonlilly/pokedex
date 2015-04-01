Pokedex.Models.Pokemon = Backbone.Model.extend({
  urlRoot: '/pokemon',

  parse: function (payload) {
    if (payload.toys) {
      this.toys().set(payload.toys);
      delete payload.toys;

      this.toys().forEach((function (toy) {
        toy._pokemon = this;
      }).bind(this));
    }

    return payload;
  },

  toys: function () {
    if (!this._toys) {
      this._toys =
        new Pokedex.Collections.PokemonToys([], { pokemon: this });
    }

    return this._toys;
  }
});
