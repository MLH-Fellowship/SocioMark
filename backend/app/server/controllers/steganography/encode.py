import numpy as np


ColRange = 16
RowRange = 16


def recover(image, height, width):
    An = np.zeros([height, width, 3])
    a = 3
    b = 5
    N = min(height, width)
    for i in range(1, 2):
        for y in range(N):
            for x in range(N):
                xx = ((a * b + 1) * x - b * y) % N
                yy = (a * x * -1 + y) % N
                An[yy, xx] = image[y][x]

    if height > width:
        for y in range(N, height):
            for x in range(N):
                An[y][x] = image[y][x]
    elif height < width:
        for y in range(N):
            for x in range(N, width):
                An[y][x] = image[y][x]
    return An


def watermark(image, info):
    index = 0
    for i in range(RowRange):
        for j in range(ColRange):
            a = image[i, j]
            digit = info[index]
            index += 1

            if a[1] % 2 == 0 and digit == 1:
                a[1] = a[1] + 1

            elif a[1] % 2 == 1 and digit == 0:
                a[1] = a[1] - 1
            image[i, j] = a
