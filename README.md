# kanban

Small kanban app, dont mind animations, just wanted to play with them.
Since it is purely frontend app im going to host via github so there will be a link soon.

## Things that I noticed

- I can leave height: 100% for elements in flex container in 
    situations where i need one of children to have a height of 100% 
    because flex-basis(will be set later in the animation) dicatates children how much they can grow 
    AND! kanban-tool has elements with fixed size (so it gives kanban-tool a min-heigth and min-width).
- In less words: flex children shrink to the minimum possible size accordingly to flex-shrink and flex-basis values. 
## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
