const app = new Vue({
    el: '#app',
    data: {
        quotes: null,
        loading: true,
        language: 'en',
        languages: ['en', 'zh-mo', 'zh-cn'],
        title: 'Metaverse Quotes',
        items: [
            {
                image: 'https://via.placeholder.com/800x400/1abc9c/ffffff',
                caption: 'First slide',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                image: 'https://via.placeholder.com/800x400/2ecc71/ffffff',
                caption: 'Second slide',
                description: 'Praesent euismod tortor tellus, ac consequat sapien dapibus vel.'
            },
            {
                image: 'https://via.placeholder.com/800x400/3498db/ffffff',
                caption: 'Third slide',
                description: 'Nunc vel sapien vel felis sagittis dictum id vel lacus.'
            }
        ],
        activeIndex: 0
    },
    methods: {
        setLanguage(lang) {
            // Set the current language
            this.language = lang;

            // Fetch the quotes for the current language
            this.loading = true;
            fetch(`https://backend.cpsumsu.org/api/metaverse_quotes`)
                .then(response => response.json())
                .then(data => {
                    this.quotes = data[lang];
                    this.loading = false;
                    console.log(data[lang]);
                })
                .catch(error => {
                    console.error(error);
                    this.loading = false;
                });
        },
        prev() {
            this.activeIndex = (this.activeIndex === 0) ? this.items.length - 1 : this.activeIndex - 1;
        },
        next() {
            this.activeIndex = (this.activeIndex === this.items.length - 1) ? 0 : this.activeIndex + 1;
        }
    },
    mounted() {
        // Fetch the default quotes on page load
        this.setLanguage(this.language);
    }
});