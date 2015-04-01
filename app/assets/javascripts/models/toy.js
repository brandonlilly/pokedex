Pokedex.Models.Toy = Backbone.Model.extend({
  urlRoot: '/toys',

  pokemon: function () {
    if (!this._pokemon) {
      this._pokemon =
        new Pokedex.Models.Pokemon({ id: this.pokemon_id });
    }

    return this._pokemon;
  },

  parse: function (payload) {
    if (payload.pokemon) {
      this._pokemon =
        new Pokedex.Models.Pokemon(payload.pokemon, { parse: true });
      delete payload.pokemon;
    }

    return payload;
  }
});
