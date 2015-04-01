Pokedex.RootView.prototype.addToyToList = function (toy) {
  // var $li = $('<li class="toy-list-item">');
  // $li.data('id', toy.get('id'));
  // $li.data('pokemon-id', toy.get('pokemon_id'));
  //
  // var shortInfo = ['name', 'happiness', 'price'];
  // shortInfo.forEach(function (attr) {
  //   $li.append(attr + ': ' + toy.get(attr) + '<br>');
  // });
  //
  // this.$pokeDetail.find(".toys").append($li);

  // debugger
  var template = JST["toyListItem"];
  var content = template({ toy: toy });
  this.$pokeDetail.find(".toys").append(content);
};

Pokedex.RootView.prototype.renderToyDetail = function (toy) { // III
  // this.$toyDetail.empty();
  //
  // var $detail = $('<div class="detail">');
  // $detail.append('<img src="' + toy.get('image_url') + '"><br>');
  // for (var attr in toy.attributes) {
  //   if(attr !== 'pokemon_id' && attr !== 'image_url') {
  //     var $span = $('<span style="font-weight:bold;">');
  //     $span.html(attr + ': ');
  //     $detail.append($span);
  //     $detail.append(toy.get(attr));
  //     $detail.append('<br>');
  //   }
  // }
  //
  // // Phase III
  // var $pokemonSelect = $('<select>');
  // $pokemonSelect.attr("data-pokemon-id", toy.get("pokemon_id"));
  // $pokemonSelect.attr("data-toy-id", toy.id);
  // this.pokes.each(function (pokemon) {
  //   var $pokemonOption = $('<option>');
  //   $pokemonOption.attr("value", pokemon.id);
  //   $pokemonOption.text(pokemon.get("name"));
  //   if (pokemon.id == toy.get("pokemon_id")) {
  //     $pokemonOption.prop("selected", true);
  //   }
  //   $pokemonSelect.append($pokemonOption);
  // });
  // $detail.append($pokemonSelect);
  //
  // this.$toyDetail.html($detail);


  var template = JST['toyDetail'];
  var content = template({ toy: toy, pokes: this.pokes });
  this.$toyDetail.html(content);
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  var $target = $(event.target);

  var toyId = $target.data('id');
  var pokemonId = $target.data('pokemon-id');

  var pokemon = this.pokes.get(pokemonId);
  var toy = pokemon.toys().get(toyId);

  this.renderToyDetail(toy);
};
