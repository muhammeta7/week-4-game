// Set global variables for game steps
var charSelected = false;
var yourCharacter;
var enemySelected = false;
var enemyName;
var yourEnemy;
var readyAttack = false;
var killCount = 0;
// Global variables for character attributes
var yourHealth;
var enemyHealth;
// Attack Variables
var yourAttack;
var yourBaseAttack;
// Enemy Counter Attacks
var enemyAttack;
// Character Objects
var jonSnow = {
	alias: "Jon Snow",
	baseAttack: 20,
	counterAttack: 25,
	message: "The King in the North",
	healthPoints: 250
};
var theMountain = {
	alias: "The Mountain" ,
	baseAttack: 25,
	counterAttack: 10,
	message: "Roar",
	healthPoints: 180
};
var khaleesi = {
	alias: "Khaleesi",
	baseAttack: 20,
	counterAttack: 25,
	message: "The Mother of Dragons",
	healthPoints: 220
};
var brienne = {
	alias: "Brienne of Tarth",
	baseAttack: 25,
	counterAttack: 15,
	message: "Brienne of Tarth for the W!",
	healthPoints: 200
};


// Import GOT theme song
// var themeSong = new Audio("http://picosong.com/RndY/");

// Game Functions
$(document).ready(function(){

	$(".stats").on("click", function(){
		if (charSelected == false){

			$('.comment').remove()

			// Move all characters to enemy side
			$('#jonSnow').appendTo("#enemy").addClass("enemyList");
			$('#mountain').appendTo("#enemy").addClass("enemyList");
			$('#khaleesi').appendTo("#enemy").addClass("enemyList");
			$('#brienne').appendTo("#enemy").addClass("enemyList");
			// Move selected character to attack div
			$(this).removeClass("enemyStats").addClass("yourStats").appendTo("#attacker")
			// Collect id of your character and it's attributes
			yourCharacter = this.id;
			yourHealth = $(this).attr('value');
			console.log(yourHealth);

			// Set base attacks
			if (yourCharacter == 'jonSnow'){
				yourBaseAttack = jonSnow.baseAttack;
			}
			if (yourCharacter == 'mountain'){
				yourBaseAttack = theMountain.baseAttack;
			}
			if (yourCharacter == 'khaleesi'){
				yourBaseAttack = khaleesi.baseAttack;
			}
			if (yourCharacter == 'brienne'){
				yourBaseAttack = brienne.baseAttack;
			}
			charSelected = true;
			return;
		}	
	});
	

	
	// Move selected enemy to Defender Div
	$(".stats").on("click", function(){
		if((this).id != yourCharacter && enemySelected == true) {
			// Move enemy to defend area
			$(this).appendTo('#defender').removeClass("enemyList").addClass("defenderStats");
			// Collect id of enemy and it't attributes
			yourEnemy = this.id;
			enemyHealth = $(this).attr('value');
			console.log(enemyHealth);
		}
		// $(document).off('click','.enemyStats'); 
		$('.comment').remove()
		enemySelected = true;
		readyAttack = true;
		return;
	});

	// Start battle
	$('#attack').on("click", function(){
		if(readyAttack){
			// Are you and the defender both alive
			if( yourHealth > 0 && enemyHealth >0){
				// Increment your attack
				yourAttack += parseInt(yourBaseAttack);
				console.log(yourAttack)
				if (yourEnemy == 'jonSnow'){
				enemyAttack = jonSnow.counterAttack;
				}
				if (yourEnemy == 'mountain'){
					enemyAttack = theMountain.counterAttack;
				}
				if (yourEnemy == 'khaleesi'){
					enemyAttack = khaleesi.counterAttack;
				}
				if (yourEnemy == 'brienne'){
					enemyAttack = brienne.counterAttack;
				}
				// Battle logic
				yourHealth = yourHealth - enemyAttack;
				enemyHealth = enemyHealth - yourAttack;
				
				// Change enemy health on-screen
				if (yourEnemy == 'jonSnow'){
					$('#jonSnowHp').html(enemyHealth);
					enemyName = "Jon Snow";
				}
				if (yourEnemy == 'mountain'){
					$('#mountainHp').html(enemyHealth);
					enemyName = "The Mountain";
					console.log(enemyHealth)
				}
				if (yourEnemy == 'khaleesi'){
					$('#khaleesiHp').html(enemyHealth);
					enemyName = "Khaleesi";
				}
				if (yourEnemy == 'brienne'){
					$('#brienneHp').html(enemyHealth);
					enemyName = "Brienne";
				}

				// Change your player health on-screen
				if (yourCharacter == 'jonSnow'){
					$('#jonSnowHp').html(yourHealth);
					console.log(yourHealth)
				}
				if (yourCharacter == 'mountain'){
					$('#mountainHp').html(yourHealth);
				}
				if (yourCharacter == 'khaleesi'){
					$('#khaleesiHp').html(yourHealth);
				}
				if (yourCharacter == 'brienne'){
					$('#brienneHp').html(yourHealth);
				}

				// Display battle messages
				$('#battleMessage').append("<p class = 'commented'>You attacked " + enemyName + " and caused " + yourAttack +" damage. </p>");
				$('#battleMessage').append("<p class = 'commented'>" + enemyName + " counter attacked and caused you " + enemyAttack +" damage. </p>");

			}
			// Your player loses scenario
			if (yourHealth <= 0){

			}

		


		}

		



	});

	


});