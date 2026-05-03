import bcrypt

def generate_hash(password: str):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(password, hash_poasword) -> bool:
    if not hash_poasword:
        return False

    return bcrypt.checkpw(password.encode('utf-8'), hash_poasword.encode('utf-8'))

