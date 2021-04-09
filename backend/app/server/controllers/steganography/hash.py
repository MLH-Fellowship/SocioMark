import hashlib


def hash_sha_info(user_id: str) -> list:
    hash_method = hashlib.sha256()
    hash_method.update(user_id.encode("utf-8"))
    binary = []
    temp = []
    result = []

    string = hash_method.hexdigest()

    for i in string:
        if i >= "0" and i <= "9":
            b = ord(i) - 48
        else:
            b = ord(i) - 55
        while len(temp) < 4:
            temp.append(b % 2)
            b //= 2
        while len(temp) > 0:
            binary.append(temp.pop())

    result.append(string)
    result.append(binary)
    return result
