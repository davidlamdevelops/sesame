INSTRUCTIONS:
npm install for the dependencies
npm start to start the app (port 3000)

If there are any build issues, please let me know.

TECHNICAL NOTES:

Here are some technical notes and considerations. I had to make assumptions about certain things and they are noted here. If I went down an unexpected path, I would love to have a conversation about it so that I can explain some of my choices. I didn't want to email back and forth all day over them, so I simply made a note of them. In most cases, I tried to make choices that emphasized problem solving and facility around React.

Imperative vs. Library:

I was not sure if you wanted this to be done imperatively or with some sort of library with typeahead. So, I took the imperative approach and worked on the UI events around the menu (enter, up down arrows, clicking, etc.) just to be sure. I otherwise would have used a well-tested library, importing just the typeahead feature. But I made the assumption that you wanted to see this done from scratch given the instructions about the input and results container (“The input should be a valid HTML text input element to be used in a standard HTML form setup” … and... “The widget match suggestions should appear below the text input as a ﬂoating container”)

The Data:

Noticed there are duplicates in the data set, hence I used a Set to get unique items.

Also did some data massaging so that the list works better with React and quickening up searches: namely, created an object for every item with new properties:

- lowerCase: lowercase needs to be done anyway on every fetch for suggestions, hence I did this upfront

- id: didn't want to rely on index in map() callback for unique key when displaying list of suggestions

Array or values were not alphabetical, not sure if you wanted me to actually sort this.  This can add unneceesary overhead.  If the expecation was to do so, I'd implement .sort((a,b) => ...) with a comparsion that would return 1, -1, 0.

Debounce:

With inputs like this, I normally implement debounce. I have done so here with a modest wait time.

Special characters and restricting input:

For the input field, I am restricting the characters that can be typed in to be:

A-Z, a-z, space, ', ç and í (the latter two to accommodate “Açaí”)

In normal circumstances, I'd need to know exactly what characters are allowed and this would require conversation without whomever is presenting me with the data for display, in particular if characters are not exclusively from the English alphabet. I would then make this configurable within the function, but it is hard-coded for now.

Bonus:

Please also see the bonus implemented via a HOC. If you export TypeAhead without the HOC, the typeahead should still work without it. Note: if you are already hovering over the menu area when you are searching, the hover will take effect and the hover selection will appear in the input.
