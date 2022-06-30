import template from './SymbolView.html';

export default Backbone.View.extend({
    tagName : 'option',

    render() {
        const html = template(this.model.toJSON());

        this.$el.html(html);

        return this;
    }

});
