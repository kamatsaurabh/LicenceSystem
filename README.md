# LicenceSystem
LicenceSystem

This Application runs on nodejs with Express
1.Pre Requisite:-
.env file have some configuration need to provided
2. Npm install modules and npm start

# Functionalities
1. logger using winston
2. uses aggregate methods
3. Generic Error handler
4. Generic Catch Error Method


#### This Application consist of two modules User and Licence

# User Registration consist of three functionalities:-

1. Register User
Post : http://localhost:3000/api/v1/register
    {
    "name":"kajal",
    "email":"kajal@gmail.com",
    "password":"Intel@01",
    "confirm_password":"Intel@01",
    "role":"operator"
}

role is defined in userModel

2.Login user
Post : http://localhost:3000/api/v1/login
{
    "email":"saurabhk70@gmail.com",
    "password":"Intel@01"
}

This will generate a token for you which is directly been used in cookie

3. logOut user
Get: http://localhost:3000/api/v1/logout



# Licence System has four different functionalities:-
1. Create Licence
Post : http://localhost:3000/api/v1/licences
{
  "plan": "ENTERPRISE"
}

Plan is defined in LicenceModel

2.Get All Licence(Pagination Based)
Get : http://localhost:3000/api/v1/licences?page=2

This will generate a token for you which is directly been used in cookie

3. Get Licence(Id based )
Get: http://localhost:3000/api/v1/679faed7fb58d269a880c94d

4. Update Licence(Id based)
PUT: http://localhost:3000/api/v1/679faed7fb58d269a880c94d
{
  "status": "deactivated"
}

4. Delete Licence(Id based)
Delete: http://localhost:3000/api/v1/679faed7fb58d269a880c94d