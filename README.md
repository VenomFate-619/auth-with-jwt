**Authentication using jwt token**
BaseUrl=http://localhost/port/api
#### 1.Locally
- Register(POST)
URL=BaserUrl/register
Body={email,password,name}
Retrun={userSchema}
- Login(POST)
URL=BaserUrl/login
Body={email,password}
Retrun={userSchema,token(**aka jwttoken**)}
#### 2.Google
 - UrlFetch(GET) 
URL=BaserUrl/googlelogin 
Return={url}.This return url is to be given to frontend so the google login screeen prompt.
 - EmailExtraction(GET) 
 URL=BaseUrl/auth/google/callback 
 Return={ userSchema,token(**aka jwttoken**) }

 

