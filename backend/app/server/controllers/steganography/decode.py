ColRange = 16
RowRange = 16


def sha_extract(image):
    s = ""
    count = 1
    num = 0
    for i in range(RowRange):
        for j in range(ColRange):
            if count == 4:
                count = 1
                num = num * 2 + image[i, j][1] % 2
                if num <= 9:
                    s = s + chr(int(num + 48))
                else:

                    s = s + chr(int(num + 87))
                num = 0
            else:
                num = num * 2 + image[i, j][1] % 2
                count += 1
    return s
