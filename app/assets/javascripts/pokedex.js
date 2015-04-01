Pokedex = window.Pokedex = {
  Collections: {},
  Models: {},
  Routers: {},
  Views: {},

  initialize: function () {
    new Pokedex.Router();
    Backbone.history.start();
  }

};

$(Pokedex.initialize)
