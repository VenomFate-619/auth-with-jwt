**Authentication using jwt token**
BaseUrl=http://localhost/port/api
#### 1.Locally
- Regisrer(POST)
URL=BaserUrl/register
Body={email,password,name}
Retrun={userSchema}
- Login(POST)
URL=BaserUrl/login
Body={email,password}
Retrun={userSchema,token(**aka jwttoken**)}
#### 2.Google
