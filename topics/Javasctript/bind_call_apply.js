/*-------------------------------------------bind-----------------------------------------------------------

The bind() method creates a new function that, when called, has its this keyword set to the provided value. 

This is extremely powerful. It let’s us explicitly define the value of this when calling a function.
*/
var pokemon = {
    firstname: 'Pika',
    lastname: 'Chu ',
    getPokeName: function () {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};

var pokemonName = function () {
    console.log(this.getPokeName() + 'I choose you!');
};

var logPokemon = pokemonName.bind(pokemon); // creates new object and binds pokemon. 'this' of pokemon === pokemon now

logPokemon(); // 'Pika Chu I choose you!'


//-----------------OR

var pokemon1 = {
    firstname: 'Pika',
    lastname: 'Chu ',
    getPokeName: function () {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};

var pokemonName1 = function (snack, hobby) {
    console.log(this.getPokeName() + 'I choose you!');
    console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
};

var logPokemon1 = pokemonName1.bind(pokemon); // creates new object and binds pokemon. 'this' of pokemon === pokemon now

logPokemon1('sushi', 'algorithms'); // Pika Chu  loves sushi and algorithms


/*----------------------------------------------------------------------------------------------------------

The main differences between bind() and call()

The call() method: Accepts additional parameters as well
Executes the function it was called upon right away.

The call() method does not make a copy of the function it is being called on.
call() and apply() serve the exact same purpose. 

The only difference between how they work is that call() expects all parameters to be passed in individually, 
whereas apply() expects an array of all of our parameters.
 */

var pokemon2 = {
    firstname: 'Pika',
    lastname: 'Chu ',
    getPokeName: function () {
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
    }
};

var pokemonName2 = function (snack, hobby) {
    console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
};

pokemonName2.call(pokemon, 'sushi', 'algorithms'); // Pika Chu  loves sushi and algorithms
pokemonName2.apply(pokemon, ['sushi', 'algorithms']); // Pika Chu  loves sushi and algorithms

/*----------------------------------------------------------------------------------------------------------*/
