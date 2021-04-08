import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, HTTPAuthorizationCredentials, HTTPBearer
from fastapi import HTTPException, Security
from ..config import config


class AuthHandler():

    security = HTTPBearer()
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

    def get_password_hash(self, password):
        return self.pwd_context.hash(password)

    def verify_password(self, plain_password, hashed_password):
        return self.pwd_context.verify(plain_password, hashed_password)

    # create jwt access token
    def create_access_token(self, email):
        payload = {
            'exp': datetime.utcnow() + timedelta(int(config["ACCESS_TOKEN_EXPIRE_MINUTES"])),
            'sub': email
        }
        return jwt.encode(
            payload,
            config["SECRET_KEY"],
            algorithm=config["ALGORITHM"]
        )

    def decode_token(self, token):
        try:
            payload = jwt.decode(token, config["SECRET_KEY"], algorithms=[config["ALGORITHM"]])
            return payload["sub"]
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Signature has expired')
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail='Invalid Token')

    def auth_wrapper(self, auth: HTTPAuthorizationCredentials = Security(security)):
        return self.decode_token(auth.credentials)


auth_handler = AuthHandler()
