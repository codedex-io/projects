import pygame
import random

# Constants for the window's width and height values
SCREEN_WIDTH = 960
SCREEN_HEIGHT = 720

# The RGB values for the colors used in the game
COLOR_BLACK = (0, 0, 0)
COLOR_WHITE = (255, 255, 255)

# Constants for paddle speed and ball speed
PADDLE_SPEED = 5
BALL_SPEED = 4

def main():
    # GAME SETUP

    # Initialize the Pygame library (this is absolutely necessary)
    pygame.init()

    # This creates the window for the game
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))

    # Set the window's title
    pygame.display.set_caption('Pong')

    # Create the clock object to keep track of the time
    clock = pygame.time.Clock()

    # This is to check whether or not to move the ball
    started = False

    # These are the players' game paddles
    paddle_1_rect = pygame.Rect(30, 0, 7, 100)
    paddle_2_rect = pygame.Rect(SCREEN_WIDTH - 50, 0, 7, 100)

    # This is to track by how much the players' paddles will move per frame
    paddle_1_move = 0
    paddle_2_move = 0

    # This is the rectangle that represents the ball
    ball_rect = pygame.Rect(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 25, 25)

    # Determine the x and y speed of the ball 
    ball_accel_x = random.choice([-BALL_SPEED, BALL_SPEED])
    ball_accel_y = random.randint(2, 4) * 0.1

    # GAME LOOP
    while True:

        # Set the background color to black
        screen.fill(COLOR_BLACK)

        # Make the ball move after pressing space
        if not started:
            # Load the Consolas font
            font = pygame.font.SysFont('Consolas', 30)

            # Draw some text to the center of the screen
            text = font.render('Press Space to Start', True, COLOR_WHITE)
            text_rect = text.get_rect()
            text_rect.center = (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
            screen.blit(text, text_rect)

            # Update the display
            pygame.display.flip()
            clock.tick(60)

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    return
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_SPACE:
                        started = True

            continue

        # Checking for events
        for event in pygame.event.get():
            # If the user exits the window
            if event.type == pygame.QUIT:
                return

            # If the user is pressing a key
            if event.type == pygame.KEYDOWN:
                # PLAYER 1
                if event.key == pygame.K_w:
                    paddle_1_move = -PADDLE_SPEED
                if event.key == pygame.K_s:
                    paddle_1_move = PADDLE_SPEED

                # PLAYER 2
                if event.key == pygame.K_UP:
                    paddle_2_move = -PADDLE_SPEED
                if event.key == pygame.K_DOWN:
                    paddle_2_move = PADDLE_SPEED

            # If the player released a key
            if event.type == pygame.KEYUP:
                if event.key == pygame.K_w or event.key == pygame.K_s:
                    paddle_1_move = 0.0
                if event.key == pygame.K_UP or event.key == pygame.K_DOWN:
                    paddle_2_move = 0.0

        # Move paddle_1 and paddle_2 according to their `move` variables
        paddle_1_rect.top += paddle_1_move
        paddle_2_rect.top += paddle_2_move

        # Keep paddles within screen bounds
        if paddle_1_rect.top < 0:
            paddle_1_rect.top = 0
        if paddle_1_rect.bottom > SCREEN_HEIGHT:
            paddle_1_rect.bottom = SCREEN_HEIGHT
        if paddle_2_rect.top < 0:
            paddle_2_rect.top = 0
        if paddle_2_rect.bottom > SCREEN_HEIGHT:
            paddle_2_rect.bottom = SCREEN_HEIGHT

        # Ball boundary checks
        if ball_rect.top < 0 or ball_rect.bottom > SCREEN_HEIGHT:
            ball_accel_y *= -1  # Invert vertical velocity
            if ball_rect.top < 0:
                ball_rect.top = 0
            if ball_rect.bottom > SCREEN_HEIGHT - ball_rect.height:
                ball_rect.top = SCREEN_HEIGHT - ball_rect.height

        # If the ball goes out of bounds, reset its position
        if ball_rect.left <= 0 or ball_rect.left >= SCREEN_WIDTH:
            ball_rect.center = (SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)  # Reset ball position
            ball_accel_x = random.choice([-BALL_SPEED, BALL_SPEED])  # Reset ball speed
            ball_accel_y = random.randint(2, 4) * 0.1

        # Ball collision with paddles
        if paddle_1_rect.colliderect(ball_rect):
            ball_accel_x *= -1
            ball_rect.left = paddle_1_rect.right  # Move ball outside paddle
        if paddle_2_rect.colliderect(ball_rect):
            ball_accel_x *= -1
            ball_rect.right = paddle_2_rect.left  # Move ball outside paddle

        # Move the ball
        if started:
            ball_rect.left += ball_accel_x
            ball_rect.top += ball_accel_y

        # Draw player paddles and ball
        pygame.draw.rect(screen, COLOR_WHITE, paddle_1_rect)
        pygame.draw.rect(screen, COLOR_WHITE, paddle_2_rect)
        pygame.draw.rect(screen, COLOR_WHITE, ball_rect)

        # Update the display
        pygame.display.update()
        clock.tick(60)

# Run the game
if __name__ == '__main__':
    main()
