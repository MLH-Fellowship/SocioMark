from passlib.context import CryptContext
import jwt
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer, HTTPAuthorizationCredentials,HTTPBearer
from fastapi import Depends, FastAPI, HTTPException, status, Security
class AuthHandler():
    #later move to env file
    SECRET_KEY = "0d6b0ec26db1be6d211e11257459fde2fcc8256514eca3fb6a67075fa28ad2f3"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

    security = HTTPBearer()
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

    def get_password_hash(self, password):
        return self.pwd_context.hash(password)
        
    def verify_password(self, plain_password, hashed_password):
        return self.pwd_context.verify(plain_password, hashed_password)
    
    #create jwt access token
    def create_access_token(self, email):
        payload = {
            'exp' : datetime.utcnow() + timedelta(minutes=self.ACCESS_TOKEN_EXPIRE_MINUTES),
            'sub' : email
        }
        return jwt.encode(
            payload,
            self.SECRET_KEY,
            algorithm=self.ALGORITHM
        )
 
    def decode_token(self, token):
        try:
            payload = jwt.decode(token, self.SECRET_KEY, algorithms=[self.ALGORITHM])
            return payload["sub"]
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Signature has expired')
        except jwt.InvalidTokenError as e:
            raise HTTPException(status_code=401, detail='Invalid Token')

    
    def auth_wrapper(self, auth: HTTPAuthorizationCredentials = Security(security)):
        return self.decode_token(auth.credentials)        