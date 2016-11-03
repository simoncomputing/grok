$(document).ready(function () {
    var quoteSource = [{
            quote: "Insanity: doing the same thing over and over again and expecting different results.",
            name: "Albert Einstein"
                },{
            quote: "Simplicity is the ultimate sophistication.",
            name: "Leonardo da Vinci"
                },{
            quote: "Others have seen what is and asked why. I have seen what could be and asked why not. ",
            name: "Pablo Picasso"
                },{
            quote: "What we think, we become",
            name: "Buddha"
                }, {
            quote: "If opportunity doesn't knock, build a door.",
            name: "Milton Berle"
                },{
            quote: "Nothing is impossible, the word itself says \"I'm possible\"!",
            name: "Audrey Hepburn"
                }, {
            quote: "Believe you can and you're halfway there.",
            name: "Theodore Roosevelt"
                }, {
            quote: "It does not matter how slowly you go as long as you do not stop.",
            name: "Confucius"
                }, {
            quote: "Don't watch the clock; do what it does. Keep going.",
            name: "Sam Levenson"
                }, {
            quote: "Expect problems and eat them for breakfast.",
            name: "Alfred A. Montapert"
                }, {
            quote: "Start where you are. Use what you have. Do what you can.",
            name: "Arthur Ashe"
                }, {
            quote: "Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.",
            name: "Samuel Beckett"
                }, {
            quote: "Be yourself; everyone else is already taken.",
            name: "Oscar Wilde"
                }, {
            quote: "Always remember that you are absolutely unique. Just like everyone else.",
            name: "Margaret Mead"
                }, {
            quote: "Do not take life too seriously. You will never get out of it alive.",
            name: "Elbert Hubbard"
                }, {
            quote: "Roses are red, violets are blue, I'm schizophrenic, and so am I.",
            name: "Oscar Levant"
                }, {
            quote: "Procrastination is the art of keeping up with yesterday.",
            name: "Don Marquis"
                }, {
            quote: "Get your facts first, then you can distort them as you please.",
            name: "Mark Twain"
                }, {
            quote: "A day without sunshine is like, you know, night.",
            name: "Steve Martin"
                }, {
            quote: "Don't sweat the petty things and don't pet the sweaty things.",
            name: "George Carlin"
                }, {
            quote: "Always do whatever's next.",
            name: "George Carlin"
                }, {
            quote: "Hapiness is not something ready made. It comes from your own actions.",
            name: "Dalai Lama"
                }
            ];

        var randomNumber = Math.floor(Math.random() * quoteSource.length);

        var newQuoteText = quoteSource[randomNumber].quote;
        var newQuoteGenius = quoteSource[randomNumber].name;

        var quoteContainer = $('#quoteContainer');

        quoteContainer.html('');
        quoteContainer.append('<p>' + newQuoteText + '</p>' + '<p id="quoteGenius">' + '-								' + newQuoteGenius + '</p>');

});