import Star from '../icons/app/star-solid.svg';
import template from './RateView.html';
import styles from './RateView.scss';

export default Backbone.View.extend({
    tagName : 'li',

    events : {
        [`click .${styles.price}`] : 'copyPriceClipboard',
        [`click .${styles.star}`]  : 'togleFavorite'
    },

    initialize() {
        this.listenTo(this.model, 'change', this.render);
    },

    render() {
        const html = template({
            ...this.model.toJSON(),
            star : Star({
                fill      : this.model.get('favorite'),
                classname : styles.star
            }),
            styles
        });

        this.$el.html(html);

        return this;
    },

    copyPriceClipboard() {
        const price = this.model.get('price');

        const $temp = $('<input>');

        $('body').append($temp);
        $temp.val(price).select();
        document.execCommand('copy');
        $temp.remove();
    },

    togleFavorite() {
        const favorite = this.model.get('favorite');

        this.model.set({ favorite: !favorite });
    }
});
