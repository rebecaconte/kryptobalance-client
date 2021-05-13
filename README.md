#  KryptoBalance

## Project description:

KryptoBalance is an app that allows users to create the perfect environment to keep track of their investments in crypto currency. The available tools such as graphics, conversions, history and alerts simplifies and connects all information in one single board.
 
The user has right in hand all the needed information of all his investments in one place. 

## User stories:

#### Must Have
- a user can create an account 
- a user can sign in
- a user has a profile
- a user can edit it’s profile
- a user can logout

- a user can add a coin
- a user can edit a coin
- a user can delete a coin


### Nice to have

- user: 
  - user can set alerts
  - user can add favorite coins
  - user can follow the growth of investment
  
  
## Model Schemas:

``` 
User = {
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    image: String,
    timestamps
} 
``` 

``` 
Coin = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    purchaseDate: Date,
    amount: Decimal128,
    user: ObjectId,
    timestamps
}
``` 


	
## Model relationships:

```
--------                ---------
| User | -(n)------(1)- | Coin |
--------                --------- 
                            |
                           (n)
                            |
                            |
                           (n)
                            | 
                        ---------
                        | ////  |
                        ---------
```

## Route planning:

### public routes

#### session handling
-  get ‘/’ => landing page
-  get ‘/about’ => get about page
-  get ‘/signin’ => get signin form
-  post ‘/signin’ => signin in and create session
-  get ‘/signup’ => get signup form
-  post ‘/signup’ => create user and session
-  post ‘/logout’ => delete session

### user private routes

#### view and edit user profile

- get ‘/profile’ => show profile
- get ‘/profile/edit’ => edit user information - form 
- patch ‘/profile/update’ => update user - information

#### create a coin

- get ‘/dashboard’ => show dashboard
- get '/coin/add' => get add coin form
- get ‘/coin/edit’ => edit coin information - form 
- patch ‘/profile/update’ => update coin - information

#### display a coin

- get ‘/coin’ => show coinIndex page


#### add a favorite coin

- post ‘/favorite’ => add favorite


#### create an alert

- post ‘/favorite’ => add favorite


## Links

- [Kanban Board](https://trello.com/b/NGUWZUic/cryptobalance)

- [Git Repository](https://github.com/rebecaconte/kryptobalance-client)

- [Wireframes](https://whimsical.com/DdCYUuCuSbtVSXuxmh8aci)

- [API](https://www.coingecko.com/en/api)

