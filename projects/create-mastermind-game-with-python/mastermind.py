from random import randrange
# Generate a random number from 0 to 10000
number = randrange(10000)
# Add padding to the number if it doesn't have four digits
number = str(number).rjust(4, '0')
tries = 0
guess = 0

while (guess != number):
  tries += 1
  guess = ''
  # unmatched will keep track of the digits that have not been guessed
  unmatched = number
  correct_digit = 0
  correct_position = 0
  # Read a four digit number
  while (guess.isnumeric() == False or len(guess) != 4):
    guess = input('Guess the four digit number: ')
  # Count the guessed digits in the right postion
  for i in range(4):
    if (guess[i] == number[i]):
      # Set the guessed digit to 'f' in unmatched
      unmatched = unmatched.replace(guess[i], 'f', 1)
      correct_position += 1
  # Count the guessed digits in the wrong position
  if (correct_position < 4):
    for i in range(4):
      if (guess[i] in unmatched and guess[i] != number[i]):
        # Set the guessed digit to 'f' in unmatched
        unmatched = unmatched.replace(guess[i], 'f', 1)
        correct_digit += 1
    print('Digits in right position: ' + str(correct_position))
    print('Digits in wrong position: ' + str(correct_digit))
print('You are a mastermind! You guessed the number in ' + str(tries) + ' tries')
