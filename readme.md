# smartcards 📱🃏

> Play cards with your friends even if you didn't bring any 🚫 🃏 —  but everyone got a smartphone right? 📱

## description

A mobile first (maybe only) web application that lets you play cards against humanity with friends without having a deck of cards handy.
Although it works fully remote it is most fun if played in a IRL group.

Matchmaking is done via a serverless backend where clients are connected using a **session token** that gets shared from the host to its friends/players.

## game design

![usecase diagram](http://www.plantuml.com/plantuml/proxy?src=https://raw.github.com/anoff/smartcards/master/assets/usecase.iuml)

> use cases and interactions

![state machine](http://www.plantuml.com/plantuml/proxy?src=https://raw.github.com/anoff/smartcards/master/assets/state.iuml)

> game states

## application architecture

![backend setup](http://www.plantuml.com/plantuml/proxy?src=https://raw.github.com/anoff/smartcards/master/assets/infra.iuml)

## License

Cards taken from [crhallbergs collection of decks](https://github.com/crhallberg/json-against-humanity). The originals, his collection as well as all derivatives within this project are licensed under [CC BY-NC-SA 2.0](https://creativecommons.org/licenses/by-nc-sa/2.0/).

Any code in this project is licensed under [MIT](https://opensource.org/licenses/MIT)
