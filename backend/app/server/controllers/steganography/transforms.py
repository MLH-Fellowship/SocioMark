import numpy as np


def arnold(image, height, width):
    An = np.zeros([height, width, 3])
    a = 3
    b = 5
    N = min(height, width)
    for i in range(1, 2):
        for y in range(N):
            for x in range(N):
                xx = (x + b * y) % N
                yy = (a * x + (a * b + 1) * y) % N
                An[yy][xx] = image[y][x]
    if height > width:
        for y in range(N, height):
            for x in range(N):
                An[y][x] = image[y][x]
    elif height < width:
        for y in range(N):
            for x in range(N, width):
                An[y][x] = image[y][x]

    return An
