describe('Setup Alright', function() {

    it('Backbone Loaded', function() {
        expect(Backbone).toBeDefined();
    });

    it('Backbone.Selectable Loaded', function() {
        expect(Backbone.SelectableCollection).toBeDefined();
    });

    it('Backbone.MultiSelectable Loaded', function() {
        expect(Backbone.MultiSelectableCollection).toBeDefined();
    });



});
