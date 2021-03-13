# Task 2

Add server-side validation for create/update operations of Userentity:

* all fields are required;
* login validationis required;
* password must contain letters and numbers;
* user’s age must be between 4 and 130.

In case of any property does not meet the validation requirements or the field is absent, return 400 (Bad Request) and detailed error message.
