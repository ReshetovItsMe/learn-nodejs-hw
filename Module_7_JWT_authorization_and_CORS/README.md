# JWT authorization and CORS

## PREREQUISITES

The task is a continuation of [Module 6. Logging and error handling](https://github.com/ReshetovItsMe/learn-nodejs-hw/tree/main/Module_6_Logging_and_error_handling).

## Task 1

Add authorization to the already existing REST service.

* Add _login(username, password)_ method which should return JWT token.
* Add a middleware which will proxy all the requests (except login) and check that HTTP Authorization header has the correct value of JWT token.
* In case of the HTTP Authorization header is absent in the request, the middleware should stop further controller method execution and return HTTP 401 code (Unauthorized Error) and standard error message.
* In case of HTTP Authorization header has invalid JWT token in the request, the middleware should return HTTP code 403 (Forbidden Error) and standard error message.

## Task 2

* Add CORS middleware to access service methods from WEB applications hosted on another domains (<https://github.com/expressjs/cors>).
