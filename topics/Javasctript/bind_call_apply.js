/* ------------------------------------------- bind -------------------------------------------

bind() returns a new function with its this value fixed to the object we pass.
It does not execute the function immediately.
*/

var pokemon = {
  firstname: "Pika",
  lastname: "Chu",
  getPokeName: function () {
    return this.firstname + " " + this.lastname;
  },
};

var pokemonName = function () {
  console.log(this.getPokeName() + " I choose you!");
};

var logPokemon = pokemonName.bind(pokemon);
logPokemon();

// Output: Pika Chu I choose you!

/* ------------------------------------------- bind with arguments ------------------------------------------- */

var pokemonNameWithDetails = function (snack, hobby) {
  console.log(this.getPokeName() + " loves " + snack + " and " + hobby);
};

var logPokemonWithDetails = pokemonNameWithDetails.bind(pokemon);
logPokemonWithDetails("sushi", "algorithms");

// Output: Pika Chu loves sushi and algorithms

/* ------------------------------------------- call and apply -------------------------------------------

call() and apply() execute the function immediately.
The difference is how arguments are passed.
*/

pokemonNameWithDetails.call(pokemon, "sushi", "algorithms");
pokemonNameWithDetails.apply(pokemon, ["sushi", "algorithms"]);

// Output:
// Pika Chu loves sushi and algorithms
// Pika Chu loves sushi and algorithms

/*
Interview summary:
- call(): invokes the function immediately and accepts arguments one by one.
- apply(): invokes the function immediately and accepts arguments as an array.
- bind(): returns a new function and does not invoke it immediately.
*/
